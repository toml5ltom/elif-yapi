"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { locales, localeNames } from "@/i18n/config";

interface LanguageSwitcherProps {
  locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Replace the locale segment in the pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#1F1F1F] hover:border-gold/30 text-text-secondary hover:text-white transition-all text-sm"
      >
        <Globe size={14} />
        <span className="font-medium">{localeNames[locale as keyof typeof localeNames]}</span>
        <ChevronDown
          size={12}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 z-20 min-w-[140px] bg-[#111] border border-[#1F1F1F] rounded-xl overflow-hidden shadow-2xl shadow-black/50">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
                  l === locale
                    ? "text-gold bg-gold/5"
                    : "text-text-secondary hover:text-white hover:bg-surface-secondary"
                )}
              >
                <span>{localeNames[l]}</span>
                {l === locale && (
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
