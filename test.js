export const YOUTUBE_SETTINGS = [
  {
    id: "general",
    title: "General",
    items: [
      {
        id: "hideHomeFeed",
        label: "Hide Home Feed",
        description:
          "Remove recommended videos and other content from YouTube's home page.",
        type: "toggle",
        default: true,
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
        default: "default",
      },
      {
        id: "hideSearchSuggestions",
        label: "Hide Search Suggestions",
        description:
          "Disable the suggested search queries that appear while typing in YouTube's search bar.",
        type: "toggle",
        default: false,
      },
      {
        id: "hideIrrelevantSearch",
        label: "Hide Irrelevant Search Results",
        description:
          "Filter out search results identified as irrelevant by the extension.",
        type: "toggle",
        default: true,
      },
      {
        id: "hideSubscriptions",
        label: "Hide Subscriptions",
        description:
          "Remove the Subscriptions link from YouTube's navigation sidebar.",
        type: "toggle",
        default: false,
      },
      {
        id: "hideExploreTrending",
        label: "Hide Explore & Trending",
        description:
          "Remove Explore and Trending links and their associated navigation entries from YouTube.",
        type: "toggle",
        default: true,
      },
      {
        id: "hideMoreFromYoutube",
        label: "Hide More from YouTube",
        description:
          "Remove the 'More from YouTube' section from the navigation sidebar, including its associated links.",
        type: "toggle",
        default: true,
      },
      {
        id: "hideNotificationBell",
        label: "Hide Notification Bell",
        description:
          "Remove the notifications bell from YouTube's interface. This only hides the icon; it does not disable or delete your notifications.",
        type: "toggle",
        default: false,
      },
      {
        id: "hideSidebarNavigation",
        label: "Hide Sidebar Navigation",
        description: "Hide the sidebar navigation on the left of youtube.",
        type: "toggle",
        default: false,
      },
    ],
  },
  {
    id: "appearance",
    title: "Appearance",
    items: [
      {
        id: "blurVideoThumbnails",
        label: "Blur Video Thumbnails",
        description:
          "Apply a blur effect to regular video thumbnails while keeping their image areas and layout visible.",
        type: "toggle",
        default: false,
      },
      {
        id: "hideVideoThumbnails",
        label: "Hide Video Thumbnails",
        description:
          "Conceal regular video thumbnail images while preserving the surrounding video cards and page layout.",
        type: "toggle",
        default: true,
      },
      {
        id: "blurShortsThumbnails",
        label: "Blur Shorts Thumbnails",
        description:
          "Apply a blur effect to Shorts thumbnail images while keeping their image areas and layout visible.",
        type: "toggle",
        default: false,
      },
      {
        id: "hideShortsThumbnails",
        label: "Hide Shorts Thumbnails",
        description:
          "Conceal Shorts thumbnail images while preserving their surrounding cards and layout.",
        type: "toggle",
        default: true,
      },
    ],
  },
  {
    id: "shorts",
    title: "Shorts",
    items: [
      {
        id: "hideShorts",
        label: "Hide Shorts",
        description:
          "Remove Shorts shelves, tabs, links and other supported Shorts elements throughout YouTube.",
        type: "toggle",
        default: true,
      },
      {
        id: "redirectShortsToDefault",
        label: "Open Shorts in Standard Video Player",
        description:
          "Open supported Shorts links in YouTube's standard video player instead of the vertical Shorts viewer.",
        type: "toggle",
        default: true,
      },
      {
        id: "disableInfiniteScroll",
        label: "Disable Infinite Scroll",
        description: "Prevent the shorts from scrolling forever",
        type: "toggle",
        default: true,
      },
    ],
  },
  {
    id: "playback",
    title: "Playback",
    items: [
      {
        id: "disableAutoplay",
        label: "Disable Video Autoplay",
        description:
          "Prevent YouTube from automatically starting the next video when the current video finishes.",
        type: "toggle",
        default: false,
      },
      {
        id: "disableAnnotations",
        label: "Disable Annotations",
        description:
          "Hide supported video annotations and interactive overlays displayed during playback. This does not remove subtitles or captions.",
        type: "toggle",
        default: true,
      },
      {
        id: "hideEndScreenCards",
        label: "Hide End Screen Cards",
        description:
          "Hide clickable video cards and interactive elements that appear over the video near the end of playback.",
        type: "toggle",
        default: true,
      },
      {
        id: "hideEndScreenFeed",
        label: "Hide End Screen Video Feed",
        description:
          "Hide the grid or collection of suggested videos displayed on the video end screen, without necessarily hiding individual end screen cards.",
        type: "toggle",
        default: true,
      },
    ],
  },
  {
    id: "watchPage",
    title: "Watch Page",
    items: [
      {
        id: "hideRecommended",
        label: "Hide Recommended Sidebar",
        description:
          "Remove the recommended videos column beside the video player on the watch page.",
        type: "toggle",
        default: true,
      },
      {
        id: "hideSidebarSuggestions",
        label: "Hide Sidebar Suggestions",
        description:
          "Hide suggested content displayed in the watch page's sidebar, including recommendations and other supported suggestion sections.",
        type: "toggle",
        default: true,
      },
      {
        id: "hideVideoInfo",
        label: "Hide Video Information",
        description:
          "Hide the video's information section, such as its title, channel details, view count and other supported metadata.",
        type: "toggle",
        default: false,
      },
      {
        id: "hidePlaylist",
        label: "Hide Playlist",
        description:
          "Hide the playlist panel displayed alongside a video when watching a playlist. The playlist itself remains intact.",
        type: "toggle",
        default: false,
      },
      {
        id: "hideLiveChat",
        label: "Hide Live Chat",
        description:
          "Remove the live chat panel from live streams and supported premieres. This does not disable chat or affect other viewers.",
        type: "toggle",
        default: false,
      },
      {
        id: "hideFundraiser",
        label: "Hide Fundraisers & Donations",
        description:
          "Hide supported fundraising, donation and charitable campaign panels displayed on YouTube's watch page.",
        type: "toggle",
        default: true,
      },
      {
        id: "hideMerchTickets",
        label: "Hide Merch, Tickets & Offers",
        description:
          "Hide supported merchandise shelves, event ticket links, promotional offers and related shopping banners on the watch page.",
        type: "toggle",
        default: true,
      },
      {
        id: "hideMixes",
        label: "Hide YouTube Mixes",
        description:
          "Remove YouTube Mix playlists and their associated recommendation grids from supported pages. Other playlists remain visible.",
        type: "toggle",
        default: true,
      },
    ],
  },
  {
    id: "privacy",
    title: "Ads & Privacy",
    items: [
      {
        id: "skipCloseAds",
        label: "Skip and Close Ads",
        description:
          "Automatically skip skippable video ads and dismiss supported ad overlays when possible. This does not guarantee that every ad can be skipped or blocked.",
        type: "toggle",
        default: true,
      },
    ],
  },
];
