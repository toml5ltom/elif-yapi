"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface StatsCounterProps {
  locale: string;
  stats?: Array<{
    value: number;
    suffix: string;
    label_ar: string;
    label_tr: string;
    label_en: string;
  }>;
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({ value, suffix, label, delay }: StatItem & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "text-center transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-[clamp(36px,5vw,56px)] font-bold text-gold-gradient leading-none mb-2 price-tag">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-text-secondary text-sm font-medium">{label}</div>
    </div>
  );
}

const DEFAULT_STATS = [
  { value: 500, suffix: "+", label_ar: "عقار تم التعامل معه", label_tr: "İşlem Yapılan Emlak", label_en: "Properties Handled" },
  { value: 7, suffix: "+", label_ar: "سنوات من الخبرة", label_tr: "Yıllık Deneyim", label_en: "Years of Experience" },
  { value: 1000, suffix: "+", label_ar: "عميل سعيد", label_tr: "Mutlu Müşteri", label_en: "Happy Clients" },
  { value: 50, suffix: "+", label_ar: "منطقة نغطيها", label_tr: "Kapsanan Bölge", label_en: "Districts Covered" },
];

export default function StatsCounter({ locale, stats }: StatsCounterProps) {
  const data = stats || DEFAULT_STATS;
  const isRTL = locale === "ar";

  return (
    <section className="py-20 bg-[#080808] relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Gold glow bg */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/3 to-transparent" />

      <div className="container-custom relative">
        <div className="gold-line mb-12 max-w-xs mx-auto" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {data.map((stat, i) => (
            <StatCard
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={
                locale === "ar"
                  ? stat.label_ar
                  : locale === "tr"
                  ? stat.label_tr
                  : stat.label_en
              }
              delay={i * 100}
            />
          ))}
        </div>

        <div className="gold-line mt-12 max-w-xs mx-auto" />
      </div>
    </section>
  );
}
