import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, localeDir } from "@/i18n/config";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import WhatsAppButton from "@/components/global/WhatsAppButton";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const titles: Record<string, string> = {
    ar: "إليف يابي غايريمنكول — عقارات فاخرة في إسطنبول",
    tr: "ELIF YAPI GAYRİMENKUL — İstanbul'da Lüks Gayrimenkul",
    en: "ELIF YAPI GAYRİMENKUL — Luxury Real Estate in Istanbul",
  };
  const descs: Record<string, string> = {
    ar: "استثمار متين لمستقبلك. شقق، فلل، مكاتب، وجنسية تركية في إسطنبول.",
    tr: "Geleceğine Sağlam Yatırım. İstanbul'da daireler, villalar, ofisler ve Türk vatandaşlığı.",
    en: "A Solid Investment for Your Future. Apartments, villas, offices, and Turkish citizenship in Istanbul.",
  };
  return {
    title: { default: titles[locale] || titles.ar, template: `%s | ELIF YAPI` },
    description: descs[locale] || descs.ar,
    alternates: {
      canonical: `https://elifyapi.com/${locale}`,
      languages: { ar: "/ar", tr: "/tr", en: "/en" },
    },
    openGraph: {
      title: titles[locale],
      description: descs[locale],
      url: `https://elifyapi.com/${locale}`,
      siteName: "ELIF YAPI GAYRİMENKUL",
      locale: locale === "ar" ? "ar_SA" : locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();
  const dir = localeDir[locale as keyof typeof localeDir] || "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
          <WhatsAppButton locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
