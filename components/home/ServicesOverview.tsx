import { useTranslations } from "next-intl";
import { Building2, Search, Key, MessageSquare, Award, Settings } from "lucide-react";

interface ServicesOverviewProps {
  locale: string;
}

const ICONS = [Building2, Search, Key, MessageSquare, Award, Settings];

const SERVICE_KEYS = ["sales", "purchase", "rental", "consulting", "citizenship", "management"] as const;

export default function ServicesOverview({ locale }: ServicesOverviewProps) {
  const t = useTranslations("services");
  const isRTL = locale === "ar";

  return (
    <section className="py-20 bg-[#080808]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container-custom">
        <div className="text-center mb-14">
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            {locale === "ar" ? "ما نقدمه" : locale === "tr" ? "Sunduklarımız" : "What We Offer"}
          </div>
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-white mb-3">{t("title")}</h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_KEYS.map((key, i) => {
            const Icon = ICONS[i];
            const isGold = key === "citizenship";
            return (
              <div
                key={key}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group ${
                  isGold
                    ? "bg-gold/5 border-gold/20 hover:border-gold/40"
                    : "bg-surface-card border-[#1F1F1F] hover:border-gold/20"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isGold ? "bg-gold/20" : "bg-[#1A1A1A] group-hover:bg-gold/10"
                  }`}
                >
                  <Icon size={22} className={isGold ? "text-gold" : "text-text-secondary group-hover:text-gold transition-colors"} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {t(`list.${key}.title` as any)}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t(`list.${key}.desc` as any)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
