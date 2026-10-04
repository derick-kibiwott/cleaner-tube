// entrypoints/ads-main.content.ts

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  world: "MAIN",

  main() {
    const skipButtonSelectors = [
      ".ytp-ad-skip-button",
      ".ytp-ad-skip-button-modern",
      ".ytp-skip-ad-button",
      ".ytp-skip-ad button",
      "button[class*='skip-ad']",
      "button[class*='ad-skip']",
    ].join(", ");

    function skipAds() {
      if (!document.body.classList.contains("skipCloseAds")) return;

      const buttons =
        document.querySelectorAll<HTMLButtonElement>(skipButtonSelectors);

      buttons.forEach((button) => {
        if (button.offsetParent !== null) {
          button.click();
        }
      });
    }

    setInterval(skipAds, 250);
  },
});
