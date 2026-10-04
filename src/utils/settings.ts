// utils/settings.ts
import {
  GalleryThumbnails,
  Gauge,
  Navigation,
  Search,
  ShieldCheck,
  SquarePlay,
  TvMinimalPlay,
  type LucideIcon,
} from "lucide-react";

export type SharedSettings = {
  enabled: boolean;
  theme: "light" | "dark";
  activePreset: string;
};

export const SHARED_SETTINGS: SharedSettings = {
  enabled: true,
  theme: "dark",
  activePreset: "minimal",
};

export type YoutubeSettings = {
  // General
  hideHomeFeed: boolean;
  redirectHomeTo: "default" | "subscriptions" | "watchLater";
  disablePlayOnHover: boolean;
  hideSearchSuggestions: boolean;
  hideMixes: boolean;

  // Navigation
  hideSubscriptions: boolean;
  hideExplore: boolean;
  hideMoreFromYoutube: boolean;
  hideNotificationBell: boolean;
  hideSidebarNavigation: boolean;

  // Thumbnails
  blurVideoThumbnails: boolean;
  hideVideoThumbnails: boolean;
  grayscaleVideoThumbnails: boolean;
  blurShortsThumbnails: boolean;
  hideShortsThumbnails: boolean;
  grayscaleShortsThumbnails: boolean;

  // Shorts
  hideShorts: boolean;
  redirectShortsToDefaultVideoPlayer: boolean;

  // Search Page
  hideIrrelevantSearch: boolean;
  disableSearchInfiniteScroll: boolean;

  // Watch Page
  hideSidebarSuggestions: boolean;
  hideVideoDescription: boolean;
  disableAutoplay: boolean;
  hideEndScreenCards: boolean;
  hideEndScreenFeed: boolean;
  hideComments: boolean;
  hidePlaylist: boolean;
  hideLiveChat: boolean;
  hideFundraiser: boolean;
  hideMerchTickets: boolean;
  hideLikeButton: boolean;
  hideAllButTimestampedComments: boolean;
  hideCommentReplies: boolean;

  // Ads
  skipCloseAds: boolean;
};

type SettingItem<K extends keyof YoutubeSettings = keyof YoutubeSettings> =
  K extends keyof YoutubeSettings
    ? YoutubeSettings[K] extends boolean
      ? {
          id: K;
          label: string;
          description?: string;
          type: "toggle";
        }
      : YoutubeSettings[K] extends string
        ? {
            id: K;
            label: string;
            description?: string;
            type: "select";
            options: {
              id: YoutubeSettings[K];
              label: string;
            }[];
          }
        : never
    : never;

export type SettingsCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  items: SettingItem[];
};

export const YOUTUBE_SETTINGS: SettingsCategory[] = [
  {
    id: "general",
    title: "General",
    icon: Gauge,
    items: [
      {
        id: "hideHomeFeed",
        label: "Hide Home Feed",
        description:
          "Remove recommended videos and other content from YouTube's home page.",
        type: "toggle",
      },
      {
        id: "redirectHomeTo",
        label: "Redirect Home To",
        description:
          "Choose which page opens when you visit YouTube's home page.",
        type: "select",
        options: [
          { id: "default", label: "YouTube Home" },
          { id: "subscriptions", label: "Subscriptions" },
          { id: "watchLater", label: "Watch Later" },
        ],
      },
      {
        id: "hideSearchSuggestions",
        label: "Hide Search Suggestions",
        description:
          "Disable the suggested search queries that appear while typing in YouTube's search bar.",
        type: "toggle",
      },
      {
        id: "disablePlayOnHover",
        label: "Disable Play on Hover",
        description:
          "Prevent videos from automatically playing when you mouse is above their thumbnails.",
        type: "toggle",
      },
      {
        id: "hideMixes",
        label: "Hide YouTube Mixes",
        description:
          "Remove YouTube Mix playlists and their associated recommendation grids from supported pages. Other playlists remain visible.",
        type: "toggle",
      },
    ],
  },
  {
    id: "navigation",
    title: "navigation",
    icon: Navigation,
    items: [
      {
        id: "hideSubscriptions",
        label: "Hide Subscriptions",
        description:
          "Remove the Subscriptions link from YouTube's left navigation sidebar.",
        type: "toggle",
      },
      {
        id: "hideExplore",
        label: "Hide Explore",
        description: "Remove Explore section from left navigation sidebar",
        type: "toggle",
      },
      {
        id: "hideMoreFromYoutube",
        label: "Hide More from YouTube",
        description:
          "Remove the 'More from YouTube' section from the navigation sidebar, including its associated links.",
        type: "toggle",
      },
      {
        id: "hideNotificationBell",
        label: "Hide Notification Bell",
        description:
          "Remove the notifications bell from YouTube's interface. This only hides the icon; it does not disable or delete your notifications.",
        type: "toggle",
      },
      {
        id: "hideSidebarNavigation",
        label: "Hide Left Sidebar Navigation",
        description: "Hide the sidebar navigation on the left of youtube.",
        type: "toggle",
      },
    ],
  },

  {
    id: "thumbnails",
    title: "Thumbnails",
    icon: GalleryThumbnails,
    items: [
      {
        id: "blurVideoThumbnails",
        label: "Blur Video Thumbnails",
        description:
          "Apply a blur effect to regular video thumbnails while keeping their image areas and layout visible.",
        type: "toggle",
      },
      {
        id: "hideVideoThumbnails",
        label: "Hide Video Thumbnails",
        description:
          "Conceal regular video thumbnail images while preserving the surrounding video cards and page layout.",
        type: "toggle",
      },
      {
        id: "grayscaleVideoThumbnails",
        label: "Grayscale Video Thumbnails",
        description:
          "Conceal regular video thumbnail images while preserving the surrounding video cards and page layout.",
        type: "toggle",
      },
      {
        id: "blurShortsThumbnails",
        label: "Blur Shorts Thumbnails",
        description:
          "Apply a blur effect to Shorts thumbnail images while keeping their image areas and layout visible.",
        type: "toggle",
      },
      {
        id: "hideShortsThumbnails",
        label: "Hide Shorts Thumbnails",
        description: "Display regular video thumbnails in black and white.",
        type: "toggle",
      },
      {
        id: "grayscaleShortsThumbnails",
        label: "Grayscale Shorts Thumbnails",
        description:
          "Conceal Shorts thumbnail images while preserving their surrounding cards and layout.",
        type: "toggle",
      },
      {
        id: "grayscaleShortsThumbnails",
        label: "Grayscale Shorts Thumbnails",
        description: "Display Shorts thumbnails in black and white.",
        type: "toggle",
      },
    ],
  },
  {
    id: "shorts",
    title: "Shorts",
    icon: SquarePlay,
    items: [
      {
        id: "hideShorts",
        label: "Hide Shorts",
        description:
          "Remove Shorts shelves, tabs, links and other supported Shorts elements throughout YouTube.",
        type: "toggle",
      },
      {
        id: "redirectShortsToDefaultVideoPlayer",
        label: "Open Shorts in Standard Video Player",
        description:
          "Open supported Shorts links in YouTube's standard video player instead of the vertical Shorts viewer.",
        type: "toggle",
      },
      {
        id: "blurShortsThumbnails",
        label: "Blur Shorts Thumbnails",
        description:
          "Apply a blur effect to Shorts thumbnail images while keeping their image areas and layout visible.",
        type: "toggle",
      },
      {
        id: "hideShortsThumbnails",
        label: "Hide Shorts Thumbnails",
        description:
          "Conceal Shorts thumbnail images while preserving their surrounding cards and layout.",
        type: "toggle",
      },
    ],
  },
  {
    id: "searchpage",
    title: "Search Page",
    icon: Search,
    items: [
      {
        id: "hideIrrelevantSearch",
        label: "Hide Irrelevant Search Results",
        description:
          "Filter out search results identified as irrelevant by the extension.",
        type: "toggle",
      },
      {
        id: "disableSearchInfiniteScroll",
        label: "Disable Infinite Scrolling",
        description:
          "Prevent YouTube from automatically loading more search results as you scroll.",
        type: "toggle",
      },
    ],
  },
  {
    id: "watchPage",
    title: "Watch Page",
    icon: TvMinimalPlay,
    items: [
      {
        id: "hideSidebarSuggestions",
        label: "Hide Sidebar Suggestions",
        description:
          "Hide suggested content displayed in the watch page's right side.",
        type: "toggle",
      },
      {
        id: "disableAutoplay",
        label: "Disable Video Autoplay",
        description:
          "Prevent YouTube from automatically starting the next video when the current video finishes.",
        type: "toggle",
      },
      {
        id: "hideEndScreenCards",
        label: "Hide End Screen Cards",
        description:
          "Hide clickable video cards and interactive elements that appear over the video near the end of playback.",
        type: "toggle",
      },
      {
        id: "hideEndScreenFeed",
        label: "Hide End Screen Video Feed",
        description:
          "Hide the grid or collection of suggested videos displayed on the video end screen, without necessarily hiding individual end screen cards.",
        type: "toggle",
      },
      {
        id: "hideVideoDescription",
        label: "Hide Video Description",
        description:
          "Hide the video's information section, such as its title, channel details, view count and other supported metadata.",
        type: "toggle",
      },
      {
        id: "hideComments",
        label: "Hide Comments",
        description: "Hide video comments",
        type: "toggle",
      },
      {
        id: "hidePlaylist",
        label: "Hide Playlist",
        description:
          "Hide the playlist panel displayed alongside a video when watching a playlist. The playlist itself remains intact.",
        type: "toggle",
      },
      {
        id: "hideLiveChat",
        label: "Hide Live Chat",
        description:
          "Remove the live chat panel from live streams and supported premieres. This does not disable chat or affect other viewers.",
        type: "toggle",
      },
      {
        id: "hideFundraiser",
        label: "Hide Fundraisers & Donations",
        description:
          "Hide supported fundraising, donation and charitable campaign panels displayed on YouTube's watch page.",
        type: "toggle",
      },
      {
        id: "hideMerchTickets",
        label: "Hide Merch, Tickets & Offers",
        description:
          "Hide supported merchandise shelves, event ticket links, promotional offers and related shopping banners on the watch page.",
        type: "toggle",
      },
      {
        id: "hideLikeButton",
        label: "Hide Like Button",
        description: "Hide the Like Button and the like count of videos",
        type: "toggle",
      },
      {
        id: "hideAllButTimestampedComments",
        label: "Hide All But Timestamped Comments",
        description: "Show only comments with timestamps.",
        type: "toggle",
      },
      {
        id: "hideCommentReplies",
        label: "Hide Comment Replies",
        description: "Hide all the replies to comments.",
        type: "toggle",
      },
    ],
  },
  {
    id: "ads",
    title: "Ads",
    icon: ShieldCheck,
    items: [
      {
        id: "skipCloseAds",
        label: "Skip and Close Ads",
        description:
          "Automatically skip skippable video ads and dismiss supported ad overlays when possible. This does not guarantee that every ad can be skipped or blocked.",
        type: "toggle",
      },
    ],
  },
];

const youtube_default_settings = YOUTUBE_SETTINGS.flatMap((category) =>
  category.items.map((item) =>
    item.type === "toggle" ? [item.id, false] : [item.id, item.options[0]?.id],
  ),
);

export const youtube_settings = Object.fromEntries(youtube_default_settings);
