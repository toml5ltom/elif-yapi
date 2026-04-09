import ContactPage from "@/components/contact/ContactPage";
import type { Metadata } from "next";
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = { ar: "تواصل معنا", tr: "İletişim", en: "Contact Us" };
  return { title: t[locale as keyof typeof t] || t.ar };
}
export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <ContactPage locale={locale} />;
}
