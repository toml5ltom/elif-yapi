import Link from "next/link";
import { useTranslations } from "next-intl";
import { Phone, Mail, MessageSquare } from "lucide-react";

export default function ContactCTA({ locale }: { locale: string }) {
  const isRTL = locale === "ar";

  const title = { ar: "هل أنت مستعد للاستثمار؟", tr: "Yatırıma Hazır mısınız?", en: "Ready to Invest?" };
  const sub = { ar: "تواصل معنا اليوم ودعنا نساعدك في إيجاد العقار المثالي", tr: "Bugün bizimle iletişime geçin, ideal mülkü bulmana yardımcı olalım", en: "Contact us today and let us help you find the perfect property" };

  return (
    <section className="py-20 bg-[#0A0A0A] relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute inset-0 bg-gold-gradient opacity-3" />
      <div className="container-custom relative">
        <div className="bg-surface-card border border-gold/20 rounded-3xl p-10 lg:p-16 text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
            <MessageSquare size={28} className="text-gold" />
          </div>
          <h2 className="text-[clamp(22px,4vw,40px)] font-bold text-white mb-4">
            {title[locale as keyof typeof title] || title.ar}
          </h2>
          <p className="text-text-muted text-sm mb-10 max-w-lg mx-auto leading-relaxed">
            {sub[locale as keyof typeof sub] || sub.ar}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/905384995690"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Phone size={16} />
              WhatsApp
            </a>
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-3.5 rounded-xl font-bold text-sm border border-[#1F1F1F] text-text-secondary hover:text-white hover:border-gold/30 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Mail size={16} />
              {locale === "ar" ? "تواصل عبر النموذج" : locale === "tr" ? "Form ile İletişim" : "Contact via Form"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
