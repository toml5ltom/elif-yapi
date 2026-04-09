"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import type { District, PropertyFilters } from "@/types";

interface PropertyFilterProps {
  locale: string;
  districts: District[];
  filters: PropertyFilters;
  total: number;
}

const CATEGORIES = ["apartment", "villa", "shop", "office", "land", "citizenship"] as const;
const SORT_OPTIONS = [
  { value: "newest", ar: "الأحدث", tr: "En Yeni", en: "Newest" },
  { value: "price_asc", ar: "السعر: الأقل", tr: "Fiyat: Düşük", en: "Price: Low" },
  { value: "price_desc", ar: "السعر: الأعلى", tr: "Fiyat: Yüksek", en: "Price: High" },
  { value: "featured", ar: "المميزة أولاً", tr: "Öne Çıkanlar", en: "Featured" },
];

export default function PropertyFilter({ locale, districts, filters, total }: PropertyFilterProps) {
  const t = useTranslations("search");
  const tProp = useTranslations("property");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const isRTL = locale === "ar";

  const updateFilter = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") params.delete(key);
    else params.set(key, value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  const clearAll = () => router.push(pathname);

  const hasFilters = ["type", "category", "district", "sort"].some(
    (k) => searchParams.get(k)
  );

  const getDistrictName = (d: District) =>
    locale === "ar" ? d.name_ar : locale === "tr" ? d.name_tr : d.name_en;

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type toggle */}
        <div className="flex items-center bg-surface-secondary rounded-xl p-1 border border-[#1F1F1F]">
          <button
            onClick={() => updateFilter("type", null)}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", !filters.type ? "bg-gold text-black" : "text-text-muted hover:text-white")}
          >
            {t("all")}
          </button>
          <button
            onClick={() => updateFilter("type", "sale")}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", filters.type === "sale" ? "bg-gold text-black" : "text-text-muted hover:text-white")}
          >
            {t("sale")}
          </button>
          <button
            onClick={() => updateFilter("type", "rent")}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", filters.type === "rent" ? "bg-gold text-black" : "text-text-muted hover:text-white")}
          >
            {t("rent")}
          </button>
        </div>

        {/* Category select */}
        <select
          value={filters.category || ""}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="input-gold px-4 py-2.5 rounded-xl text-sm cursor-pointer"
        >
          <option value="">{t("category")}</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{tProp(`categories.${c}` as any)}</option>
          ))}
        </select>

        {/* District select */}
        <select
          value={filters.district || ""}
          onChange={(e) => updateFilter("district", e.target.value)}
          className="input-gold px-4 py-2.5 rounded-xl text-sm cursor-pointer"
        >
          <option value="">{t("district")}</option>
          {districts.map((d) => (
            <option key={d.id} value={d.slug}>{getDistrictName(d)}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sort || "newest"}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="input-gold px-4 py-2.5 rounded-xl text-sm cursor-pointer ms-auto"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o[locale as keyof typeof o] || o.en}
            </option>
          ))}
        </select>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-text-muted hover:text-gold text-sm transition-colors"
          >
            <X size={14} />
            {locale === "ar" ? "مسح" : locale === "tr" ? "Temizle" : "Clear"}
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="mt-4 text-text-muted text-sm">
        {total > 0 && (
          <span>
            {locale === "ar"
              ? `${total} عقار`
              : locale === "tr"
              ? `${total} mülk`
              : `${total} properties`}
          </span>
        )}
      </div>
    </div>
  );
}
