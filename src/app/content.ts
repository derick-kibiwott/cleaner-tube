import "./style.css";

import {
  startRedirectWatcher,
  stopRedirectWatcher,
  updateRedirectSettings,
} from "@/lib/redirects";

import {
  startAutoplayWatcher,
  stopAutoplayWatcher,
  updateAutoplaySettings,
} from "@/lib/autoplay";

import { startAdsWatcher, stopAdsWatcher, updateAdsSettings } from "@/lib/ads";

import {
  youtube_settings,
  SHARED_SETTINGS,
  type YoutubeSettings,
  type SharedSettings,
} from "@/utils/settings";

import { sharedSettingsStorage, presetSettingsStorage } from "@/utils/storage";
import { isPresetRecord } from "@/lib/shared";

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],

  async main() {
    console.log("[Cleaner Tube] Content script loaded");

    let sharedSettings: SharedSettings = SHARED_SETTINGS;
    let allPresets = PRESET_SETTINGS;

    const applySettings = (
      storedSettings: Partial<YoutubeSettings> | undefined,
    ) => {
      const settings: YoutubeSettings = {
        ...youtube_settings,
        ...storedSettings,
      };

      const activePreset = allPresets[sharedSettings.activePreset];

      const presetSettings = activePreset?.settings ?? {};

      const mergedSettings: YoutubeSettings = {
        ...settings,
        ...presetSettings,
      };

      const combinedSettings = {
        ...mergedSettings,
        ...sharedSettings,
      };

      document.body.dataset.cleanerTubeEnabled = String(sharedSettings.enabled);

      for (const [key, value] of Object.entries(mergedSettings)) {
        if (typeof value !== "boolean") continue;

        if (value) {
          document.body.classList.add(key);
        } else {
          document.body.classList.remove(key);
        }
      }

      updateRedirectSettings(combinedSettings);
      updateAutoplaySettings(combinedSettings);
      updateAdsSettings(combinedSettings);

      console.log("[Cleaner Tube] Settings applied", {
        activePreset,
        settings: mergedSettings,
      });
    };

    // Load shared settings
    const storedSharedSettings = await sharedSettingsStorage.getValue();

    sharedSettings = {
      ...SHARED_SETTINGS,
      ...storedSharedSettings,
    };

    console.log("[Cleaner Tube] Shared settings loaded", sharedSettings);

    // Load presets
    const storedPresets = await presetSettingsStorage.getValue();

    if (isPresetRecord(storedPresets)) {
      allPresets = {
        ...PRESET_SETTINGS,
        ...storedPresets,
      };
    }

    console.log("[Cleaner Tube] Presets loaded", allPresets);

    applySettings(undefined);

    // Watch shared settings
    const unwatchShared = sharedSettingsStorage.watch((newValue) => {
      sharedSettings = {
        ...SHARED_SETTINGS,
        ...newValue,
      };

      console.log("[Cleaner Tube] Shared settings changed", sharedSettings);

      applySettings(undefined);
    });

    // Watch presets
    const unwatchPresets = presetSettingsStorage.watch((newValue) => {
      if (!isPresetRecord(newValue)) return;

      allPresets = {
        ...PRESET_SETTINGS,
        ...newValue,
      };

      console.log("[Cleaner Tube] Presets changed", allPresets);

      applySettings(undefined);
    });

    startRedirectWatcher();
    startAutoplayWatcher();
    startAdsWatcher();

    return () => {
      unwatchShared();
      unwatchPresets();

      stopRedirectWatcher();
      stopAutoplayWatcher();
      stopAdsWatcher();
    };
  },
});
