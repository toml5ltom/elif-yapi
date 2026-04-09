"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "905384995690";

interface WhatsAppButtonProps {
  locale: string;
  propertyTitle?: string;
  propertySlug?: string;
}

export default function WhatsAppButton({
  locale,
  propertyTitle,
  propertySlug,
}: WhatsAppButtonProps) {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(true);
  const [tooltip, setTooltip] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current <= lastScroll || current < 100);
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const getWhatsAppMessage = () => {
    if (propertyTitle && propertySlug) {
      const messages: Record<string, string> = {
        ar: `مرحباً، أود الاستفسار عن هذا العقار: ${propertyTitle}\nhttps://elifyapi.com/${locale}/properties/${propertySlug}`,
        tr: `Merhaba, şu mülk hakkında bilgi almak istiyorum: ${propertyTitle}\nhttps://elifyapi.com/${locale}/properties/${propertySlug}`,
        en: `Hello, I'd like to inquire about: ${propertyTitle}\nhttps://elifyapi.com/${locale}/properties/${propertySlug}`,
      };
      return messages[locale] || messages.ar;
    }

    const general: Record<string, string> = {
      ar: "مرحباً، أود الاستفسار عن عقارات إليف يابي",
      tr: "Merhaba, ELIF YAPI gayrimenkulleri hakkında bilgi almak istiyorum",
      en: "Hello, I'd like to inquire about ELIF YAPI properties",
    };
    return general[locale] || general.ar;
  };

  const isRTL = locale === "ar";

  return (
    <div
      className={cn(
        "fixed bottom-6 z-50 transition-all duration-300",
        isRTL ? "left-6" : "right-6",
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      {/* Tooltip */}
      {tooltip && (
        <div
          className={cn(
            "absolute bottom-16 bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-2 text-sm text-white whitespace-nowrap shadow-2xl",
            isRTL ? "left-0" : "right-0"
          )}
        >
          {locale === "ar"
            ? "تحدث معنا على واتساب"
            : locale === "tr"
            ? "WhatsApp'ta konuşun"
            : "Chat with us on WhatsApp"}
          <div
            className={cn(
              "absolute bottom-0 translate-y-1/2 w-2 h-2 bg-[#111] border-b border-r border-[#1F1F1F] rotate-45",
              isRTL ? "left-4" : "right-4"
            )}
          />
        </div>
      )}

      {/* Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          getWhatsAppMessage()
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300"
        aria-label="WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle size={26} className="text-white" fill="white" />
      </a>
    </div>
  );
}
