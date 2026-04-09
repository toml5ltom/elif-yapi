import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { getProperties, getDistricts } from "@/lib/api";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilter from "@/components/properties/PropertyFilter";
import type { PropertyFilters } from "@/types";

export const revalidate = 300; // 5 min

interface PageProps {
  params: { locale: string };
  searchParams: Record<string, string>;
}

function PageHeader({ locale }: { locale: string }) {
  const titles = { ar: "العقارات", tr: "Emlaklar", en: "Properties" };
  const subs = { ar: "اكتشف أفضل العقارات في إسطنبول", tr: "İstanbul'un en iyi mülklerini keşfedin", en: "Discover the finest properties in Istanbul" };
  return (
    <div className="bg-[#080808] border-b border-[#1F1F1F] pt-28 pb-10">
      <div className="container-custom">
        <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
          {locale === "ar" ? "إسطنبول، تركيا" : "Istanbul, Turkey"}
        </div>
        <h1 className="text-[clamp(28px,5vw,48px)] font-bold text-white">
          {titles[locale as keyof typeof titles] || titles.ar}
        </h1>
        <p className="text-text-muted mt-2 text-sm">
          {subs[locale as keyof typeof subs] || subs.ar}
        </p>
      </div>
    </div>
  );
}

export default async function PropertiesPage({ params: { locale }, searchParams }: PageProps) {
  const filters: PropertyFilters = {
    type: (searchParams.type as any) || undefined,
    category: (searchParams.category as any) || undefined,
    district: searchParams.district || undefined,
    priceMin: searchParams.priceMin ? Number(searchParams.priceMin) : undefined,
    priceMax: searchParams.priceMax ? Number(searchParams.priceMax) : undefined,
    roomsMin: searchParams.roomsMin ? Number(searchParams.roomsMin) : undefined,
    sort: (searchParams.sort as any) || "newest",
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: 12,
    featured: searchParams.featured === "true",
    citizenship: searchParams.citizenship === "true",
  };

  const [{ properties, count }, districts] = await Promise.all([
    getProperties(filters),
    getDistricts(),
  ]);

  const isRTL = locale === "ar";

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <PageHeader locale={locale} />

      <div className="bg-[#0A0A0A] min-h-screen">
        <div className="container-custom py-8">
          {/* Filter bar */}
          <PropertyFilter locale={locale} districts={districts} filters={filters} total={count} />

          {/* Grid */}
          {properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} locale={locale} />
                ))}
              </div>

              {/* Pagination */}
              {count > 12 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: Math.ceil(count / 12) }, (_, i) => i + 1).map((page) => (
                    <a
                      key={page}
                      href={`?${new URLSearchParams({ ...searchParams, page: String(page) })}`}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                        page === (filters.page || 1)
                          ? "bg-gold text-black"
                          : "border border-[#1F1F1F] text-text-muted hover:border-gold/30 hover:text-white"
                      }`}
                    >
                      {page}
                    </a>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🏙️</div>
              <h3 className="text-white font-semibold text-xl mb-2">
                {locale === "ar" ? "لا توجد عقارات" : locale === "tr" ? "Mülk bulunamadı" : "No properties found"}
              </h3>
              <p className="text-text-muted text-sm">
                {locale === "ar" ? "جرب تغيير معايير البحث" : locale === "tr" ? "Arama kriterlerini değiştirmeyi deneyin" : "Try adjusting your search criteria"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
