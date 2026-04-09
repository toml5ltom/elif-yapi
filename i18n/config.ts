import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["ar", "tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";
export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  tr: "Türkçe",
  en: "English",
};
export const localeDir: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  tr: "ltr",
  en: "ltr",
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locales.includes(locale as Locale)) notFound();
  return {
    locale: locale as Locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});