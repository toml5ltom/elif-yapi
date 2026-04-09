import { notFound } from "next/navigation";
import { getPropertyBySlug, getSimilarProperties, getLocalizedField, formatPrice, buildPropertyWhatsAppMessage } from "@/lib/api";
import { BedDouble, Bath, Maximize, Building, Calendar, MapPin, Award, Phone, Mail } from "lucide-react";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyGallery from "@/components/properties/PropertyGallery";
import type { Metadata } from "next";

interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params: { locale, slug } }: PageProps): Promise<Metadata> {
  const property = await getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: getLocalizedField(property as any, "title", locale),
    description: getLocalizedField(property as any, "description", locale)?.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params: { locale, slug } }: PageProps) {
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const similar = await getSimilarProperties(property, 3);
  const isRTL = locale === "ar";

  const title = getLocalizedField(property as any, "title", locale);
  const description = getLocalizedField(property as any, "description", locale);
  const address = getLocalizedField(property as any, "address", locale);
  const features = locale === "ar" ? property.features_ar : locale === "tr" ? property.features_tr : property.features_en;
  const districtName = property.district ? getLocalizedField(property.district as any, "name", locale) : null;
  const whatsappMsg = buildPropertyWhatsAppMessage(property, locale);

  const stats = [
    property.rooms != null && { icon: BedDouble, label: locale === "ar" ? "غرف" : locale === "tr" ? "Oda" : "Rooms", value: property.rooms },
    property.bathrooms != null && { icon: Bath, label: locale === "ar" ? "حمامات" : locale === "tr" ? "Banyo" : "Baths", value: property.bathrooms },
    { icon: Maximize, label: locale === "ar" ? "م²" : "m²", value: property.area_sqm },
    property.floor_number != null && { icon: Building, label: locale === "ar" ? "طابق" : locale === "tr" ? "Kat" : "Floor", value: `${property.floor_number}/${property.total_floors || "?"}` },
    property.year_built && { icon: Calendar, label: locale === "ar" ? "سنة البناء" : locale === "tr" ? "Yapım Yılı" : "Year Built", value: property.year_built },
  ].filter(Boolean) as any[];

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
          <a href={`/${locale}`} className="hover:text-gold transition-colors">
            {locale === "ar" ? "الرئيسية" : locale === "tr" ? "Ana Sayfa" : "Home"}
          </a>
          <span>/</span>
          <a href={`/${locale}/properties`} className="hover:text-gold transition-colors">
            {locale === "ar" ? "العقارات" : locale === "tr" ? "Emlaklar" : "Properties"}
          </a>
          <span>/</span>
          <span className="text-text-secondary truncate max-w-[200px]">{title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <PropertyGallery images={property.images} thumbnail={property.thumbnail} title={title} />

            {/* Title & Price */}
            <div className="mt-8">
              {property.is_citizenship_eligible && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold mb-3">
                  <Award size={12} />
                  {locale === "ar" ? "مؤهل للجنسية التركية" : locale === "tr" ? "Türk Vatandaşlığına Uygun" : "Turkish Citizenship Eligible"}
                </div>
              )}
              <h1 className="text-[clamp(22px,4vw,36px)] font-bold text-white mb-3 leading-tight">{title}</h1>

              {(districtName || address) && (
                <div className="flex items-center gap-2 text-text-muted text-sm mb-6">
                  <MapPin size={14} className="text-gold" />
                  {districtName}{address && ` — ${address}`}
                </div>
              )}

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                {stats.map(({ icon: Icon, label, value }: any, i: number) => (
                  <div key={i} className="bg-surface-card border border-[#1F1F1F] rounded-xl p-4 text-center">
                    <Icon size={18} className="text-gold mx-auto mb-2" />
                    <div className="text-white font-bold text-lg leading-none">{value}</div>
                    <div className="text-text-muted text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              {description && (
                <div className="mb-8">
                  <h2 className="text-white font-semibold text-lg mb-3">
                    {locale === "ar" ? "وصف العقار" : locale === "tr" ? "Mülk Açıklaması" : "Property Description"}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
                </div>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div>
                  <h2 className="text-white font-semibold text-lg mb-4">
                    {locale === "ar" ? "المميزات" : locale === "tr" ? "Özellikler" : "Features"}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {features.map((f: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-surface-secondary border border-[#1F1F1F] text-text-secondary text-xs">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-surface-card border border-gold/20 rounded-2xl p-6">
                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b border-[#1F1F1F]">
                  <div className="text-text-muted text-xs mb-1">
                    {locale === "ar" ? "السعر" : locale === "tr" ? "Fiyat" : "Price"}
                  </div>
                  <div className="text-gold text-3xl font-bold price-tag">
                    {formatPrice(property.price, property.currency, locale)}
                  </div>
                  {property.price_period === "monthly" && (
                    <div className="text-text-muted text-xs mt-1">
                      / {locale === "ar" ? "شهرياً" : locale === "tr" ? "Aylık" : "Monthly"}
                    </div>
                  )}
                  <div className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                    property.status === "available"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${property.status === "available" ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                    {locale === "ar"
                      ? property.status === "available" ? "متاح" : "غير متاح"
                      : locale === "tr"
                      ? property.status === "available" ? "Müsait" : "Müsait Değil"
                      : property.status === "available" ? "Available" : "Not Available"}
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/905384995690?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    {locale === "ar" ? "استفسر عبر واتساب" : locale === "tr" ? "WhatsApp ile Sorgula" : "Inquire via WhatsApp"}
                  </a>

                  {/* Tally form link */}
                  <a
                    href="https://tally.so/r/EkJqA2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl font-bold text-sm border border-[#1F1F1F] text-text-secondary hover:text-white hover:border-gold/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    {locale === "ar" ? "أرسل استفساراً" : locale === "tr" ? "Sorgu Gönder" : "Send Inquiry"}
                  </a>
                </div>

                {/* Contact info */}
                <div className="mt-6 pt-6 border-t border-[#1F1F1F]">
                  <div className="text-text-muted text-xs text-center">
                    📞 +90 538 499 5690
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <div className="mt-20">
            <h2 className="text-white font-bold text-2xl mb-8">
              {locale === "ar" ? "عقارات مشابهة" : locale === "tr" ? "Benzer Emlaklar" : "Similar Properties"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => <PropertyCard key={p.id} property={p} locale={locale} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
