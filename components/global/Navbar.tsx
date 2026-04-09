"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = locale === "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/properties`, label: t("properties") },
    { href: `/${locale}/citizenship`, label: t("citizenship") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled
            ? "h-16 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1F1F1F]"
            : "h-[72px] bg-transparent"
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container-custom h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center">
              <span className="text-black font-bold text-xl font-serif">E</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight tracking-wide">
                ELIF YAPI
              </div>
              <div className="text-gold text-[10px] tracking-widest uppercase">
                GAYRİMENKUL
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group",
                    isActive(link.href)
                      ? "text-gold nav-link-active"
                      : "text-text-secondary hover:text-white"
                  )}
                >
                  {link.label}
                  {!isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-4/5 rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: Language + WhatsApp CTA */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <a
              href={`https://wa.me/905384995690?text=${encodeURIComponent(
                locale === "ar"
                  ? "مرحباً، أود الاستفسار عن عقار"
                  : locale === "tr"
                  ? "Merhaba, bir mülk hakkında bilgi almak istiyorum"
                  : "Hello, I'd like to inquire about a property"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 btn-gold px-4 py-2 rounded-lg text-sm font-bold"
            >
              <Phone size={14} />
              WhatsApp
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white hover:text-gold transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            "absolute top-0 bottom-0 w-72 bg-[#0A0A0A] border-r border-[#1F1F1F] flex flex-col transition-transform duration-300",
            isRTL ? "right-0 border-l border-r-0" : "left-0",
            mobileOpen
              ? "translate-x-0"
              : isRTL
              ? "translate-x-full"
              : "-translate-x-full"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#1F1F1F]">
            <Link
              href={`/${locale}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center">
                <span className="text-black font-bold text-lg font-serif">E</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">ELIF YAPI</div>
                <div className="text-gold text-[10px] tracking-widest">GAYRİMENKUL</div>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-text-muted hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive(link.href)
                        ? "bg-gold/10 text-gold border border-gold/20"
                        : "text-text-secondary hover:bg-surface-secondary hover:text-white"
                    )}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom CTA */}
          <div className="p-4 border-t border-[#1F1F1F]">
            <a
              href="https://wa.me/905384995690"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 btn-gold w-full py-3 rounded-xl text-sm font-bold"
            >
              <Phone size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
