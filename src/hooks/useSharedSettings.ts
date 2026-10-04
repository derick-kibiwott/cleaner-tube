// src/hooks/useSharedSettings.ts
import { SHARED_SETTINGS, type SharedSettings } from "@/utils/settings";
import { sharedSettingsStorage } from "@/utils/storage";
import { useCallback, useEffect, useRef, useState } from "react";

export function useSharedSettings() {
  const [sharedSettings, setSharedSettings] =
    useState<SharedSettings>(SHARED_SETTINGS);
  const writeQueue = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let mounted = true;

    const applySharedSettings = (
      storedSharedSettings: Partial<SharedSettings> | undefined,
    ) => {
      if (mounted) {
        setSharedSettings({ ...SHARED_SETTINGS, ...storedSharedSettings });
      }
    };

    sharedSettingsStorage.getValue().then(applySharedSettings);

    const unwatch = sharedSettingsStorage.watch(applySharedSettings);

    return () => {
      mounted = false;
      unwatch();
    };
  }, []);

  const changeSharedSetting = useCallback(
    <K extends keyof SharedSettings>(key: K, value: SharedSettings[K]) => {
      setSharedSettings((current) => ({
        ...current,
        [key]: value,
      }));

      writeQueue.current = writeQueue.current.then(async () => {
        const stored = await sharedSettingsStorage.getValue();

        const complete = {
          ...SHARED_SETTINGS,
          ...stored,
        };

        complete[key] = value;

        const sparse = Object.fromEntries(
          Object.entries(complete).filter(
            ([settingKey, settingValue]) =>
              settingValue !==
              SHARED_SETTINGS[settingKey as keyof SharedSettings],
          ),
        ) as Partial<SharedSettings>;

        if (JSON.stringify(stored) !== JSON.stringify(sparse)) {
          await sharedSettingsStorage.setValue(sparse);
        }
      });

      return writeQueue.current;
    },
    [],
  );

  return { sharedSettings, changeSharedSetting };
}
