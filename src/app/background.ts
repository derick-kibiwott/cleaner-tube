import { sharedSettingsStorage } from "@/utils/storage";
import { SHARED_SETTINGS } from "@/utils/settings";

const SIZES = [16, 32, 48, 128];
let grayIcons: Record<number, ImageData> | null = null;

async function loadGrayIcons() {
  if (grayIcons) return grayIcons;
  const icons: Record<number, ImageData> = {};

  for (const size of SIZES) {
    const response = await fetch(
      browser.runtime.getURL(`/icons/${size}.png` as any),
    );
    const bitmap = await createImageBitmap(await response.blob());

    const ctx = new OffscreenCanvas(size, size).getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, size, size);

    const img = ctx.getImageData(0, 0, size, size);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i] ?? 0;
      const g = d[i + 1] ?? 0;
      const b = d[i + 2] ?? 0;
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      d[i] = d[i + 1] = d[i + 2] = gray; // alpha untouched
    }
    icons[size] = img;
  }

  return (grayIcons = icons);
}

async function updateIcon(enabled: boolean) {
  if (enabled) {
    await browser.action.setIcon({
      path: Object.fromEntries(SIZES.map((s) => [s, `/icons/${s}.png`])),
    });
  } else {
    await browser.action.setIcon({ imageData: await loadGrayIcons() });
  }
}

export default defineBackground(() => {
  const apply = (value?: { enabled?: boolean }) =>
    updateIcon({ ...SHARED_SETTINGS, ...value }.enabled);

  // Runs each time the service worker wakes, including after a browser restart
  sharedSettingsStorage.getValue().then(apply);
  sharedSettingsStorage.watch(apply);
});
