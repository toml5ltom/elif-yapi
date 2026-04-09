"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowDown, Search, Home, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  locale: string;
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 15 + Math.random() * 15,
  size: 1 + Math.random() * 2,
}));

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");
  const tSearch = useTranslations("search");
  const [mounted, setMounted] = useState(false);
  const [searchType, setSearchType] = useState<"sale" | "rent">("sale");
  const [searchQuery, setSearchQuery] = useState("");
  const isRTL = locale === "ar";

  useEffect(() => {
    setMounted(true);
  }, []);

  const words =
    locale === "ar"
      ? ["عقارات", "فاخرة", "في", "قلب", "إسطنبول"]
      : locale === "tr"
      ? ["İstanbul'un", "Kalbinde", "Lüks", "Gayrimenkul"]
      : ["Luxury", "Real", "Estate", "in", "Istanbul"];

  return (
    <section
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1800&q=80')",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/40" />

      {/* Gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      {/* Particles */}
      <div className="particles-container">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center py-24">
        {/* Badge */}
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-medium mb-8 transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          {locale === "ar"
            ? "إسطنبول — تركيا"
            : locale === "tr"
            ? "İstanbul — Türkiye"
            : "Istanbul — Turkey"}
        </div>

        {/* H1 — word by word reveal */}
        <h1
          className="text-[clamp(32px,5vw,64px)] font-bold leading-tight mb-6 text-white"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={cn(
                "inline-block mx-1 transition-all duration-500",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${800 + i * 120}ms` }}
            >
              {i === words.length - 1 ? (
                <span className="text-gold-gradient">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            "text-text-secondary text-lg max-w-2xl mx-auto mb-10 transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "1600ms" }}
        >
          {t("subtitle")}
        </p>

        {/* CTA Buttons */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "1900ms" }}
        >
          <Link
            href={`/${locale}/properties`}
            className="btn-gold px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-2 min-w-[180px] justify-center"
          >
            <Building2 size={16} />
            {t("cta_browse")}
          </Link>
          <a
            href="https://wa.me/905384995690"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm min-w-[180px] justify-center border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.05 2.003c-5.522 0-10.002 4.481-10.002 9.999 0 1.763.462 3.416 1.268 4.853L2.05 22l5.277-1.384a9.965 9.965 0 004.723 1.198h.004c5.52 0 10-4.48 10-9.999 0-5.52-4.48-10.003-10.004-10.003zm0 18.166h-.003a8.293 8.293 0 01-4.228-1.155l-.303-.18-3.14.823.837-3.056-.197-.315a8.289 8.289 0 01-1.271-4.416c0-4.583 3.73-8.313 8.313-8.313 4.583 0 8.314 3.73 8.314 8.314-.003 4.583-3.733 8.298-8.322 8.298z" />
            </svg>
            {t("cta_whatsapp")}
          </a>
        </div>

        {/* Quick Search Glass Card */}
        <div
          className={cn(
            "glass rounded-2xl p-4 max-w-2xl mx-auto transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "2200ms" }}
        >
          {/* Type toggle */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setSearchType("sale")}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                searchType === "sale"
                  ? "bg-gold text-black"
                  : "text-text-muted hover:text-white"
              )}
            >
              {tSearch("sale")}
            </button>
            <button
              onClick={() => setSearchType("rent")}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                searchType === "rent"
                  ? "bg-gold text-black"
                  : "text-text-muted hover:text-white"
              )}
            >
              {tSearch("rent")}
            </button>
          </div>

          {/* Search input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search
                size={16}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-text-muted",
                  isRTL ? "right-3" : "left-3"
                )}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search_placeholder")}
                className={cn(
                  "input-gold w-full py-3 rounded-xl text-sm",
                  isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                )}
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
            <Link
              href={`/${locale}/properties?type=${searchType}${
                searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""
              }`}
              className="btn-gold px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap"
            >
              {t("search_btn")}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700",
            mounted ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "3000ms" }}
        >
          <span className="text-text-muted text-xs tracking-widest uppercase">
            {locale === "ar" ? "اكتشف" : locale === "tr" ? "Keşfet" : "Explore"}
          </span>
          <ArrowDown size={16} className="text-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
}
