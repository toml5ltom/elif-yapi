"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Instagram, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const WORKING_HOURS = {
  monday: { open: "09:00", close: "18:00" },
  tuesday: { open: "09:00", close: "18:00" },
  wednesday: { open: "09:00", close: "18:00" },
  thursday: { open: "09:00", close: "18:00" },
  friday: { open: "09:00", close: "18:00" },
  saturday: { open: "10:00", close: "15:00" },
  sunday: null,
};

const DAY_NAMES = {
  ar: { monday: "الاثنين", tuesday: "الثلاثاء", wednesday: "الأربعاء", thursday: "الخميس", friday: "الجمعة", saturday: "السبت", sunday: "الأحد" },
  tr: { monday: "Pazartesi", tuesday: "Salı", wednesday: "Çarşamba", thursday: "Perşembe", friday: "Cuma", saturday: "Cumartesi", sunday: "Pazar" },
  en: { monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday" },
};

function isOpenNow() {
  const now = new Date(new Intl.DateTimeFormat("en", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", weekday: "long", hour12: false }).format(Date.now()).split(", ").reverse().join(" "));
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const day = days[now.getDay()] as keyof typeof WORKING_HOURS;
  const hours = WORKING_HOURS[day];
  if (!hours) return false;
  const [oh, om] = hours.open.split(":").map(Number);
  const [ch, cm] = hours.close.split(":").map(Number);
  const current = now.getHours() * 60 + now.getMinutes();
  return current >= oh * 60 + om && current < ch * 60 + cm;
}

export default function ContactPage({ locale }: { locale: string }) {
  const isRTL = locale === "ar";
  const [copied, setCopied] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(isOpenNow()); }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const T = {
    ar: { title: "تواصل معنا", sub: "نحن هنا للإجابة على جميع استفساراتك", whatsapp: "واتساب", whatsapp_desc: "الأسرع — تحدث معنا مباشرة", email_desc: "نرد خلال 24 ساعة", visit: "زورنا", visit_desc: "مكتبنا في باشاك شهير", hours: "ساعات العمل", closed: "مغلق", open_now: "مفتوح الآن", form_title: "أرسل لنا عبر تالي", copy: "نسخ", copied: "تم النسخ!" },
    tr: { title: "İletişime Geçin", sub: "Tüm sorularınızı yanıtlamak için buradayız", whatsapp: "WhatsApp", whatsapp_desc: "En hızlısı — doğrudan bize ulaşın", email_desc: "24 saat içinde yanıt veriyoruz", visit: "Bizi Ziyaret Edin", visit_desc: "Ofisimiz Başakşehir'de", hours: "Çalışma Saatleri", closed: "Kapalı", open_now: "Şu an açık", form_title: "Tally ile Bize Yazın", copy: "Kopyala", copied: "Kopyalandı!" },
    en: { title: "Contact Us", sub: "We are here to answer all your inquiries", whatsapp: "WhatsApp", whatsapp_desc: "Fastest — talk to us directly", email_desc: "We reply within 24 hours", visit: "Visit Us", visit_desc: "Our office in Başakşehir", hours: "Working Hours", closed: "Closed", open_now: "Open Now", form_title: "Send Us a Message via Tally", copy: "Copy", copied: "Copied!" },
  };
  const tx = T[locale as keyof typeof T] || T.ar;
  const dayNames = DAY_NAMES[locale as keyof typeof DAY_NAMES] || DAY_NAMES.en;

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-20" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-[#080808] border-b border-[#1F1F1F] py-16">
        <div className="container-custom text-center">
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            {locale === "ar" ? "نحن هنا من أجلك" : locale === "tr" ? "Sizin İçin Buradayız" : "We're Here For You"}
          </div>
          <h1 className="text-[clamp(28px,5vw,52px)] font-bold text-white mb-4">{tx.title}</h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">{tx.sub}</p>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* 3 Method cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {/* WhatsApp */}
          <a href="https://wa.me/905384995690" target="_blank" rel="noopener noreferrer"
            className="bg-surface-card border border-[#1F1F1F] hover:border-[#25D366]/30 rounded-2xl p-8 text-center transition-all hover:-translate-y-1 group">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/20 transition-colors">
              <MessageSquare size={26} className="text-[#25D366]" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{tx.whatsapp}</h3>
            <p className="text-text-muted text-sm mb-4">{tx.whatsapp_desc}</p>
            <span className="text-[#25D366] font-mono text-sm">+90 538 499 5690</span>
          </a>

          {/* Email */}
          <div
            className="bg-surface-card border border-[#1F1F1F] hover:border-gold/20 rounded-2xl p-8 text-center transition-all hover:-translate-y-1 cursor-pointer group"
            onClick={() => copyToClipboard("elifyapigayrimenkul23@gmail.com", "email")}
          >
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
              <Mail size={26} className="text-gold" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Email</h3>
            <p className="text-text-muted text-sm mb-4">{tx.email_desc}</p>
            <div className="flex items-center justify-center gap-2 text-gold text-xs font-mono">
              <span className="truncate">elifyapigayrimenkul23@gmail.com</span>
              {copied === "email" ? <Check size={14} className="text-green-400 shrink-0" /> : <Copy size={14} className="shrink-0" />}
            </div>
          </div>

          {/* Visit */}
          <div className="bg-surface-card border border-[#1F1F1F] hover:border-gold/20 rounded-2xl p-8 text-center transition-all hover:-translate-y-1 group">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
              <MapPin size={26} className="text-gold" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{tx.visit}</h3>
            <p className="text-text-muted text-sm mb-4">{tx.visit_desc}</p>
            <span className="text-text-secondary text-xs leading-relaxed">
              Parkmavera 1, A5 Blok 15DO{"\n"}Başakşehir, İstanbul
            </span>
          </div>
        </div>

        {/* Tally form + Working hours */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Tally embed */}
          <div className="lg:col-span-2">
            <h2 className="text-white font-bold text-2xl mb-6">{tx.form_title}</h2>
            <div className="bg-surface-card border border-[#1F1F1F] rounded-2xl overflow-hidden">
              <iframe
                src="https://tally.so/embed/EkJqA2?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="500"
                style={{ background: "transparent" }}
                title="Contact Form"
              />
            </div>
          </div>

          {/* Working hours + contact info */}
          <div className="space-y-6">
            {/* Status */}
            <div className={cn("flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium", isOpen ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400")}>
              <span className={cn("w-2 h-2 rounded-full", isOpen ? "bg-green-400 animate-pulse" : "bg-red-400")} />
              {isOpen ? tx.open_now : tx.closed}
            </div>

            {/* Hours table */}
            <div className="bg-surface-card border border-[#1F1F1F] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock size={16} className="text-gold" />
                <h3 className="text-white font-semibold">{tx.hours}</h3>
              </div>
              <div className="space-y-2">
                {(Object.keys(WORKING_HOURS) as Array<keyof typeof WORKING_HOURS>).map((day) => {
                  const hours = WORKING_HOURS[day];
                  return (
                    <div key={day} className="flex justify-between items-center py-1.5 border-b border-[#1F1F1F] last:border-0 text-sm">
                      <span className="text-text-secondary">{dayNames[day]}</span>
                      <span className={hours ? "text-white" : "text-text-muted"}>
                        {hours ? `${hours.open} – ${hours.close}` : tx.closed}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instagram */}
            <a href="https://www.instagram.com/elifyapi.gayrimenkul" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-surface-card border border-[#1F1F1F] rounded-2xl p-5 hover:border-gold/20 transition-colors">
              <Instagram size={22} className="text-gold" />
              <div>
                <div className="text-white text-sm font-medium">Instagram</div>
                <div className="text-text-muted text-xs">@elifyapi.gayrimenkul</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
