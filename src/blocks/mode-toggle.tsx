// src/components/mode-toggle.tsx
import { MoonIcon, SunMediumIcon } from "lucide-react";
import { Switch } from "../components/switch";
import { useSharedSettings } from "@/hooks/useSharedSettings";

export const ModeToggle = () => {
  const { sharedSettings, changeSharedSetting } = useSharedSettings();
  const isDarkMode = sharedSettings.theme === "dark";
  const Icon = isDarkMode ? MoonIcon : SunMediumIcon;

  return (
    <Switch
      checked={sharedSettings.theme === "dark"}
      className="h-7 w-12"
      icon={<Icon className="size-4" />}
      onCheckedChange={(checked) => {
        changeSharedSetting("theme", checked ? "dark" : "light");
      }}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      thumbClassName="size-6 data-[state=checked]:translate-x-5"
    />
  );
};
