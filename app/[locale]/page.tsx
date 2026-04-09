import { getFeaturedProperties, getDistricts, getTestimonials, getStats } from "@/lib/api";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ServicesOverview from "@/components/home/ServicesOverview";
import CitizenshipBanner from "@/components/home/CitizenshipBanner";
import StatsCounter from "@/components/home/StatsCounter";
import DistrictsGrid from "@/components/home/DistrictsGrid";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import ContactCTA from "@/components/home/ContactCTA";

export const revalidate = 3600; // ISR: 1 hour

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const [properties, districts, testimonials, stats] = await Promise.allSettled([
    getFeaturedProperties(6),
    getDistricts(),
    getTestimonials(),
    getStats(),
  ]);

  return (
    <>
      <HeroSection locale={locale} />
      <FeaturedProperties
        locale={locale}
        properties={properties.status === "fulfilled" ? properties.value : []}
      />
      <ServicesOverview locale={locale} />
      <CitizenshipBanner locale={locale} />
      <StatsCounter
        locale={locale}
        stats={stats.status === "fulfilled" ? stats.value : undefined}
      />
      <DistrictsGrid
        locale={locale}
        districts={districts.status === "fulfilled" ? districts.value : []}
      />
      <TestimonialsSlider
        locale={locale}
        testimonials={testimonials.status === "fulfilled" ? testimonials.value : []}
      />
      <ContactCTA locale={locale} />
    </>
  );
}
