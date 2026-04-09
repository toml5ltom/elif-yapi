-- ============================================================
-- ELIF YAPI GAYRİMENKUL — Complete Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- Districts
CREATE TABLE IF NOT EXISTS districts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_tr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_ar TEXT,
  description_tr TEXT,
  description_en TEXT,
  city TEXT NOT NULL DEFAULT 'Istanbul',
  image TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_tr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT,
  description_tr TEXT,
  description_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
  category TEXT NOT NULL CHECK (category IN ('apartment', 'villa', 'shop', 'office', 'land', 'citizenship')),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented', 'reserved', 'draft')),
  price NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD', 'TRY', 'EUR')),
  price_period TEXT CHECK (price_period IN ('total', 'monthly', 'yearly')),
  area_sqm NUMERIC NOT NULL,
  rooms INTEGER,
  bathrooms INTEGER,
  floor_number INTEGER,
  total_floors INTEGER,
  year_built INTEGER,
  district_id UUID REFERENCES districts(id),
  address_ar TEXT,
  address_tr TEXT,
  address_en TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  features_ar TEXT[] DEFAULT '{}',
  features_tr TEXT[] DEFAULT '{}',
  features_en TEXT[] DEFAULT '{}',
  images JSONB DEFAULT '[]',
  thumbnail TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_citizenship_eligible BOOLEAN DEFAULT false,
  meta_title_ar TEXT,
  meta_title_tr TEXT,
  meta_title_en TEXT,
  meta_description_ar TEXT,
  meta_description_tr TEXT,
  meta_description_en TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  country TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'website' CHECK (source IN ('website', 'whatsapp', 'tally', 'instagram', 'phone')),
  preferred_language TEXT DEFAULT 'ar' CHECK (preferred_language IN ('ar', 'tr', 'en')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'converted', 'closed', 'spam')),
  notes TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_role_ar TEXT,
  client_role_tr TEXT,
  client_role_en TEXT,
  quote_ar TEXT NOT NULL,
  quote_tr TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Stats
CREATE TABLE IF NOT EXISTS site_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value INTEGER NOT NULL,
  suffix TEXT DEFAULT '+',
  label_ar TEXT NOT NULL,
  label_tr TEXT NOT NULL,
  label_en TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_category ON properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_district ON properties(district_id);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_properties_citizenship ON properties(is_citizenship_eligible) WHERE is_citizenship_eligible = true;
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_created ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_published ON properties(published_at) WHERE published_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_inquiries_property ON inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_districts_updated_at BEFORE UPDATE ON districts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- VIEWS
-- ============================================================

CREATE OR REPLACE VIEW v_properties_listing AS
  SELECT p.*, d.name_ar AS district_name_ar, d.name_tr AS district_name_tr, d.name_en AS district_name_en
  FROM properties p LEFT JOIN districts d ON p.district_id = d.id
  WHERE p.status = 'available' AND p.published_at IS NOT NULL;

CREATE OR REPLACE VIEW v_featured_properties AS
  SELECT p.*, d.name_ar AS district_name_ar, d.name_tr AS district_name_tr, d.name_en AS district_name_en
  FROM properties p LEFT JOIN districts d ON p.district_id = d.id
  WHERE p.is_featured = true AND p.status = 'available' AND p.published_at IS NOT NULL
  ORDER BY p.created_at DESC;

CREATE OR REPLACE VIEW v_citizenship_properties AS
  SELECT p.*, d.name_ar AS district_name_ar, d.name_tr AS district_name_tr, d.name_en AS district_name_en
  FROM properties p LEFT JOIN districts d ON p.district_id = d.id
  WHERE p.is_citizenship_eligible = true AND p.status = 'available' AND p.published_at IS NOT NULL
  ORDER BY p.price DESC;

CREATE OR REPLACE VIEW v_districts_with_count AS
  SELECT d.*, COUNT(p.id) AS property_count
  FROM districts d LEFT JOIN properties p ON p.district_id = d.id AND p.status = 'available' AND p.published_at IS NOT NULL
  WHERE d.is_active = true
  GROUP BY d.id ORDER BY d.sort_order;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read: published properties only
CREATE POLICY "public_read_properties" ON properties FOR SELECT TO anon USING (status = 'available' AND published_at IS NOT NULL);
CREATE POLICY "public_read_districts" ON districts FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "public_read_stats" ON site_stats FOR SELECT TO anon USING (true);
CREATE POLICY "public_read_settings" ON site_settings FOR SELECT TO anon USING (true);

-- Public insert: inquiries only
CREATE POLICY "public_insert_inquiries" ON inquiries FOR INSERT TO anon WITH CHECK (name IS NOT NULL AND phone IS NOT NULL);

-- Admin full access
CREATE POLICY "admin_all_properties" ON properties FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_all_districts" ON districts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_all_inquiries" ON inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_all_testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_all_stats" ON site_stats FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_all_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Districts
INSERT INTO districts (name_ar, name_tr, name_en, slug, description_ar, description_tr, description_en, sort_order) VALUES
('باشاك شهير', 'Başakşehir', 'Başakşehir', 'basaksehir', 'مركز الاستثمار الجديد في إسطنبول', 'İstanbul''un yeni yatırım merkezi', 'Istanbul''s new investment hub', 1),
('بيليك دوزو', 'Beylikdüzü', 'Beylikdüzü', 'beylikduzu', 'إطلالات بحرية وأسعار منافسة', 'Deniz manzarası ve uygun fiyatlar', 'Sea views and competitive prices', 2),
('أسنيورت', 'Esenyurt', 'Esenyurt', 'esenyurt', 'أسعار مناسبة وعوائد إيجارية عالية', 'Uygun fiyatlar ve yüksek kira getirisi', 'Affordable prices and high rental yields', 3),
('شيشلي', 'Şişli', 'Şişli', 'sisli', 'قلب إسطنبول التجاري', 'İstanbul''un ticaret kalbi', 'The commercial heart of Istanbul', 4),
('بشكتاش', 'Beşiktaş', 'Beşiktaş', 'besiktas', 'فخامة على ضفاف البوسفور', 'Boğaz kıyısında lüks yaşam', 'Luxury living on the Bosphorus', 5),
('كاديكوي', 'Kadıköy', 'Kadıköy', 'kadikoy', 'الجانب الآسيوي الراقي', 'Anadolu yakasının gözde semti', 'The prestigious Asian side', 6),
('ساريير', 'Sarıyer', 'Sarıyer', 'sariyer', 'طبيعة خلابة وفلل فاخرة', 'Muhteşem doğa ve lüks villalar', 'Stunning nature and luxury villas', 7),
('باهتشه شهير', 'Bahçeşehir', 'Bahçeşehir', 'bahcesehir', 'حياة عائلية هادئة ومريحة', 'Huzurlu ve konforlu aile yaşamı', 'Peaceful and comfortable family living', 8),
('أتاشهير', 'Ataşehir', 'Ataşehir', 'atasehir', 'مركز الأعمال في الجانب الآسيوي', 'Anadolu yakasının iş merkezi', 'Business center of the Asian side', 9)
ON CONFLICT (slug) DO NOTHING;

-- Stats
INSERT INTO site_stats (key, value, suffix, label_ar, label_tr, label_en, sort_order) VALUES
('properties_handled', 500, '+', 'عقار تم التعامل معه', 'İşlem Yapılan Emlak', 'Properties Handled', 1),
('years_experience', 7, '+', 'سنوات من الخبرة', 'Yıllık Deneyim', 'Years of Experience', 2),
('happy_clients', 1000, '+', 'عميل سعيد', 'Mutlu Müşteri', 'Happy Clients', 3),
('districts_covered', 50, '+', 'منطقة نغطيها في إسطنبول', 'İstanbul''da Kapsanan Bölge', 'Districts Covered in Istanbul', 4)
ON CONFLICT (key) DO NOTHING;

-- Testimonials
INSERT INTO testimonials (client_name, client_role_ar, client_role_tr, client_role_en, quote_ar, quote_tr, quote_en, rating, sort_order) VALUES
('أحمد م.', 'مستثمر من السعودية', 'Suudi Arabistan''dan yatırımcı', 'Investor from Saudi Arabia',
 'تعاملت مع ELIF YAPI لشراء شقة في باشاك شهير وكانت التجربة ممتازة من البداية للنهاية. فريق محترف ومتعاون.',
 'Başakşehir''de daire almak için ELIF YAPI ile çalıştım, baştan sona mükemmel bir deneyimdi.',
 'I worked with ELIF YAPI to buy an apartment in Başakşehir and the experience was excellent from start to finish.', 5, 1),
('محمد ك.', 'رجل أعمال من العراق', 'Irak''tan işadamı', 'Businessman from Iraq',
 'ساعدوني في الحصول على الجنسية التركية خلال 4 أشهر فقط. خدمة استثنائية وشفافية كاملة.',
 'Sadece 4 ayda Türk vatandaşlığı almamda yardımcı oldular. Olağanüstü hizmet ve tam şeffaflık.',
 'They helped me obtain Turkish citizenship in just 4 months. Exceptional service and complete transparency.', 5, 2),
('فاطمة ع.', 'عميلة من الأردن', 'Ürdün''den müşteri', 'Client from Jordan',
 'وجدت الشقة المثالية لعائلتي بفضل فريق ELIF YAPI. يتحدثون العربية وهذا سهّل كل شيء.',
 'ELIF YAPI ekibi sayesinde ailem için ideal daireyi buldum. Arapça konuşmaları her şeyi kolaylaştırdı.',
 'I found the perfect apartment for my family thanks to the ELIF YAPI team. Their Arabic fluency made everything easier.', 5, 3);

-- Settings
INSERT INTO site_settings (key, value) VALUES
('company', '{"name":"ELIF YAPI GAYRİMENKUL","phone":"+905384995690","whatsapp":"+905384995690","email":"elifyapigayrimenkul23@gmail.com","latitude":41.0867,"longitude":28.8003}'),
('social', '{"instagram":"https://www.instagram.com/elifyapi.gayrimenkul"}'),
('tally_forms', '{"contact":"EkJqA2"}'),
('citizenship', '{"min_investment_usd":400000,"processing_months_min":3,"processing_months_max":6}')
ON CONFLICT (key) DO NOTHING;

-- Sample property (for testing)
INSERT INTO properties (
  title_ar, title_tr, title_en, slug, type, category, status,
  price, currency, area_sqm, rooms, bathrooms, floor_number, total_floors,
  address_ar, address_tr, address_en,
  features_ar, features_tr, features_en,
  thumbnail, is_featured, is_citizenship_eligible, published_at,
  description_ar, description_tr, description_en
) VALUES (
  'شقة فاخرة في باشاك شهير', 'Başakşehir''de Lüks Daire', 'Luxury Apartment in Başakşehir',
  'luxury-apartment-basaksehir-001', 'sale', 'apartment', 'available',
  450000, 'USD', 145, 3, 2, 8, 20,
  'باشاك شهير، إسطنبول', 'Başakşehir, İstanbul', 'Başakşehir, Istanbul',
  ARRAY['شرفة واسعة', 'إطلالة بانورامية', 'مصعد', 'موقف سيارات', 'أمن 24/7', 'حمام سباحة'],
  ARRAY['Geniş balkon', 'Panoramik manzara', 'Asansör', 'Otopark', '24 saat güvenlik', 'Yüzme havuzu'],
  ARRAY['Spacious balcony', 'Panoramic view', 'Elevator', 'Parking', '24/7 security', 'Swimming pool'],
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  true, true, NOW(),
  'شقة فاخرة بإطلالة بانورامية على المدينة في منطقة باشاك شهير، 3 غرف نوم مع تشطيبات عالية الجودة.',
  'Başakşehir''de şehir manzaralı lüks daire, yüksek kaliteli bitişlerle 3 yatak odalı.',
  'Luxury apartment with panoramic city views in Başakşehir, 3 bedrooms with high-quality finishes.'
) ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- DONE
-- ============================================================
-- Run this SQL in Supabase: Dashboard > SQL Editor > New Query > Paste & Run
