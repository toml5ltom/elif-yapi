import Link from "next/link";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import type { District } from "@/types";

interface DistrictsGridProps {
  locale: string;
  districts: District[];
}

const DISTRICT_IMAGES: Record<string, string> = {
  basaksehir: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=70",
  beylikduzu: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=70",
  esenyurt: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70",
  sisli: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600&q=70",
  besiktas: "https://images.unsplash.com/photo-1604965921866-fc2e7b3d7f5f?w=600&q=70",
  kadikoy: "https://images.unsplash.com/photo-1589561454226-796a8aa89b05?w=600&q=70",
  sariyer: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70",
  bahcesehir: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=70",
  atasehir: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=70",
};

const DEFAULT_DISTRICTS: District[] = [
  { id: "1", name_ar: "باشاك شهير", name_tr: "Başakşehir", name_en: "Başakşehir", slug: "basaksehir", city: "Istanbul", sort_order: 1, is_active: true, created_at: "", updated_at: "", description_ar: "مركز الاستثمار الجديد في إسطنبول", description_tr: "İstanbul'un yeni yatırım merkezi", description_en: "Istanbul's new investment hub" },
  { id: "2", name_ar: "بيليك دوزو", name_tr: "Beylikdüzü", name_en: "Beylikdüzü", slug: "beylikduzu", city: "Istanbul", sort_order: 2, is_active: true, created_at: "", updated_at: "", description_ar: "إطلالات بحرية وأسعار منافسة", description_tr: "Deniz manzarası ve uygun fiyatlar", description_en: "Sea views and competitive prices" },
  { id: "3", name_ar: "أسنيورت", name_tr: "Esenyurt", name_en: "Esenyurt", slug: "esenyurt", city: "Istanbul", sort_order: 3, is_active: true, created_at: "", updated_at: "", description_ar: "أسعار مناسبة وعوائد إيجارية عالية", description_tr: "Uygun fiyatlar ve yüksek kira getirisi", description_en: "Affordable prices and high rental yields" },
  { id: "4", name_ar: "شيشلي", name_tr: "Şişli", name_en: "Şişli", slug: "sisli", city: "Istanbul", sort_order: 4, is_active: true, created_at: "", updated_at: "", description_ar: "قلب إسطنبول التجاري", description_tr: "İstanbul'un ticaret kalbi", description_en: "The commercial heart of Istanbul" },
  { id: "5", name_ar: "بشكتاش", name_tr: "Beşiktaş", name_en: "Beşiktaş", slug: "besiktas", city: "Istanbul", sort_order: 5, is_active: true, created_at: "", updated_at: "", description_ar: "فخامة على ضفاف البوسفور", description_tr: "Boğaz kıyısında lüks yaşam", description_en: "Luxury living on the Bosphorus" },
  { id: "6", name_ar: "كاديكوي", name_tr: "Kadıköy", name_en: "Kadıköy", slug: "kadikoy", city: "Istanbul", sort_order: 6, is_active: true, created_at: "", updated_at: "", description_ar: "الجانب الآسيوي الراقي", description_tr: "Anadolu yakasının gözde semti", description_en: "The prestigious Asian side" },
];

export default function DistrictsGrid({ locale, districts }: DistrictsGridProps) {
  const t = useTranslations("districts");
  const isRTL = locale === "ar";
  const data = districts.length ? districts.slice(0, 6) : DEFAULT_DISTRICTS;

  const getName = (d: District) =>
    locale === "ar" ? d.name_ar : locale === "tr" ? d.name_tr : d.name_en;
  const getDesc = (d: District) =>
    locale === "ar" ? d.description_ar : locale === "tr" ? d.description_tr : d.description_en;

  return (
    <section className="py-20 bg-[#080808]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container-custom">
        <div className="text-center mb-14">
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            {locale === "ar" ? "نغطي إسطنبول" : locale === "tr" ? "İstanbul'u Kapsıyoruz" : "We Cover Istanbul"}
          </div>
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-white mb-3">{t("title")}</h2>
          <p className="text-text-muted text-sm max-w-lg mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((district, i) => (
            <Link
              key={district.id}
              href={`/${locale}/properties?district=${district.slug}`}
              className="relative group rounded-2xl overflow-hidden h-52 block"
            >
              <img
                src={DISTRICT_IMAGES[district.slug] || DISTRICT_IMAGES.basaksehir}
                alt={getName(district)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="flex items-center gap-1.5 text-gold text-xs mb-1.5">
                  <MapPin size={12} />
                  {locale === "ar" ? "إسطنبول" : "Istanbul"}
                </div>
                <h3 className="text-white font-bold text-lg mb-1 leading-tight">{getName(district)}</h3>
                <p className="text-white/70 text-xs line-clamp-1">{getDesc(district)}</p>

                <div className="mt-3 overflow-hidden h-7">
                  <span className="inline-flex items-center gap-1.5 text-gold text-xs font-medium translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    {t("explore")} →
                  </span>
                </div>
              </div>

              {/* Property count badge */}
              {district.property_count != null && (
                <div className="absolute top-4 end-4 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-gold text-xs font-bold border border-gold/20">
                  {district.property_count}+
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
