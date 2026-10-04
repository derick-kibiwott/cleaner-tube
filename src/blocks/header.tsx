import { Power, PowerOff } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useSharedSettings } from "@/hooks/useSharedSettings";
import { Logo } from "@/components/logo";

export function Header() {
  const { sharedSettings, changeSharedSetting } = useSharedSettings();

  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-2 border-b-2 rounded-b-xl border-border">
      <div className="flex items-center gap-1.5">
        <Logo className="size-8" />
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold tracking-tight">
            Cleaner Tube
            <span className="text-xs text-muted-foreground font-normal">
              &nbsp;&ndash;&nbsp;Make Youtube Yours
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />

        <Button
          onClick={() =>
            changeSharedSetting("enabled", !sharedSettings.enabled)
          }
          size={"icon-lg"}
          variant={sharedSettings.enabled ? "destructive" : "outline"}
          title={sharedSettings.enabled ? "Power Off" : "Power On"}
          className="rounded-2xl"
        >
          {sharedSettings.enabled ? <Power /> : <PowerOff />}
        </Button>
      </div>
    </header>
  );
}
