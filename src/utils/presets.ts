import type { YoutubeSettings } from "./settings";

export type PresetSettings = {
  name: string;
  description?: string;
  basedOn?: string;
  settings: Partial<YoutubeSettings>;
};

export const PRESET_SETTINGS: Record<string, PresetSettings> = {
  focus: {
    name: "Focus",
    description: "Removes distractions so you can concentrate on the video.",
    settings: {
      hideShorts: true,
      hideComments: true,
      hideMixes: true,
    },
  },

  minimal: {
    name: "Minimal",
    description:
      "Keeps YouTube clean by hiding unnecessary interface elements.",
    settings: {
      hideHomeFeed: true,
      hideShorts: true,
      hideMixes: true,
      hideExplore: true,
      hideMoreFromYoutube: true,
      hideNotificationBell: true,
      hideSidebarNavigation: true,
      hideVideoDescription: true,
      hideLiveChat: true,
      hideFundraiser: true,
      hideMerchTickets: true,
    },
  },

  "shorts-free": {
    name: "Shorts Free",
    description: "Removes Shorts and prevents them from taking over your feed.",
    settings: {
      hideShorts: true,
      redirectShortsToDefaultVideoPlayer: true,
      hideHomeFeed: true,
      hideMixes: true,
    },
  },

  quiet: {
    name: "Quiet",
    description:
      "Hides notifications and social features for a quieter YouTube experience.",
    settings: {
      hideNotificationBell: true,
      hideComments: true,
      hideLikeButton: true,
      hideLiveChat: true,
      hideFundraiser: true,
      hideMerchTickets: true,
    },
  },
};
