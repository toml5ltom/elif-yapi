import Link from "next/link";
import { useTranslations } from "next-intl";
import { Award, Clock, Users, DollarSign, ArrowRight, ArrowLeft } from "lucide-react";

interface CitizenshipBannerProps {
  locale: string;
}

export default function CitizenshipBanner({ locale }: CitizenshipBannerProps) {
  const t = useTranslations("citizenship");
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 bg-[#0A0A0A] relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Decorative bg */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1400&q=60')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />

      <div className="container-custom relative">
        <div className="bg-surface-card border border-gold/20 rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: content */}
            <div className="p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold mb-6">
                <Award size={14} />
                {locale === "ar"
                  ? "برنامج الجنسية التركية"
                  : locale === "tr"
                  ? "Türk Vatandaşlık Programı"
                  : "Turkish Citizenship Program"}
              </div>

              <h2 className="text-[clamp(22px,3.5vw,38px)] font-bold text-white mb-4 leading-tight">
                {t("title")}
              </h2>
              <p className="text-text-secondary text-sm mb-8 leading-relaxed max-w-md">
                {t("subtitle")}
              </p>

              {/* Key facts */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#1A1A1A] rounded-xl p-4">
                  <DollarSign size={18} className="text-gold mb-2" />
                  <div className="text-gold font-bold text-lg">$400,000+</div>
                  <div className="text-text-muted text-xs">{t("min_investment")}</div>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-4">
                  <Clock size={18} className="text-gold mb-2" />
                  <div className="text-gold font-bold text-lg">3-6</div>
                  <div className="text-text-muted text-xs">
                    {t("months")} — {t("processing_time")}
                  </div>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-4 col-span-2">
                  <Users size={18} className="text-gold mb-2" />
                  <div className="text-white font-medium text-sm">{t("family_included")}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/${locale}/citizenship`}
                  className="btn-gold px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                >
                  {t("cta")}
                  <ArrowIcon size={16} />
                </Link>
                <Link
                  href={`/${locale}/properties?citizenship=true`}
                  className="px-6 py-3 rounded-xl font-bold text-sm border border-gold/30 text-gold hover:bg-gold/5 transition-colors flex items-center justify-center gap-2"
                >
                  {locale === "ar"
                    ? "عقارات الجنسية"
                    : locale === "tr"
                    ? "Vatandaşlık Mülkleri"
                    : "Citizenship Properties"}
                </Link>
              </div>
            </div>

            {/* Right: Steps timeline */}
            <div className="bg-gradient-to-br from-gold/5 to-transparent p-10 lg:p-14 border-t lg:border-t-0 lg:border-s border-gold/10">
              <h3 className="text-white font-semibold text-lg mb-8">
                {locale === "ar"
                  ? "خطوات الحصول على الجنسية"
                  : locale === "tr"
                  ? "Vatandaşlık Adımları"
                  : "Citizenship Steps"}
              </h3>
              <div className="space-y-6">
                {["1", "2", "3", "4"].map((step, i) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black font-bold text-sm">
                        {step}
                      </div>
                      {i < 3 && <div className="w-0.5 h-8 bg-gold/20 mt-2" />}
                    </div>
                    <div className="pb-4">
                      <div className="text-white font-semibold text-sm mb-1">
                        {t(`steps.${step}.title` as any)}
                      </div>
                      <div className="text-text-muted text-xs leading-relaxed">
                        {t(`steps.${step}.desc` as any)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
