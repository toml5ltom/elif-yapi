import { supabase } from "./supabase/client";
import type {
  Property,
  PropertyFilters,
  District,
  Testimonial,
  SiteStat,
  Inquiry,
} from "@/types";

// ==================== PROPERTIES ====================
export async function getProperties(filters: PropertyFilters = {}) {
  let query = supabase
    .from("properties")
    .select(`*, district:districts(*)`)
    .eq("status", "available")
    .not("published_at", "is", null);

  if (filters.type) query = query.eq("type", filters.type);
  if (filters.category) query = query.eq("category", filters.category);
  if (filters.district)
    query = query.eq("district_id", filters.district);
  if (filters.priceMin) query = query.gte("price", filters.priceMin);
  if (filters.priceMax) query = query.lte("price", filters.priceMax);
  if (filters.roomsMin) query = query.gte("rooms", filters.roomsMin);
  if (filters.featured) query = query.eq("is_featured", true);
  if (filters.citizenship) query = query.eq("is_citizenship_eligible", true);

  // Sorting
  switch (filters.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "featured":
      query = query.order("is_featured", { ascending: false });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
  }

  // Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw error;
  return { properties: (data as Property[]) || [], count: count || 0 };
}

export async function getPropertyBySlug(slug: string) {
  const { data, error } = await supabase
    .from("properties")
    .select(`*, district:districts(*)`)
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Property;
}

export async function getFeaturedProperties(limit = 6) {
  const { data, error } = await supabase
    .from("properties")
    .select(`*, district:districts(*)`)
    .eq("is_featured", true)
    .eq("status", "available")
    .not("published_at", "is", null)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data as Property[]) || [];
}

export async function getCitizenshipProperties(limit = 6) {
  const { data, error } = await supabase
    .from("properties")
    .select(`*, district:districts(*)`)
    .eq("is_citizenship_eligible", true)
    .eq("status", "available")
    .not("published_at", "is", null)
    .order("price", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data as Property[]) || [];
}

export async function getSimilarProperties(
  property: Property,
  limit = 3
) {
  const { data, error } = await supabase
    .from("properties")
    .select(`*, district:districts(*)`)
    .eq("category", property.category)
    .eq("status", "available")
    .neq("id", property.id)
    .not("published_at", "is", null)
    .limit(limit);

  if (error) return [];
  return (data as Property[]) || [];
}

// ==================== DISTRICTS ====================
export async function getDistricts() {
  const { data, error } = await supabase
    .from("districts")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) return [];
  return (data as District[]) || [];
}

// ==================== TESTIMONIALS ====================
export async function getTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) return [];
  return (data as Testimonial[]) || [];
}

// ==================== STATS ====================
export async function getStats() {
  const { data, error } = await supabase
    .from("site_stats")
    .select("*")
    .order("sort_order");

  if (error) return [];
  return (data as SiteStat[]) || [];
}

// ==================== SETTINGS ====================
export async function getSettings(key: string) {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error) return null;
  return data?.value;
}

// ==================== INQUIRIES ====================
export async function submitInquiry(inquiry: Omit<Inquiry, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("inquiries")
    .insert([{ ...inquiry, status: "new" }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ==================== UTILITY ====================
export function formatPrice(
  price: number,
  currency: string = "USD",
  locale: string = "en"
): string {
  const formatter = new Intl.NumberFormat(
    locale === "ar" ? "ar-SA" : locale === "tr" ? "tr-TR" : "en-US",
    {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }
  );
  return formatter.format(price);
}

export function getLocalizedField<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  locale: string
): string {
  const localeField = `${field}_${locale}` as keyof T;
  const arField = `${field}_ar` as keyof T;
  return (obj[localeField] || obj[arField] || "") as string;
}

export function buildWhatsAppUrl(
  phone: string,
  message: string,
  locale: string = "ar"
): string {
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMsg}`;
}

export function buildPropertyWhatsAppMessage(
  property: Property,
  locale: string
): string {
  const title =
    locale === "ar"
      ? property.title_ar
      : locale === "tr"
      ? property.title_tr
      : property.title_en;

  const messages: Record<string, string> = {
    ar: `مرحباً، أود الاستفسار عن العقار: ${title}\nالسعر: ${formatPrice(property.price, property.currency, locale)}\nالرابط: https://elifyapi.com/ar/properties/${property.slug}`,
    tr: `Merhaba, şu emlak hakkında bilgi almak istiyorum: ${title}\nFiyat: ${formatPrice(property.price, property.currency, locale)}\nBağlantı: https://elifyapi.com/tr/properties/${property.slug}`,
    en: `Hello, I'd like to inquire about this property: ${title}\nPrice: ${formatPrice(property.price, property.currency, locale)}\nLink: https://elifyapi.com/en/properties/${property.slug}`,
  };
  return messages[locale] || messages.ar;
}
