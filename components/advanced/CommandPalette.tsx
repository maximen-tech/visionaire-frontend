"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const runCommand = useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Command Dialog */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            <Command
              className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-2xl border border-slate-200 dark:border-dark-border-medium overflow-hidden"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  setOpen(false);
                }
              }}
            >
              {/* Search Input */}
              <div className="flex items-center border-b border-slate-200 dark:border-dark-border-medium px-4">
                <svg
                  className="w-5 h-5 text-slate-400 dark:text-dark-text-tertiary mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Rechercher ou taper une commande..."
                  className="w-full bg-transparent py-4 text-slate-900 dark:text-dark-text-primary placeholder-slate-400 dark:placeholder-dark-text-tertiary outline-none"
                />
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 dark:border-dark-border-medium bg-slate-100 dark:bg-dark-bg-tertiary px-1.5 font-mono text-xs text-slate-600 dark:text-dark-text-secondary">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-96 overflow-y-auto p-2">
                <Command.Empty className="py-12 text-center text-sm text-slate-500 dark:text-dark-text-secondary">
                  Aucun résultat trouvé.
                </Command.Empty>

                {/* Navigation Group */}
                <Command.Group
                  heading="Navigation"
                  className="text-xs font-semibold text-slate-500 dark:text-dark-text-secondary px-2 py-1.5"
                >
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/"))}
                    icon="🏠"
                  >
                    Accueil
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/about"))}
                    icon="ℹ️"
                  >
                    À propos
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/pricing"))}
                    icon="💰"
                  >
                    Tarifs
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/blog"))}
                    icon="📝"
                  >
                    Blog
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/contact"))}
                    icon="📧"
                  >
                    Contact
                  </CommandItem>
                </Command.Group>

                <Command.Separator className="h-px bg-slate-200 dark:bg-dark-border-medium my-2" />

                {/* Theme Group */}
                <Command.Group
                  heading="Apparence"
                  className="text-xs font-semibold text-slate-500 dark:text-dark-text-secondary px-2 py-1.5"
                >
                  <CommandItem
                    onSelect={() => runCommand(() => setTheme("light"))}
                    icon="☀️"
                    selected={theme === "light"}
                  >
                    Mode clair
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => setTheme("dark"))}
                    icon="🌙"
                    selected={theme === "dark"}
                  >
                    Mode sombre
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => setTheme("system"))}
                    icon="💻"
                    selected={theme === "system"}
                  >
                    Système
                  </CommandItem>
                </Command.Group>

                <Command.Separator className="h-px bg-slate-200 dark:bg-dark-border-medium my-2" />

                {/* Actions Group */}
                <Command.Group
                  heading="Actions"
                  className="text-xs font-semibold text-slate-500 dark:text-dark-text-secondary px-2 py-1.5"
                >
                  <CommandItem
                    onSelect={() => runCommand(() => window.scrollTo({ top: 0, behavior: "smooth" }))}
                    icon="⬆️"
                  >
                    Retour en haut
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => navigator.clipboard.writeText(window.location.href))}
                    icon="🔗"
                  >
                    Copier le lien
                  </CommandItem>
                </Command.Group>
              </Command.List>

              {/* Footer */}
              <div className="border-t border-slate-200 dark:border-dark-border-medium px-4 py-3 flex items-center justify-between text-xs text-slate-500 dark:text-dark-text-secondary">
                <span>Naviguez avec les flèches</span>
                <div className="flex items-center gap-2">
                  <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 dark:border-dark-border-medium bg-slate-100 dark:bg-dark-bg-tertiary px-1.5 font-mono">
                    ↵
                  </kbd>
                  <span>pour sélectionner</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface CommandItemProps {
  children: React.ReactNode;
  onSelect: () => void;
  icon?: string;
  selected?: boolean;
}

function CommandItem({ children, onSelect, icon, selected }: CommandItemProps) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-dark-text-primary cursor-pointer hover:bg-slate-100 dark:hover:bg-dark-bg-tertiary data-[selected]:bg-slate-100 dark:data-[selected]:bg-dark-bg-tertiary transition-colors"
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="flex-1">{children}</span>
      {selected && (
        <svg
          className="w-4 h-4 text-cyan-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </Command.Item>
  );
}

// Hook to use CommandPalette
export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
}
