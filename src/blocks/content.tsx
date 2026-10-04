import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { ScrollArea, ScrollBar } from "@/components/scroll-area";
import { Switch } from "@/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { usePresetSettings } from "@/hooks/usePresetSettings";
import { matchesQuery } from "@/lib/shared";
import { YOUTUBE_SETTINGS } from "@/utils/settings";

export const Content = ({ query }: { query: string }) => {
  const { activePreset, updateSetting } = usePresetSettings();
  const [activeTab, setActiveTab] = useState(YOUTUBE_SETTINGS[0]?.id);

  // Keep only matching settings, then drop tabs left with none
  const visibleTabs = useMemo(
    () =>
      YOUTUBE_SETTINGS.map((tab) => ({
        ...tab,
        items: tab.items.filter((setting) =>
          matchesQuery(query, setting.label, setting.description),
        ),
      })).filter((tab) => tab.items.length > 0),
    [query],
  );

  // If the selected tab was filtered out, show the first remaining one
  const currentTab = visibleTabs.some((tab) => tab.id === activeTab)
    ? activeTab
    : visibleTabs[0]?.id;

  if (visibleTabs.length === 0) {
    return (
      <div className="mx-2.5 mt-2 flex h-55 items-center justify-center rounded-lg border-2 border-primary px-4 text-center text-sm text-muted-foreground">
        No settings match “{query.trim()}”.
      </div>
    );
  }

  return (
    <Tabs value={currentTab} onValueChange={setActiveTab}>
      <ScrollArea
        className="relative w-full px-2.5 pt-2"
        viewPortClassName="scroll-fade-x"
      >
        <TabsList>
          {visibleTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-[13px]">
              <tab.icon className="size-4" />
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <ScrollBar orientation="horizontal" className="data-horizontal:h-0" />
      </ScrollArea>

      <div className="border-2 rounded-lg border-primary -mt-0.5">
        {visibleTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <ScrollArea
              className="h-55 rounded-md"
              viewPortClassName="scroll-fade-y"
            >
              <div className="px-4">
                {tab.items.map((setting) => {
                  const value = activePreset?.settings[setting.id];

                  return (
                    <label
                      key={setting.id}
                      className="flex flex-col gap-0.5 py-3 px-3 not-last:border-b cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {setting.label}
                        </span>

                        {setting.type === "toggle" ? (
                          <Switch
                            checked={value === true}
                            onCheckedChange={(checked) =>
                              updateSetting(setting.id, checked)
                            }
                          />
                        ) : (
                          <Select
                            value={
                              (value as string | undefined) ??
                              setting.options[0]?.id
                            }
                            onValueChange={(v) => updateSetting(setting.id, v)}
                          >
                            <SelectTrigger className="w-fit">
                              <SelectValue
                                placeholder={setting.options[0]?.label}
                              />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {setting.options.map((option) => (
                                  <SelectItem key={option.id} value={option.id}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      </div>

                      {setting.description && (
                        <p className="text-xs tracking-wider text-muted-foreground">
                          {setting.description}
                        </p>
                      )}
                    </label>
                  );
                })}
              </div>

              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
