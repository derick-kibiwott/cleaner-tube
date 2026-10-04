import { useState } from "react";
import { ChevronDown, Plus, Save, Search, Trash2, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Input } from "@/components/input";
import { Textarea } from "@/components/text-area";
import { Label } from "@/components/label";
import { isTempKey } from "@/lib/shared";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alert-dialog";

export function SearchAndSave({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (query: string) => void;
}) {
  const {
    allPresets,
    activePreset,
    basePreset,
    baseKey,
    isModified,
    isBaseCustom,
    selectPreset,
    saveToBase,
    saveAsNew,
    deletePreset,
    renamePreset,
  } = usePresetSettings();

  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editError, setEditError] = useState<string | null>(null);

  const openEdit = () => {
    if (!isBaseCustom || !basePreset) return;
    setEditName(basePreset.name);
    setEditDescription(basePreset.description ?? "");
    setEditError(null);
    setEditOpen(true);
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseKey) return;
    const result = await renamePreset(baseKey, editName, editDescription);
    if (result) return setEditError(result);
    setEditOpen(false);
  };

  const requestDelete = (key: string) => {
    setEditOpen(false);
    setMenuOpen(false);
    setDeleteKey(key);
  };

  const confirmDelete = async () => {
    if (!deleteKey) return;
    await deletePreset(deleteKey);
    if (pendingKey === deleteKey) setPendingKey(null); // banner target is gone
    setDeleteKey(null);
  };

  const defaultPresetKeys = new Set(Object.keys(PRESET_SETTINGS));
  const customPresets = Object.entries(allPresets).filter(
    ([key]) => !defaultPresetKeys.has(key) && !isTempKey(key),
  );

  const handlePresetChange = (key: string) => {
    if (key === baseKey) return; // re-clicking the selected item is not a switch
    if (isModified) setPendingKey(key);
    else selectPreset(key);
  };

  const handleDiscard = async () => {
    if (!pendingKey) return;
    await selectPreset(pendingKey);
    setPendingKey(null);
  };

  const handleBannerSave = async () => {
    if (!pendingKey) return;
    if (isBaseCustom) {
      await saveToBase();
      await selectPreset(pendingKey);
      setPendingKey(null);
    } else {
      setPopoverOpen(true); // built-in: needs a name; switch happens after saving
    }
  };

  const handleCreate = async () => {
    const result = await saveAsNew(name, description);
    if (result) return setError(result);

    if (pendingKey) {
      await selectPreset(pendingKey);
      setPendingKey(null);
    }
    setPopoverOpen(false);
    setName("");
    setDescription("");
    setError(null);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {pendingKey && basePreset && (
          <div className="relative mx-4 rounded-md border bg-muted p-3 pr-9 text-sm">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 size-6"
              aria-label="Cancel"
              onClick={() => setPendingKey(null)}
            >
              <X className="size-4" />
            </Button>
            <p className="text-xs font-medium">
              You have unsaved changes to {basePreset.name}.
            </p>
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="outline" onClick={handleDiscard}>
                Discard
              </Button>
              <Button size="sm" onClick={handleBannerSave}>
                Save
              </Button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 px-4">
          <InputGroup className="min-w-0 flex-1">
            <InputGroupAddon align="inline-start">
              <Search className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              id="settings-search"
              placeholder="Search settings..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
            />
            {query && (
              <InputGroupAddon align="inline-end">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  aria-label="Clear search"
                  onClick={() => onQueryChange("")}
                >
                  <X className="size-3.5" />
                </Button>
              </InputGroupAddon>
            )}
          </InputGroup>

          <ButtonGroup>
            <Popover open={editOpen} onOpenChange={setEditOpen}>
              <PopoverAnchor asChild>
                <Button
                  variant="outline"
                  className="justify-start"
                  title={
                    isBaseCustom
                      ? "Double-click to edit"
                      : activePreset?.description
                  }
                  onDoubleClick={openEdit}
                  onKeyDown={(e) => {
                    if (e.key === "F2") openEdit();
                  }}
                >
                  <span className="truncate">
                    {activePreset?.name ?? "Default Presets"}
                  </span>
                </Button>
              </PopoverAnchor>

              <PopoverContent align="start" className="w-72">
                <form onSubmit={submitEdit} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      autoFocus
                      value={editName}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        setEditName(e.target.value);
                        setEditError(null);
                      }}
                    />
                    {editError && (
                      <p className="text-xs text-destructive">{editError}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="edit-desc">Description (optional)</Label>
                    <Textarea
                      id="edit-desc"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </div>

                  <Button type="submit" size="sm" className="w-full">
                    Save
                  </Button>
                </form>
              </PopoverContent>
            </Popover>

            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Choose preset"
                >
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent sideOffset={8} align="end" className="w-38">
                <DropdownMenuRadioGroup
                  value={baseKey ?? ""}
                  onValueChange={handlePresetChange}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Default Presets</DropdownMenuLabel>
                    {Object.entries(PRESET_SETTINGS).map(([key, preset]) => (
                      <DropdownMenuRadioItem
                        key={key}
                        value={key}
                        title={preset.description}
                      >
                        {preset.name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuGroup>

                  {customPresets.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Custom Presets</DropdownMenuLabel>
                        {customPresets.map(([key, preset]) => (
                          <div key={key} className="flex items-center">
                            <DropdownMenuRadioItem
                              value={key}
                              className="flex-1"
                              title={preset.description}
                            >
                              {preset.name}
                            </DropdownMenuRadioItem>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                              aria-label={`Delete ${preset.name}`}
                              onClick={() => requestDelete(key)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        ))}
                      </DropdownMenuGroup>
                    </>
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Save to the custom preset being edited */}
            {isModified && isBaseCustom && basePreset && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    aria-label={`Save to ${basePreset.name}`}
                    onClick={() => saveToBase()}
                  >
                    <Save className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save to {basePreset.name}</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Save as a new custom preset */}
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      disabled={!isModified}
                      aria-label="Save current settings as preset"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save as custom settings</p>
                </TooltipContent>
              </Tooltip>

              <PopoverContent align="end" className="w-72 space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="preset-name">Name</Label>
                  <Input
                    id="preset-name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                    }}
                  />
                  {error && <p className="text-xs text-destructive">{error}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="preset-desc">Description (optional)</Label>
                  <Textarea
                    id="preset-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <Button size="sm" className="w-full" onClick={handleCreate}>
                  Save preset
                </Button>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        </div>
      </div>
      <AlertDialog
        open={deleteKey !== null}
        onOpenChange={(open) => !open && setDeleteKey(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {deleteKey ? allPresets[deleteKey]?.name : "preset"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the preset. Built-in presets are not
              affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
