import { Power } from "lucide-react";

export function DisabledState() {
  const { sharedSettings, changeSharedSetting } = useSharedSettings();

  return (
    <div className="relative space-y-4 gap-3 overflow-hidden rounded-2xl border bg-muted/50 p-8 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.12),transparent_60%)]"
      />

      <div className="relative w-fit mx-auto">
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-destructive/10 [animation-duration:2.5s]"
        />
        <div className="relative flex p-4 items-center justify-center rounded-full bg-linear-to-b from-destructive/20 to-transparent text-destructive shadow-md">
          <Power className="size-5" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-base font-semibold">Cleaner Tube is off</h2>
        <Button
          size={"lg"}
          className="group rounded-full px-4 h-10 cursor-pointer"
          onClick={() =>
            changeSharedSetting("enabled", !sharedSettings.enabled)
          }
        >
          <Power className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
          Enable
        </Button>
      </div>
    </div>
  );
}
