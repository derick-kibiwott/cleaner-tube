import "./App.css";
import { Header } from "@/blocks/header";
import { useSharedSettings } from "@/hooks/useSharedSettings";
import { Content } from "@/blocks/content";
import { DisabledState } from "@/blocks/disabled-state";
import { Footer } from "@/blocks/footer";
import React from "react";
import { SearchAndSave } from "@/blocks/search-and-save";
import { TooltipProvider } from "@/components/tooltip";

export default function Popup() {
  const { sharedSettings } = useSharedSettings();
  const [query, setQuery] = useState("");

  React.useEffect(() => {
    const body = document.body;

    body.classList.remove("light", "dark", "system");

    if (sharedSettings?.theme) {
      body.classList.add(sharedSettings.theme);
    }

    return () => {
      body.classList.remove("light", "dark", "system");
    };
  }, [sharedSettings?.theme]);

  return (
    <TooltipProvider>
      <div className={"space-y-4 text-foreground bg-background w-md"}>
        <Header />
        <SearchAndSave query={query} onQueryChange={setQuery} />
        <div className="px-4 bg-background rounded-b-lg">
          {sharedSettings.enabled ? (
            <Content query={query} />
          ) : (
            <DisabledState />
          )}
        </div>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
