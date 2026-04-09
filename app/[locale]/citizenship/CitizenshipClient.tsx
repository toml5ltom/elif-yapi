"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Clock, Users, DollarSign, CheckCircle, Calculator, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CitizenshipPageProps {
  locale: string;
}

const STEPS = [
  {
    num: "01",
    ar: { title: "اختر العقار", desc: "ابحث عن عقار بقيمة 400,000 دولار أو أكثر من قائمة عقاراتنا المعتمدة للجنسية" },
    tr: { title: "Mülk Seçin", desc: "Vatandaşlık mülklerimiz arasından 400.000 $ veya üzeri değerinde bir mülk seçin" },
    en: { title: "Choose Property", desc: "Find a property worth $400,000 or more from our citizenship-eligible listings" },
  },
  {
    num: "02",
    ar: { title: "التوقيع والدفع", desc: "توقيع عقد الشراء ودفع المبلغ عبر حساب بنكي تركي موثق" },
    tr: { title: "İmzala ve Öde", desc: "Satış sözleşmesini imzalayın ve onaylı bir Türk banka hesabı üzerinden ödeme yapın" },
    en: { title: "Sign & Pay", desc: "Sign the purchase contract and pay through a verified Turkish bank account" },
  },
  {
    num: "03",
    ar: { title: "الحصول على الطابو", desc: "تسجيل العقار في دائرة الطابو ورفع طلب شهادة الملكية" },
    tr: { title: "Tapu Alın", desc: "Mülkü tapu sicilinde tescil ettirin ve mülkiyet belgesi başvurusunu yapın" },
    en: { title: "Get Title Deed", desc: "Register the property at the land registry and apply for the title deed certificate" },
  },
  {
    num: "04",
    ar: { title: "تقديم طلب الجنسية", desc: "رفع طلب الجنسية لدى مديرية الهجرة مع كافة الأوراق المطلوبة" },
    tr: { title: "Vatandaşlık Başvurusu", desc: "Gerekli tüm belgelerle İl Göç İdaresi'ne vatandaşlık başvurusunu yapın" },
    en: { title: "Apply for Citizenship", desc: "Submit the citizenship application to the Migration Directorate with all required documents" },
  },
  {
    num: "05",
    ar: { title: "استلام الجواز التركي", desc: "استلام قرار الجنسية وجواز السفر التركي لك ولكامل عائلتك خلال 3-6 أشهر" },
    tr: { title: "Türk Pasaportunuzu Alın", desc: "3-6 ay içinde siz ve tüm aileniz için vatandaşlık kararını ve Türk pasaportunuzu alın" },
    en: { title: "Receive Turkish Passport", desc: "Receive the citizenship decision and Turkish passport for you and your entire family within 3-6 months" },
  },
];

const BENEFITS = [
  { ar: "جواز سفر تركي يمنح دخولاً لـ 110+ دولة", tr: "110+ ülkeye girişe izin veren Türk pasaportu", en: "Turkish passport granting access to 110+ countries" },
  { ar: "الإقامة الدائمة في تركيا", tr: "Türkiye'de kalıcı ikamet", en: "Permanent residence in Turkey" },
  { ar: "الجنسية تشمل الزوج/ة والأبناء تحت 18 سنة", tr: "Vatandaşlık eş ve 18 yaş altı çocukları kapsar", en: "Citizenship covers spouse and children under 18" },
  { ar: "لا يشترط الإقامة في تركيا", tr: "Türkiye'de ikamet şartı yok", en: "No residency requirement in Turkey" },
  { ar: "إمكانية التقدم للجنسية الأمريكية (E-2 Visa)", tr: "ABD vatandaşlığı başvurusu imkânı (E-2 Vizesi)", en: "Ability to apply for US citizenship (E-2 Visa)" },
  { ar: "النظام الصحي والتعليمي التركي المتميز", tr: "Türkiye'nin üstün sağlık ve eğitim sistemi", en: "Turkey's excellent healthcare and education system" },
  { ar: "بيئة استثمارية قوية ومتنامية", tr: "Güçlü ve büyüyen yatırım ortamı", en: "Strong and growing investment environment" },
  { ar: "الاحتفاظ بجنسيتك الأصلية", tr: "Mevcut vatandaşlığınızı koruyun", en: "Retain your original citizenship" },
];

function CostCalculator({ locale }: { locale: string }) {
  const [propertyValue, setPropertyValue] = useState(400000);
  const isRTL = locale === "ar";

  const tapu = propertyValue * 0.04;
  const vat = propertyValue * 0.08; // avg
  const lawyer = 3000;
  const translation = 500;
  const total = tapu + vat + lawyer + translation;

  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
      style: "currency", currency: "USD", maximumFractionDigits: 0,
    }).format(n);

  const labels = {
    title: { ar: "حاسبة التكاليف الإجمالية", tr: "Toplam Maliyet Hesaplayıcı", en: "Total Cost Calculator" },
    property: { ar: "قيمة العقار (دولار)", tr: "Mülk Değeri (USD)", en: "Property Value (USD)" },
    tapu: { ar: "رسوم الطابو (4%)", tr: "Tapu Harcı (%4)", en: "Title Deed Fee (4%)" },
    vat: { ar: "ضريبة القيمة المضافة (متوسط 8%)", tr: "KDV (Ortalama %8)", en: "VAT (Average 8%)" },
    lawyer: { ar: "أتعاب المحامي", tr: "Avukat Ücreti", en: "Lawyer Fee" },
    translation: { ar: "رسوم الترجمة والتوثيق", tr: "Tercüme ve Belgeleme", en: "Translation & Documentation" },
    total: { ar: "إجمالي التكاليف المقدرة", tr: "Tahmini Toplam Maliyet", en: "Estimated Total Cost" },
  };

  const l = (key: keyof typeof labels) => labels[key][locale as keyof typeof labels.title] || labels[key].en;

  return (
    <div className="bg-surface-card border border-gold/20 rounded-2xl p-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
          <Calculator size={20} className="text-gold" />
        </div>
        <h3 className="text-white font-bold text-lg">{l("title")}</h3>
      </div>

      {/* Slider */}
      <div className="mb-8">
        <label className="text-text-secondary text-sm mb-3 block">{l("property")}</label>
        <input
          type="range"
          min={400000}
          max={2000000}
          step={50000}
          value={propertyValue}
          onChange={(e) => setPropertyValue(Number(e.target.value))}
          className="w-full h-2 bg-[#1F1F1F] rounded-full appearance-none cursor-pointer accent-gold"
        />
        <div className="text-gold font-bold text-2xl mt-3 price-tag">{fmt(propertyValue)}</div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 mb-6">
        {[
          { label: l("tapu"), value: tapu },
          { label: l("vat"), value: vat },
          { label: l("lawyer"), value: lawyer },
          { label: l("translation"), value: translation },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center py-2 border-b border-[#1F1F1F]">
            <span className="text-text-secondary text-sm">{label}</span>
            <span className="text-white font-medium text-sm price-tag">{fmt(value)}</span>
          </div>
        ))}
      </div>

      <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 flex justify-between items-center">
        <span className="text-gold font-bold">{l("total")}</span>
        <span className="text-gold font-bold text-xl price-tag">{fmt(total)}</span>
      </div>
    </div>
  );
}

export default function CitizenshipPageClient({ locale }: CitizenshipPageProps) {
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const T = {
    ar: {
      hero_title: "الجنسية التركية عبر الاستثمار العقاري",
      hero_sub: "احصل على الجواز التركي لك ولعائلتك باستثمار واحد آمن",
      steps_title: "خطوات الحصول على الجنسية",
      benefits_title: "مميزات الجنسية التركية",
      cta_properties: "تصفح عقارات الجنسية",
      cta_whatsapp: "استشارة مجانية عبر واتساب",
      min_investment: "الحد الأدنى للاستثمار",
      processing: "مدة المعالجة",
      months: "أشهر",
      family: "تشمل الأسرة",
    },
    tr: {
      hero_title: "Gayrimenkul Yatırımıyla Türk Vatandaşlığı",
      hero_sub: "Tek güvenli yatırımla siz ve aileniz için Türk pasaportu alın",
      steps_title: "Vatandaşlık Adımları",
      benefits_title: "Türk Vatandaşlığının Avantajları",
      cta_properties: "Vatandaşlık Mülklerini Gör",
      cta_whatsapp: "WhatsApp'ta Ücretsiz Danışmanlık",
      min_investment: "Minimum Yatırım",
      processing: "İşlem Süresi",
      months: "Ay",
      family: "Aile Dahil",
    },
    en: {
      hero_title: "Turkish Citizenship Through Real Estate Investment",
      hero_sub: "Get a Turkish passport for you and your family with one secure investment",
      steps_title: "Citizenship Steps",
      benefits_title: "Benefits of Turkish Citizenship",
      cta_properties: "Browse Citizenship Properties",
      cta_whatsapp: "Free Consultation on WhatsApp",
      min_investment: "Minimum Investment",
      processing: "Processing Time",
      months: "Months",
      family: "Family Included",
    },
  };

  const tx = T[locale as keyof typeof T] || T.ar;

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-20" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="py-20 bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1400&q=50')] bg-cover bg-center opacity-5" />
        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold mb-6">
            <Award size={14} />
            {locale === "ar" ? "برنامج الجنسية التركية" : locale === "tr" ? "Türk Vatandaşlık Programı" : "Turkish Citizenship Program"}
          </div>
          <h1 className="text-[clamp(28px,5vw,56px)] font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            {tx.hero_title}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">{tx.hero_sub}</p>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mb-10">
            <div className="bg-surface-card border border-gold/20 rounded-2xl p-5">
              <DollarSign size={22} className="text-gold mx-auto mb-2" />
              <div className="text-gold font-bold text-xl">$400K+</div>
              <div className="text-text-muted text-xs">{tx.min_investment}</div>
            </div>
            <div className="bg-surface-card border border-gold/20 rounded-2xl p-5">
              <Clock size={22} className="text-gold mx-auto mb-2" />
              <div className="text-gold font-bold text-xl">3-6</div>
              <div className="text-text-muted text-xs">{tx.months}</div>
            </div>
            <div className="bg-surface-card border border-gold/20 rounded-2xl p-5">
              <Users size={22} className="text-gold mx-auto mb-2" />
              <div className="text-gold font-bold text-xl">👨‍👩‍👧‍👦</div>
              <div className="text-text-muted text-xs">{tx.family}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/properties?citizenship=true`} className="btn-gold px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 justify-center">
              {tx.cta_properties} <ArrowIcon size={16} />
            </Link>
            <a href="https://wa.me/905384995690" target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl font-bold text-sm border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 transition-colors flex items-center gap-2 justify-center">
              {tx.cta_whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* Steps timeline */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-white text-center mb-14">{tx.steps_title}</h2>
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className={cn("absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold/50 to-transparent", isRTL ? "right-6" : "left-6")} />
            <div className="space-y-8">
              {STEPS.map((step, i) => {
                const s = step[locale as keyof typeof step] as { title: string; desc: string } || step.en;
                return (
                  <div key={i} className={cn("flex gap-6 items-start", isRTL && "flex-row-reverse")}>
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-black font-bold text-sm shrink-0 relative z-10">
                      {step.num}
                    </div>
                    <div className="bg-surface-card border border-[#1F1F1F] rounded-2xl p-6 flex-1 hover:border-gold/20 transition-colors">
                      <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits + Calculator */}
      <section className="py-20 bg-[#080808]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h2 className="text-[clamp(22px,3.5vw,36px)] font-bold text-white mb-8">{tx.benefits_title}</h2>
              <div className="space-y-4">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm leading-relaxed">
                      {b[locale as keyof typeof b] || b.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Calculator */}
            <CostCalculator locale={locale} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom text-center">
          <div className="bg-surface-card border border-gold/20 rounded-3xl p-12 max-w-2xl mx-auto">
            <h2 className="text-[clamp(22px,4vw,36px)] font-bold text-white mb-4">
              {locale === "ar" ? "ابدأ رحلتك نحو الجنسية التركية" : locale === "tr" ? "Türk Vatandaşlığı Yolculuğunuza Başlayın" : "Start Your Turkish Citizenship Journey"}
            </h2>
            <p className="text-text-muted text-sm mb-8">
              {locale === "ar" ? "فريقنا جاهز لمساعدتك في كل خطوة" : locale === "tr" ? "Ekibimiz her adımda size yardımcı olmaya hazır" : "Our team is ready to assist you at every step"}
            </p>
            <a href="https://tally.so/r/EkJqA2" target="_blank" rel="noopener noreferrer"
              className="btn-gold px-10 py-4 rounded-xl font-bold text-sm inline-flex items-center gap-2">
              {locale === "ar" ? "احجز استشارة مجانية" : locale === "tr" ? "Ücretsiz Danışmanlık Alın" : "Book Free Consultation"}
              <ArrowIcon size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
