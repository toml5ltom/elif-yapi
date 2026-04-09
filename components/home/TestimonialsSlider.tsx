"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialsSliderProps {
  locale: string;
  testimonials: Testimonial[];
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1", client_name: "أحمد م.", sort_order: 1, rating: 5, is_active: true, created_at: "",
    client_role_ar: "مستثمر من السعودية", client_role_tr: "Suudi Arabistan'dan yatırımcı", client_role_en: "Investor from Saudi Arabia",
    quote_ar: "تعاملت مع ELIF YAPI لشراء شقة في باشاك شهير وكانت التجربة ممتازة من البداية للنهاية. فريق محترف ومتعاون.",
    quote_tr: "Başakşehir'de daire almak için ELIF YAPI ile çalıştım, baştan sona mükemmel bir deneyimdi.",
    quote_en: "I worked with ELIF YAPI to buy an apartment in Başakşehir and the experience was excellent from start to finish.",
  },
  {
    id: "2", client_name: "محمد ك.", sort_order: 2, rating: 5, is_active: true, created_at: "",
    client_role_ar: "رجل أعمال من العراق", client_role_tr: "Irak'tan işadamı", client_role_en: "Businessman from Iraq",
    quote_ar: "ساعدوني في الحصول على الجنسية التركية خلال 4 أشهر فقط. خدمة استثنائية وشفافية كاملة.",
    quote_tr: "Sadece 4 ayda Türk vatandaşlığı almamda yardımcı oldular. Olağanüstü hizmet ve tam şeffaflık.",
    quote_en: "They helped me obtain Turkish citizenship in just 4 months. Exceptional service and complete transparency.",
  },
  {
    id: "3", client_name: "فاطمة ع.", sort_order: 3, rating: 5, is_active: true, created_at: "",
    client_role_ar: "عميلة من الأردن", client_role_tr: "Ürdün'den müşteri", client_role_en: "Client from Jordan",
    quote_ar: "وجدت الشقة المثالية لعائلتي بفضل فريق ELIF YAPI. يتحدثون العربية وهذا سهّل كل شيء.",
    quote_tr: "ELIF YAPI ekibi sayesinde ailem için ideal daireyi buldum. Arapça konuşmaları her şeyi kolaylaştırdı.",
    quote_en: "I found the perfect apartment for my family thanks to the ELIF YAPI team. Their Arabic fluency made everything easier.",
  },
];

export default function TestimonialsSlider({ locale, testimonials }: TestimonialsSliderProps) {
  const t = useTranslations("testimonials");
  const data = testimonials.length ? testimonials : DEFAULT_TESTIMONIALS;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const isRTL = locale === "ar";

  const next = useCallback(() => setActive((p) => (p + 1) % data.length), [data.length]);
  const prev = useCallback(() => setActive((p) => (p - 1 + data.length) % data.length), [data.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const getQuote = (t: Testimonial) =>
    locale === "ar" ? t.quote_ar : locale === "tr" ? t.quote_tr : t.quote_en;
  const getRole = (t: Testimonial) =>
    locale === "ar" ? t.client_role_ar : locale === "tr" ? t.client_role_tr : t.client_role_en;

  return (
    <section className="py-20 bg-[#0A0A0A]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container-custom">
        <div className="text-center mb-14">
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            {locale === "ar" ? "آراء العملاء" : locale === "tr" ? "Müşteri Görüşleri" : "Client Reviews"}
          </div>
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-white mb-3">{t("title")}</h2>
          <p className="text-text-muted text-sm">{t("subtitle")}</p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cards */}
          <div className="relative h-72">
            {data.map((item, i) => {
              const offset = (i - active + data.length) % data.length;
              const isActive = offset === 0;
              const isNext = offset === 1;
              const isPrev = offset === data.length - 1;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-500 ease-out rounded-2xl border p-8",
                    isActive
                      ? "opacity-100 scale-100 translate-x-0 z-10 bg-surface-card border-gold/20"
                      : isNext
                      ? "opacity-40 scale-95 translate-x-16 z-0 bg-surface-secondary border-[#1F1F1F]"
                      : isPrev
                      ? "opacity-40 scale-95 -translate-x-16 z-0 bg-surface-secondary border-[#1F1F1F]"
                      : "opacity-0 scale-90 z-0"
                  )}
                >
                  {/* Quote icon */}
                  <Quote size={32} className="text-gold/20 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                    {getQuote(item)}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                      {item.client_name[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{item.client_name}</div>
                      <div className="text-text-muted text-xs">{getRole(item)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={isRTL ? next : prev}
              className="w-10 h-10 rounded-full border border-[#1F1F1F] hover:border-gold/40 flex items-center justify-center text-text-muted hover:text-gold transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === active ? "w-6 h-2 bg-gold" : "w-2 h-2 bg-[#1F1F1F] hover:bg-gold/40"
                  )}
                />
              ))}
            </div>

            <button
              onClick={isRTL ? prev : next}
              className="w-10 h-10 rounded-full border border-[#1F1F1F] hover:border-gold/40 flex items-center justify-center text-text-muted hover:text-gold transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
