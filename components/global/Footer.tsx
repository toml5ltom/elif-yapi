import Link from "next/link";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tProp = useTranslations("property");
  const isRTL = locale === "ar";

  const quickLinks = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/properties`, label: tNav("properties") },
    { href: `/${locale}/citizenship`, label: tNav("citizenship") },
    { href: `/${locale}/services`, label: tNav("services") },
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  const propertyTypes = [
    { href: `/${locale}/properties?category=apartment`, label: tProp("categories.apartment") },
    { href: `/${locale}/properties?category=villa`, label: tProp("categories.villa") },
    { href: `/${locale}/properties?category=shop`, label: tProp("categories.shop") },
    { href: `/${locale}/properties?category=office`, label: tProp("categories.office") },
    { href: `/${locale}/properties?category=land`, label: tProp("categories.land") },
    { href: `/${locale}/properties?citizenship=true`, label: tProp("categories.citizenship") },
  ];

  return (
    <footer
      className="bg-[#080808] border-t border-[#1F1F1F] pt-16 pb-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center">
                <span className="text-black font-bold text-xl font-serif">E</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">ELIF YAPI</div>
                <div className="text-gold text-[10px] tracking-widest">GAYRİMENKUL</div>
              </div>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              {t("slogan")}
            </p>
            {/* Social */}
            <a
              href="https://www.instagram.com/elifyapi.gayrimenkul"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors text-sm"
            >
              <Instagram size={18} />
              @elifyapi.gayrimenkul
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              {t("links")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property types */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              {t("property_types")}
            </h3>
            <ul className="space-y-2.5">
              {propertyTypes.map((type) => (
                <li key={type.href}>
                  <Link
                    href={type.href}
                    className="text-text-muted hover:text-gold transition-colors text-sm"
                  >
                    {type.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/905384995690"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-text-muted hover:text-gold transition-colors text-sm"
                >
                  <Phone size={15} className="shrink-0 mt-0.5 text-gold" />
                  +90 538 499 5690
                </a>
              </li>
              <li>
                <a
                  href="mailto:elifyapigayrimenkul23@gmail.com"
                  className="flex items-start gap-3 text-text-muted hover:text-gold transition-colors text-sm break-all"
                >
                  <Mail size={15} className="shrink-0 mt-0.5 text-gold" />
                  elifyapigayrimenkul23@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-text-muted text-sm">
                  <MapPin size={15} className="shrink-0 mt-0.5 text-gold" />
                  <span className="leading-relaxed">
                    {locale === "ar"
                      ? "بارك مافيرا 1، A5 بلوك 15DO، باشاك شهير، إسطنبول"
                      : "Parkmavera 1, A5 Blok 15DO, Başakşehir, İstanbul"}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Gold divider */}
        <div className="gold-line mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-text-muted text-xs">
          <span>
            © {new Date().getFullYear()} ELIF YAPI GAYRİMENKUL — {t("rights")}
          </span>
          <span>
            {locale === "ar"
              ? "صُنع بـ ❤ في إسطنبول"
              : locale === "tr"
              ? "İstanbul'da ❤ ile yapıldı"
              : "Made with ❤ in Istanbul"}
          </span>
        </div>
      </div>
    </footer>
  );
}
