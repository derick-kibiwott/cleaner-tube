// lib/ads.ts
let cachedSettings: YoutubeSettings & SharedSettings = {
  ...youtube_settings,
  ...SHARED_SETTINGS,
};
let adsTimer: number | undefined;

// Tracks whether we're currently in an ad, so the user's playback
// speed/volume can be restored afterwards.
let hyper = false;
let currentUrl = location.href;

function skipAds() {
  if (!cachedSettings.enabled || !cachedSettings.skipCloseAds) return;

  // Reset ad state on SPA navigation (mirrors handleNewPage).
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    hyper = false;
  }

  // 1. Close overlay (banner) ads drawn over the video.
  document
    .querySelectorAll<HTMLButtonElement>(".ytp-ad-overlay-close-button")
    .forEach((button) => {
      if (button.offsetParent) button.click();
    });

  const video = document.querySelector<HTMLVideoElement>("video");
  if (!video) return;

  // 2. Detect an active ad. The skip button sits in the DOM from the
  // ad's first frame; the overlay markers appear once it plays.

  const hasSkipButton =
    document.querySelector<HTMLButtonElement>(".ytp-skip-ad-button") !== null;

  const adActive =
    hasSkipButton ||
    [".ytp-ad-player-overlay-instream-info", ".ytp-ad-button-icon"]
      .flatMap((selector) =>
        Array.from(document.querySelectorAll<HTMLElement>(selector)),
      )
      .some((elt) => window.getComputedStyle(elt).display !== "none");

  if (adActive) {
    hyper = true;
    video.muted = true;

    if (
      hasSkipButton &&
      Number.isFinite(video.duration) &&
      video.duration > 0
    ) {
      video.currentTime = video.duration;
    } else {
      // Unskippable ad: ride it out at 10x.
      video.playbackRate = 10;
    }
  } else if (hyper) {
    // Ad finished — restore the user's previous speed/volume, which
    // YouTube persists in its own session storage.

    let playbackRate = 1;
    let muted = false;
    try {
      const playbackRateObject =
        window.sessionStorage["yt-player-playback-rate"];
      const volumeObject = window.sessionStorage["yt-player-volume"];
      playbackRate = Number(JSON.parse(playbackRateObject).data);
      muted = JSON.parse(JSON.parse(volumeObject).data).muted;
    } catch (error) {
      console.log(error);
    }
    video.playbackRate = playbackRate !== undefined ? playbackRate : 1;
    video.muted = muted !== undefined ? muted : false;
    hyper = false;
  }
}

export function startAdsWatcher() {
  if (adsTimer !== undefined) return;
  adsTimer = window.setInterval(skipAds, 250);
}

export function stopAdsWatcher() {
  if (adsTimer !== undefined) {
    clearInterval(adsTimer);
    adsTimer = undefined;
  }
}

export function updateAdsSettings(
  stored_settings: YoutubeSettings & SharedSettings,
) {
  cachedSettings = { ...youtube_settings, ...stored_settings };
  skipAds();
}
