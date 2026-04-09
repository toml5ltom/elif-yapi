"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkingHoursProps { locale: string }

const SCHEDULE = [
  { dayAr: "الاثنين", dayTr: "Pazartesi", dayEn: "Monday", open: "09:00", close: "18:00" },
  { dayAr: "الثلاثاء", dayTr: "Salı", dayEn: "Tuesday", open: "09:00", close: "18:00" },
  { dayAr: "الأربعاء", dayTr: "Çarşamba", dayEn: "Wednesday", open: "09:00", close: "18:00" },
  { dayAr: "الخميس", dayTr: "Perşembe", dayEn: "Thursday", open: "09:00", close: "18:00" },
  { dayAr: "الجمعة", dayTr: "Cuma", dayEn: "Friday", open: "09:00", close: "18:00" },
  { dayAr: "السبت", dayTr: "Cumartesi", dayEn: "Saturday", open: "10:00", close: "15:00" },
  { dayAr: "الأحد", dayTr: "Pazar", dayEn: "Sunday", open: null, close: null },
];

function isOpenNow(): { open: boolean; todayIdx: number } {
  const now = new Date();
  // Istanbul is UTC+3
  const istanbul = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
  const dayIdx = (istanbul.getDay() + 6) % 7; // Mon=0
  const hours = istanbul.getHours();
  const minutes = istanbul.getMinutes();
  const total = hours * 60 + minutes;

  const day = SCHEDULE[dayIdx];
  if (!day.open) return { open: false, todayIdx: dayIdx };
  const [oh, om] = day.open.split(":").map(Number);
  const [ch, cm] = day.close!.split(":").map(Number);
  return { open: total >= oh * 60 + om && total < ch * 60 + cm, todayIdx: dayIdx };
}

export default function WorkingHours({ locale }: WorkingHoursProps) {
  const { open, todayIdx } = isOpenNow();
  const isRTL = locale === "ar";
  const t = (ar: string, tr: string, en: string) =>
    locale === "ar" ? ar : locale === "tr" ? tr : en;

  const getDay = (d: typeof SCHEDULE[0]) =>
    locale === "ar" ? d.dayAr : locale === "tr" ? d.dayTr : d.dayEn;

  return (
    <div className="bg-surface-card border border-[#1F1F1F] rounded-2xl p-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
            <Clock size={18} className="text-gold" />
          </div>
          <h3 className="text-white font-semibold">
            {t("ساعات العمل", "Çalışma Saatleri", "Working Hours")}
          </h3>
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
          open ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full", open ? "bg-green-400 animate-pulse" : "bg-red-400")} />
          {open ? t("مفتوح الآن", "Şu an açık", "Open Now") : t("مغلق الآن", "Şu an kapalı", "Closed Now")}
        </div>
      </div>

      <div className="space-y-2">
        {SCHEDULE.map((day, i) => (
          <div
            key={i}
            className={cn(
              "flex justify-between items-center py-2 px-3 rounded-lg text-sm",
              i === todayIdx ? "bg-gold/5 border border-gold/15" : ""
            )}
          >
            <span className={cn(i === todayIdx ? "text-gold font-medium" : "text-text-secondary")}>
              {getDay(day)}
              {i === todayIdx && (
                <span className="ms-2 text-xs text-gold/60">
                  {t("اليوم", "Bugün", "Today")}
                </span>
              )}
            </span>
            <span className={cn("font-medium", i === todayIdx ? "text-gold" : day.open ? "text-text-secondary" : "text-red-400/70")}>
              {day.open ? `${day.open} – ${day.close}` : t("مغلق", "Kapalı", "Closed")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
