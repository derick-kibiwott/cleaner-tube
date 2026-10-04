import { useCallback, useEffect, useRef, useState } from "react";
import { PRESET_SETTINGS, type PresetSettings } from "@/utils/presets";
import { youtube_settings, type YoutubeSettings } from "@/utils/settings";
import { presetSettingsStorage } from "@/utils/storage";
import {
  getPresetKey,
  getTempKey,
  isPresetRecord,
  isTempKey,
} from "@/lib/shared";

type SettingValue = boolean | string;
type Stored = Record<string, PresetSettings>;

// Keep only values that differ from the app defaults (i.e. drop `false` flags)
function normalize(
  settings: Partial<YoutubeSettings>,
): Partial<YoutubeSettings> {
  return Object.fromEntries(
    Object.entries(settings).filter(
      ([key, value]) =>
        value !== undefined &&
        value !== youtube_settings[key as keyof YoutubeSettings],
    ),
  ) as Partial<YoutubeSettings>;
}

function sameSettings(
  a: Partial<YoutubeSettings>,
  b: Partial<YoutubeSettings>,
) {
  const sort = (s: Partial<YoutubeSettings>) =>
    JSON.stringify(
      Object.entries(normalize(s)).sort(([x], [y]) => x.localeCompare(y)),
    );
  return sort(a) === sort(b);
}

const stripBuiltIns = (presets: Stored): Stored =>
  Object.fromEntries(
    Object.entries(presets).filter(([key]) => !(key in PRESET_SETTINGS)),
  );

export function usePresetSettings() {
  const { sharedSettings, changeSharedSetting } = useSharedSettings();
  const [allPresets, setAllPresets] =
    useState<Record<string, PresetSettings>>(PRESET_SETTINGS);
  const writeQueue = useRef<Promise<void>>(Promise.resolve());

  const enqueue = (fn: () => Promise<void>) => {
    writeQueue.current = writeQueue.current.then(fn);
    return writeQueue.current;
  };

  const readStored = async (): Promise<Stored> => {
    const value = await presetSettingsStorage.getValue();
    return isPresetRecord(value) ? { ...(value as Stored) } : {};
  };

  const writeStored = (presets: Stored) =>
    presetSettingsStorage.setValue(stripBuiltIns(presets));

  useEffect(() => {
    let mounted = true;
    const apply = (value: unknown) => {
      if (!mounted) return;
      // Rebuild from built-ins so deleted presets actually disappear
      setAllPresets({
        ...PRESET_SETTINGS,
        ...(isPresetRecord(value) ? (value as Stored) : {}),
      });
    };

    presetSettingsStorage.getValue().then(apply);
    const unwatch = presetSettingsStorage.watch(apply);
    return () => {
      mounted = false;
      unwatch();
    };
  }, []);

  // ---- derived state ----
  const activeKey = sharedSettings.activePreset;
  const activePreset = allPresets[activeKey];
  const isModified = isTempKey(activeKey) && !!activePreset;
  const baseKey = isModified ? activePreset?.basedOn : activeKey;
  const basePreset = baseKey ? allPresets[baseKey] : undefined;
  const isBaseCustom = !!baseKey && !(baseKey in PRESET_SETTINGS);

  // ---- actions ----

  /** Change one setting. Creates/updates the temp preset, or removes it if settings match base again. */
  const updateSetting = useCallback(
    (id: keyof YoutubeSettings, value: SettingValue) => {
      if (!baseKey || !basePreset) return Promise.resolve();
      const tempKey = getTempKey(baseKey);

      return enqueue(async () => {
        const stored = await readStored();
        const current = stored[tempKey]?.settings ?? basePreset.settings;
        const next = normalize({ ...current, [id]: value });

        if (sameSettings(next, basePreset.settings)) {
          // Back to the original: restore base first, then delete temp
          await changeSharedSetting("activePreset", baseKey);
          delete stored[tempKey];
          await writeStored(stored);
          return;
        }

        stored[tempKey] = {
          name: `${basePreset.name}(modified)`,
          basedOn: baseKey,
          settings: next,
        };
        await writeStored(stored); // write before activating
        await changeSharedSetting("activePreset", tempKey);
      });
    },
    [baseKey, basePreset, changeSharedSetting],
  );

  /** Select a preset, discarding any temp modifications. */
  const selectPreset = useCallback(
    (key: string) =>
      enqueue(async () => {
        await changeSharedSetting("activePreset", key);
        const stored = await readStored();
        const tempKeys = Object.keys(stored).filter(isTempKey);
        if (tempKeys.length) {
          tempKeys.forEach((k) => delete stored[k]);
          await writeStored(stored);
        }
      }),
    [changeSharedSetting],
  );

  /** Overwrite the custom preset the temp preset is based on. */
  const saveToBase = useCallback(
    () =>
      enqueue(async () => {
        if (
          !isModified ||
          !baseKey ||
          !isBaseCustom ||
          !basePreset ||
          !activePreset
        )
          return;
        const stored = await readStored();
        stored[baseKey] = { ...basePreset, settings: activePreset.settings };
        await writeStored(stored);
        await changeSharedSetting("activePreset", baseKey);
        delete stored[getTempKey(baseKey)];
        await writeStored(stored);
      }),
    [
      isModified,
      baseKey,
      isBaseCustom,
      basePreset,
      activePreset,
      changeSharedSetting,
    ],
  );

  /** Turn the temp preset into a new custom preset. Returns an error message or null. */
  const saveAsNew = useCallback(
    async (name: string, description?: string): Promise<string | null> => {
      const trimmed = name.trim();
      const key = getPresetKey(trimmed);
      if (!trimmed || !key) return "Please enter a name.";
      if (isTempKey(key) || key in allPresets)
        return "A preset with this name already exists.";
      if (!isModified || !baseKey || !activePreset) return "Nothing to save.";

      await enqueue(async () => {
        const stored = await readStored();
        const tempKey = getTempKey(baseKey);
        // Rename the temp preset: new key, new name, no basedOn
        stored[key] = {
          name: trimmed,
          description: description?.trim() || undefined,
          settings: activePreset.settings,
        };
        await writeStored(stored);
        await changeSharedSetting("activePreset", key);
        delete stored[tempKey];
        await writeStored(stored);
      });
      return null;
    },
    [allPresets, isModified, baseKey, activePreset, changeSharedSetting],
  );
  /** Rename a custom preset. Returns an error message or null. */
  const renamePreset = useCallback(
    async (
      key: string,
      newName: string,
      newDescription?: string,
    ): Promise<string | null> => {
      const trimmed = newName.trim();
      const newKey = getPresetKey(trimmed);

      if (key in PRESET_SETTINGS) return "Built-in presets can't be renamed.";
      if (!trimmed || !newKey) return "Please enter a name.";
      if (newKey !== key && newKey in allPresets) {
        return "A preset with this name already exists.";
      }

      const oldTempKey = getTempKey(key);
      const newTempKey = getTempKey(newKey);
      const active = sharedSettings.activePreset;

      await enqueue(async () => {
        const stored = await readStored();
        const existing = stored[key];
        if (!existing) return;
        const temp = stored[oldTempKey];

        // 1. Add the new entries first (old ones stay, so nothing dangles)
        stored[newKey] = {
          ...existing,
          name: trimmed,
          description:
            newDescription === undefined
              ? existing.description
              : newDescription.trim() || undefined,
        };

        if (temp) {
          stored[newTempKey] = {
            ...temp,
            name: `${trimmed}(modified)`,
            basedOn: newKey,
          };
        }
        await writeStored(stored);

        // 2. Repoint the active preset
        if (active === key) {
          await changeSharedSetting("activePreset", newKey);
        } else if (active === oldTempKey) {
          await changeSharedSetting("activePreset", newTempKey);
        }

        // 3. Remove the old entries
        if (newKey !== key) delete stored[key];
        if (temp && newTempKey !== oldTempKey) delete stored[oldTempKey];
        await writeStored(stored);
      });

      return null;
    },
    [allPresets, sharedSettings.activePreset, changeSharedSetting],
  );

  const deletePreset = useCallback(
    (key: string) =>
      enqueue(async () => {
        if (key in PRESET_SETTINGS) return; // built-ins are immutable
        if (
          sharedSettings.activePreset === key ||
          sharedSettings.activePreset === getTempKey(key)
        ) {
          await changeSharedSetting("activePreset", "focus");
        }
        const stored = await readStored();
        delete stored[key];
        delete stored[getTempKey(key)];
        await writeStored(stored);
      }),
    [sharedSettings.activePreset, changeSharedSetting],
  );

  return {
    allPresets,
    activeKey,
    activePreset,
    basePreset,
    baseKey,
    isModified,
    isBaseCustom,
    updateSetting,
    selectPreset,
    saveToBase,
    saveAsNew,
    renamePreset,
    deletePreset,
  };
}
