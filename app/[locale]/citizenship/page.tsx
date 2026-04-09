import CitizenshipClient from "./CitizenshipClient";
import type { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const titles = { ar: "الجنسية التركية عبر العقار", tr: "Gayrimenkul ile Türk Vatandaşlığı", en: "Turkish Citizenship via Real Estate" };
  return { title: titles[locale as keyof typeof titles] || titles.ar };
}

export default function CitizenshipPage({ params: { locale } }: { params: { locale: string } }) {
  return <CitizenshipClient locale={locale} />;
}
