import { type PresetSettings } from "./presets";
import { SHARED_SETTINGS, type SharedSettings } from "./settings";

export const sharedSettingsStorage = storage.defineItem<
  Partial<SharedSettings>
>("sync:settings", {
  fallback: SHARED_SETTINGS,
});

export const presetSettingsStorage = storage.defineItem<
  Partial<Record<string, PresetSettings>>
>("sync:presets", {
  fallback: {},
});
