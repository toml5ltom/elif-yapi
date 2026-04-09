import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PropertyCard from "@/components/properties/PropertyCard";
import type { Property } from "@/types";

interface FeaturedPropertiesProps {
  locale: string;
  properties: Property[];
}

export default function FeaturedProperties({ locale, properties }: FeaturedPropertiesProps) {
  const t = useTranslations("property");
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  if (!properties.length) return null;

  return (
    <section className="py-20 bg-[#0A0A0A]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              {locale === "ar" ? "اختياراتنا" : locale === "tr" ? "Seçimlerimiz" : "Our Selection"}
            </div>
            <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-white">
              {t("featured")}
            </h2>
            <p className="text-text-muted mt-2 text-sm">{t("featured_sub")}</p>
          </div>
          <Link
            href={`/${locale}/properties`}
            className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium whitespace-nowrap group"
          >
            {t("view_all")}
            <ArrowIcon size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} locale={locale} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/properties`}
            className="inline-flex items-center gap-2 btn-gold px-8 py-3.5 rounded-xl font-bold text-sm"
          >
            {t("view_all")}
            <ArrowIcon size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
