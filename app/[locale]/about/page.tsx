import { Award, Users, Shield, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = { ar: "من نحن", tr: "Hakkımızda", en: "About Us" };
  return { title: t[locale as keyof typeof t] || t.ar };
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const isRTL = locale === "ar";

  const VALUES = [
    { icon: Shield, ar: { title: "الثقة", desc: "نبني علاقات طويلة الأمد مع عملائنا على أساس الصدق والشفافية الكاملة" }, tr: { title: "Güven", desc: "Müşterilerimizle tam dürüstlük ve şeffaflık temelinde uzun vadeli ilişkiler kuruyoruz" }, en: { title: "Trust", desc: "We build long-term relationships with our clients based on complete honesty and transparency" } },
    { icon: Award, ar: { title: "الخبرة", desc: "فريق متخصص بخبرة تتجاوز 7 سنوات في سوق العقارات الإسطنبولي" }, tr: { title: "Uzmanlık", desc: "İstanbul gayrimenkul piyasasında 7 yılı aşkın deneyime sahip uzman ekip" }, en: { title: "Expertise", desc: "Specialized team with over 7 years of experience in Istanbul's real estate market" } },
    { icon: MessageSquare, ar: { title: "نتحدث عربي", desc: "خدمة متكاملة باللغة العربية لجعل تجربتك أكثر سهولة وراحة" }, tr: { title: "Arapça Konuşuyoruz", desc: "Deneyiminizi daha kolay ve rahat hale getirmek için Arapça tam hizmet" }, en: { title: "We Speak Arabic", desc: "Full service in Arabic to make your experience easier and more comfortable" } },
    { icon: Users, ar: { title: "خدمة شخصية", desc: "نتعامل مع كل عميل باهتمام فردي ونفهم احتياجاته الخاصة" }, tr: { title: "Kişisel Hizmet", desc: "Her müşteriye bireysel ilgi gösteriyor ve özel ihtiyaçlarını anlıyoruz" }, en: { title: "Personal Service", desc: "We treat each client with individual attention and understand their specific needs" } },
  ];

  const TEAM_STATS = [
    { value: "7+", ar: "سنوات خبرة", tr: "Yıl Deneyim", en: "Years Experience" },
    { value: "500+", ar: "عقار تم بيعه", tr: "Satılan Mülk", en: "Properties Sold" },
    { value: "1000+", ar: "عميل راضٍ", tr: "Mutlu Müşteri", en: "Happy Clients" },
    { value: "9", ar: "منطقة في إسطنبول", tr: "İstanbul Bölgesi", en: "Istanbul Districts" },
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-20" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-[#080808] border-b border-[#1F1F1F] py-16">
        <div className="container-custom">
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            {locale === "ar" ? "تعرف علينا" : locale === "tr" ? "Bizi Tanıyın" : "Get to Know Us"}
          </div>
          <h1 className="text-[clamp(28px,5vw,52px)] font-bold text-white mb-4">
            {locale === "ar" ? "من نحن" : locale === "tr" ? "Hakkımızda" : "About Us"}
          </h1>
          <p className="text-text-secondary text-lg max-w-xl">
            {locale === "ar" ? "خبرة وثقة في سوق العقارات الإسطنبولي منذ 2018" : locale === "tr" ? "2018'den bu yana İstanbul gayrimenkul piyasasında deneyim ve güven" : "Experience and trust in Istanbul's real estate market since 2018"}
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[clamp(22px,4vw,40px)] font-bold text-white mb-6">
                {locale === "ar" ? "قصتنا" : locale === "tr" ? "Hikayemiz" : "Our Story"}
              </h2>
              <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
                {locale === "ar" ? (
                  <>
                    <p>تأسست شركة إليف يابي غايريمنكول في إسطنبول عام 2018 بهدف سد الفجوة بين المستثمرين العرب والسوق العقاري التركي المتنامي.</p>
                    <p>بدأنا برؤية واضحة: تقديم خدمات عقارية احترافية باللغة العربية، مع ضمان الشفافية الكاملة والأمان في كل صفقة.</p>
                    <p>اليوم، ونحن نفخر بخدمة أكثر من 1000 عميل من دول عربية مختلفة، من السعودية والعراق والأردن والإمارات وغيرها، ساعدناهم في تحقيق أحلامهم العقارية وبعضهم في الحصول على الجنسية التركية.</p>
                    <p>مكتبنا في قلب باشاك شهير — المنطقة الأكثر طلباً من المستثمرين العرب في إسطنبول — يجعلنا أقرب إليك وإلى أفضل الفرص العقارية.</p>
                  </>
                ) : locale === "tr" ? (
                  <>
                    <p>ELIF YAPI GAYRİMENKUL, Arap yatırımcılar ile büyüyen Türk gayrimenkul piyasası arasındaki uçurumu kapatmak amacıyla 2018 yılında İstanbul'da kuruldu.</p>
                    <p>Net bir vizyonla başladık: Arapça profesyonel gayrimenkul hizmetleri sunmak ve her işlemde tam şeffaflık ile güvenlik sağlamak.</p>
                    <p>Bugün, Suudi Arabistan, Irak, Ürdün, BAE ve diğer Arap ülkelerinden 1000'den fazla müşteriye hizmet etmekten gurur duyuyoruz.</p>
                  </>
                ) : (
                  <>
                    <p>ELIF YAPI GAYRİMENKUL was founded in Istanbul in 2018 to bridge the gap between Arab investors and Turkey's growing real estate market.</p>
                    <p>We started with a clear vision: providing professional real estate services in Arabic, while ensuring complete transparency and security in every transaction.</p>
                    <p>Today, we are proud to have served over 1,000 clients from Saudi Arabia, Iraq, Jordan, UAE, and other Arab countries, helping them achieve their real estate dreams.</p>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80"
                alt="Istanbul"
                className="rounded-2xl w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl px-5 py-4">
                  <div className="text-gold font-bold">ELIF YAPI GAYRİMENKUL</div>
                  <div className="text-white/70 text-xs mt-1">Başakşehir, İstanbul — Since 2018</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#080808]">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-gold text-4xl font-bold mb-2">{s.value}</div>
                <div className="text-text-muted text-sm">
                  {locale === "ar" ? s.ar : locale === "tr" ? s.tr : s.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-[clamp(22px,4vw,40px)] font-bold text-white text-center mb-14">
            {locale === "ar" ? "قيمنا" : locale === "tr" ? "Değerlerimiz" : "Our Values"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              const val = v[locale as keyof typeof v] as any || v.en;
              return (
                <div key={i} className="bg-surface-card border border-[#1F1F1F] rounded-2xl p-6 hover:border-gold/20 transition-colors text-center">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{val.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="py-20 bg-[#080808]">
        <div className="container-custom text-center">
          <h2 className="text-[clamp(22px,4vw,36px)] font-bold text-white mb-4">
            {locale === "ar" ? "زورنا في مكتبنا" : locale === "tr" ? "Ofisimizi Ziyaret Edin" : "Visit Our Office"}
          </h2>
          <p className="text-text-muted text-sm mb-3">
            {locale === "ar" ? "كاياباشي، شارع غازي ياشار غيل، بارك مافيرا 1، A5 بلوك 15DO" : "Kayabaşı mah. Gaziyaşargil cad. Parkmavera 1, A5 blok 15DO"}
          </p>
          <p className="text-gold text-sm mb-8">Başakşehir, İstanbul</p>
          <a href="https://wa.me/905384995690" target="_blank" rel="noopener noreferrer"
            className="btn-gold px-8 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2">
            +90 538 499 5690
          </a>
        </div>
      </section>
    </div>
  );
}
