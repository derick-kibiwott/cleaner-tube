export function removeSettings<T extends object>(
  oldSettings: T,
  settings: (keyof T)[],
): Partial<T> {
  return Object.fromEntries(
    Object.entries(oldSettings).filter(
      ([key]) => !settings.includes(key as keyof T),
    ),
  ) as Partial<T>;
}

export function isPresetSettings(value: unknown): value is PresetSettings {
  if (!value || typeof value !== "object") return false;

  const preset = value as Record<string, unknown>;

  return (
    typeof preset.name === "string" &&
    (preset.description === undefined ||
      typeof preset.description === "string") &&
    typeof preset.settings === "object" &&
    preset.settings !== null
  );
}

export function isPresetRecord(
  value: unknown,
): value is Record<string, PresetSettings> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every(isPresetSettings);
}

export function getPresetKey(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const TEMP_PREFIX = "temp_";

export const isTempKey = (key: string) => key.startsWith(TEMP_PREFIX);

export const getTempKey = (baseKey: string) =>
  `${TEMP_PREFIX}${baseKey}_modified`;

export function matchesQuery(
  query: string,
  ...fields: (string | undefined)[]
): boolean {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;

  const haystack = fields.filter(Boolean).join(" ").toLowerCase();
  return terms.every((term) => haystack.includes(term));
}
