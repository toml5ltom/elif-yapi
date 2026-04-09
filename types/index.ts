// types/property.ts
export type PropertyType = "sale" | "rent";
export type PropertyCategory = "apartment" | "villa" | "shop" | "office" | "land" | "citizenship";
export type PropertyStatus = "available" | "sold" | "rented" | "reserved" | "draft";
export type Currency = "USD" | "TRY" | "EUR";
export type PricePeriod = "total" | "monthly" | "yearly";

export interface PropertyImage {
  url: string;
  alt?: string;
  order: number;
}

export interface Property {
  id: string;
  title_ar: string;
  title_tr: string;
  title_en: string;
  description_ar?: string;
  description_tr?: string;
  description_en?: string;
  slug: string;
  type: PropertyType;
  category: PropertyCategory;
  status: PropertyStatus;
  price: number;
  currency: Currency;
  price_period?: PricePeriod;
  area_sqm: number;
  rooms?: number;
  bathrooms?: number;
  floor_number?: number;
  total_floors?: number;
  year_built?: number;
  district_id?: string;
  district?: District;
  address_ar?: string;
  address_tr?: string;
  address_en?: string;
  latitude?: number;
  longitude?: number;
  features_ar: string[];
  features_tr: string[];
  features_en: string[];
  images: PropertyImage[];
  thumbnail?: string;
  is_featured: boolean;
  is_citizenship_eligible: boolean;
  meta_title_ar?: string;
  meta_title_tr?: string;
  meta_title_en?: string;
  meta_description_ar?: string;
  meta_description_tr?: string;
  meta_description_en?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface PropertyFilters {
  type?: PropertyType;
  category?: PropertyCategory;
  district?: string;
  priceMin?: number;
  priceMax?: number;
  roomsMin?: number;
  sort?: "price_asc" | "price_desc" | "newest" | "featured";
  page?: number;
  limit?: number;
  featured?: boolean;
  citizenship?: boolean;
  search?: string;
}

export interface District {
  id: string;
  name_ar: string;
  name_tr: string;
  name_en: string;
  slug: string;
  description_ar?: string;
  description_tr?: string;
  description_en?: string;
  city: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  sort_order: number;
  is_active: boolean;
  property_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id?: string;
  property_id?: string;
  name: string;
  email?: string;
  phone: string;
  country?: string;
  message?: string;
  source: "website" | "whatsapp" | "tally" | "instagram" | "phone";
  preferred_language: "ar" | "tr" | "en";
  status?: "new" | "contacted" | "in_progress" | "converted" | "closed" | "spam";
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role_ar?: string;
  client_role_tr?: string;
  client_role_en?: string;
  quote_ar: string;
  quote_tr: string;
  quote_en: string;
  rating: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface SiteStat {
  id: string;
  key: string;
  value: number;
  suffix: string;
  label_ar: string;
  label_tr: string;
  label_en: string;
  sort_order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}
