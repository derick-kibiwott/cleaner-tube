// lib/autoplay.ts

import { youtube_settings } from "@/utils/settings";
import { SHARED_SETTINGS } from "@/utils/settings";

let autoplayTimer: number | undefined;

let cachedSettings: YoutubeSettings & SharedSettings = {
  ...youtube_settings,
  ...SHARED_SETTINGS,
};

function blockAutoplay() {
  if (!cachedSettings.enabled || !cachedSettings.disableAutoplay) return;

  // Desktop player: flip the "Autoplay" toggle off (aria-checked="true"
  // means autoplay is on). Once clicked, YouTube remembers the state.
  document
    .querySelectorAll<HTMLButtonElement>(
      '.ytp-autonav-toggle-button[aria-checked="true"]',
    )
    .forEach((button) => {
      if (button.offsetParent) button.click();
    });

  // Mobile player
  document
    .querySelectorAll<HTMLElement>(
      '.ytm-autonav-toggle-button-container[aria-pressed="true"]',
    )
    .forEach((button) => {
      if (button.offsetParent) button.click();
    });
}

export function startAutoplayWatcher() {
  if (autoplayTimer !== undefined) return;
  autoplayTimer = window.setInterval(blockAutoplay, 250);
}

export function stopAutoplayWatcher() {
  if (autoplayTimer !== undefined) {
    clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  }
}

export function updateAutoplaySettings(
  stored_settings: YoutubeSettings & SharedSettings,
) {
  cachedSettings = { ...youtube_settings, ...stored_settings };
  blockAutoplay();
}
