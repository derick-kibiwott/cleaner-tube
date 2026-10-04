type HomeTarget = YoutubeSettings["redirectHomeTo"];

const HOME_REDIRECT_URLS: Record<Exclude<HomeTarget, "default">, string> = {
  subscriptions: "https://www.youtube.com/feed/subscriptions",
  watchLater: "https://www.youtube.com/playlist/?list=WL",
};

const isOnShorts = () => /^\/shorts\//.test(location.pathname);
const isOnHomepage = () => location.pathname === "/";

function applyRedirects(settings: YoutubeSettings & SharedSettings) {
  if (!settings.enabled) return;

  if (settings.redirectShortsToDefaultVideoPlayer && isOnShorts()) {
    const videoId = location.pathname.split("/")[2];
    if (videoId) {
      location.replace(`https://www.youtube.com/watch?v=${videoId}`);
    }
    return;
  }

  if (settings.redirectHomeTo !== "default" && isOnHomepage()) {
    location.replace(HOME_REDIRECT_URLS[settings.redirectHomeTo]);
  }
}

let cachedSettings: YoutubeSettings & SharedSettings = {
  ...youtube_settings,
  ...SHARED_SETTINGS,
};

let currentUrl = location.href;
let pollTimer: number | undefined;

export function startRedirectWatcher() {
  const tick = () => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      applyRedirects(cachedSettings);
    }
  };

  applyRedirects(cachedSettings);
  pollTimer = window.setInterval(tick, 250);
}

export function stopRedirectWatcher() {
  if (pollTimer !== undefined) {
    clearInterval(pollTimer);
    pollTimer = undefined;
  }
}

export function updateRedirectSettings(
  stored_settings: YoutubeSettings & SharedSettings,
) {
  cachedSettings = { ...youtube_settings, ...stored_settings };
  applyRedirects(cachedSettings);
}
