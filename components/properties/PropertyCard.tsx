"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { BedDouble, Bath, Maximize, MapPin, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, getLocalizedField } from "@/lib/api";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  locale: string;
  className?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  apartment: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  villa: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  shop: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  office: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  land: "bg-green-500/10 text-green-400 border-green-500/20",
  citizenship: "bg-gold/10 text-gold border-gold/20",
};

export default function PropertyCard({ property, locale, className }: PropertyCardProps) {
  const t = useTranslations("property");
  const tCommon = useTranslations("common");
  const isRTL = locale === "ar";

  const title = getLocalizedField(property as any, "title", locale);
  const address = getLocalizedField(property as any, "address", locale);
  const districtName = property.district
    ? getLocalizedField(property.district as any, "name", locale)
    : null;

  const thumbnail =
    property.thumbnail ||
    property.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80";

  const categoryLabel = t(`categories.${property.category}` as any);

  return (
    <Link
      href={`/${locale}/properties/${property.slug}`}
      className={cn("property-card rounded-2xl overflow-hidden block group", className)}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-surface-secondary">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className={cn("absolute top-3 flex gap-2", isRTL ? "right-3" : "left-3")}>
          <span
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-semibold border",
              CATEGORY_COLORS[property.category] || CATEGORY_COLORS.apartment
            )}
          >
            {categoryLabel}
          </span>
          {property.is_citizenship_eligible && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gold text-black flex items-center gap-1">
              <Award size={10} />
              {locale === "ar" ? "جنسية" : locale === "tr" ? "Vatandaşlık" : "Citizenship"}
            </span>
          )}
        </div>

        {/* Type badge */}
        <div className={cn("absolute bottom-3", isRTL ? "left-3" : "right-3")}>
          <span
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-bold",
              property.type === "sale"
                ? "bg-gold text-black"
                : "bg-white/20 text-white backdrop-blur-sm"
            )}
          >
            {property.type === "sale" ? t("categories.apartment").split("")[0] : ""}
            {locale === "ar"
              ? property.type === "sale"
                ? "للبيع"
                : "للإيجار"
              : locale === "tr"
              ? property.type === "sale"
                ? "Satılık"
                : "Kiralık"
              : property.type === "sale"
              ? "For Sale"
              : "For Rent"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-gold text-xl font-bold price-tag leading-tight">
            {formatPrice(property.price, property.currency, locale)}
            {property.price_period === "monthly" && (
              <span className="text-text-muted text-xs font-normal">
                {" "}/ {tCommon("per_month")}
              </span>
            )}
          </span>
          {property.status !== "available" && (
            <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 text-xs border border-red-500/20 shrink-0">
              {t(property.status as any)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-base mb-2 line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Location */}
        {(districtName || address) && (
          <div className="flex items-center gap-1.5 text-text-muted text-xs mb-4">
            <MapPin size={12} className="text-gold shrink-0" />
            <span className="truncate">{districtName || address}</span>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-[#1F1F1F]">
          {property.rooms != null && (
            <div className="flex items-center gap-1.5 text-text-secondary text-xs">
              <BedDouble size={13} className="text-gold/70" />
              <span>
                {property.rooms} {t("rooms")}
              </span>
            </div>
          )}
          {property.bathrooms != null && (
            <div className="flex items-center gap-1.5 text-text-secondary text-xs">
              <Bath size={13} className="text-gold/70" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-text-secondary text-xs ms-auto">
            <Maximize size={13} className="text-gold/70" />
            <span>
              {property.area_sqm} {tCommon("sqm")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
