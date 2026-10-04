import type { YoutubeSettings } from "./settings";

export type PresetSettings = {
  name: string;
  description?: string;
  basedOn?: string;
  settings: Partial<YoutubeSettings>;
};

const sharedSettings: Partial<YoutubeSettings> = {
  skipCloseAds: true,
};

export const PRESET_SETTINGS: Record<string, PresetSettings> = {
  minimal: {
    name: "Minimal",
    description:
      "A cleaner interface. Hides extra menus, banners and promotions.",
    settings: {
      hideExplore: true,
      hideMoreFromYoutube: true,
      hideNotificationBell: true,
      hideSearchSuggestions: true,
      hideMixes: true,
      hideShorts: true,
      hideFundraiser: true,
      hideMerchTickets: true,
      hideEndScreenCards: true,
      ...sharedSettings,
    },
  },
  focus: {
    name: "Focus",
    description:
      "Watch one video without distractions: no suggestions, comments or autoplay.",
    settings: {
      hideHomeFeed: true,
      disablePlayOnHover: true,
      hideNotificationBell: true,
      hideSidebarNavigation: true,
      disableSearchInfiniteScroll: true,
      hideSidebarSuggestions: true,
      hideEndScreenCards: true,
      hideEndScreenFeed: true,
      hideComments: true,
      hideLiveChat: true,
      hideShorts: true,
      disableAutoplay: true,
      hideMerchTickets: true,
      ...sharedSettings,
    },
  },

  "shorts-free": {
    name: "Shorts Free",
    description:
      "Removes Shorts everywhere and opens any Shorts link in the normal player.",
    settings: {
      hideShorts: true,
      hideShortsThumbnails: true,
      redirectShortsToDefaultVideoPlayer: true,
      ...sharedSettings,
    },
  },
};
