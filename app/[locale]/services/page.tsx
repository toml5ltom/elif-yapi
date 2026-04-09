import Link from "next/link";
import { Building2, Search, Key, MessageSquare, Award, Settings, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface PageProps { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  return {
    title: locale === "ar" ? "خدماتنا" : locale === "tr" ? "Hizmetlerimiz" : "Our Services",
  };
}

const SERVICES = [
  {
    icon: Building2,
    ar: { title: "بيع العقارات", desc: "نمتلك شبكة واسعة من المشترين المحليين والدوليين. نسوّق عقارك باحترافية عالية لضمان أفضل سعر في أسرع وقت ممكن.", features: ["تقييم مجاني للعقار", "تسويق على منصات دولية", "التفاوض باسمك", "إتمام الإجراءات القانونية"] },
    tr: { title: "Emlak Satışı", desc: "Geniş yerel ve uluslararası alıcı ağımız var. Mülkünüzü en yüksek fiyata en kısa sürede satmak için profesyonelce pazarlıyoruz.", features: ["Ücretsiz mülk değerleme", "Uluslararası platformlarda pazarlama", "Sizin adınıza müzakere", "Yasal işlemlerin tamamlanması"] },
    en: { title: "Property Sales", desc: "We have an extensive network of local and international buyers. We market your property professionally to ensure the best price in the shortest time.", features: ["Free property valuation", "Marketing on international platforms", "Negotiating on your behalf", "Completing legal procedures"] },
  },
  {
    icon: Search,
    ar: { title: "شراء العقارات", desc: "سواء كنت تبحث عن شقة للسكن أو استثمار مربح، يساعدك فريقنا في إيجاد العقار المثالي الذي يناسب ميزانيتك وتفضيلاتك.", features: ["استشارة مجانية لتحديد احتياجاتك", "جولات عقارية مجدولة", "مقارنة الخيارات وتحليلها", "دعم قانوني كامل حتى التسليم"] },
    tr: { title: "Emlak Alımı", desc: "İster ikamet için daire, ister karlı yatırım arıyor olun, ekibimiz bütçenize ve tercihlerinize uygun ideal mülkü bulmanıza yardımcı olur.", features: ["İhtiyaç belirleme için ücretsiz danışmanlık", "Planlı mülk turları", "Seçeneklerin karşılaştırılması ve analizi", "Teslimata kadar tam hukuki destek"] },
    en: { title: "Property Purchase", desc: "Whether you're looking for a residential apartment or a profitable investment, our team helps you find the perfect property that suits your budget and preferences.", features: ["Free consultation to identify needs", "Scheduled property tours", "Comparison and analysis of options", "Full legal support until handover"] },
  },
  {
    icon: Key,
    ar: { title: "الإيجارات", desc: "نقدم خدمات إيجار شاملة للأفراد والشركات، سواء كنت تبحث عن مستأجر لعقارك أو عن عقار للإيجار.", features: ["إيجاد مستأجرين موثوقين", "صياغة عقود الإيجار", "متابعة الدفعات الشهرية", "صيانة وإدارة العقار"] },
    tr: { title: "Kiralama", desc: "Bireyler ve şirketler için kapsamlı kiralama hizmetleri sunuyoruz; ister mülkünüz için kiracı, ister kiralık mülk arıyor olun.", features: ["Güvenilir kiracı bulma", "Kira sözleşmesi hazırlama", "Aylık ödemelerin takibi", "Mülk bakım ve yönetimi"] },
    en: { title: "Rentals", desc: "We provide comprehensive rental services for individuals and companies, whether you're looking for a tenant for your property or a property to rent.", features: ["Finding reliable tenants", "Drafting rental contracts", "Monthly payment follow-up", "Property maintenance and management"] },
  },
  {
    icon: MessageSquare,
    ar: { title: "الاستشارات العقارية", desc: "خبراؤنا يمتلكون معرفة عميقة بسوق العقارات الإسطنبولي ويرشدونك لاتخاذ القرار الاستثماري الأمثل.", features: ["تحليل السوق والاتجاهات", "تقييم العوائد الاستثمارية", "دراسة الجدوى للمشاريع", "مشورة قانونية وضريبية"] },
    tr: { title: "Gayrimenkul Danışmanlığı", desc: "Uzmanlarımız İstanbul gayrimenkul piyasası hakkında derin bilgiye sahip olup en iyi yatırım kararını almanıza rehberlik eder.", features: ["Piyasa ve trend analizi", "Yatırım getirisi değerlendirmesi", "Proje fizibilite etüdü", "Hukuki ve vergi danışmanlığı"] },
    en: { title: "Real Estate Consulting", desc: "Our experts have deep knowledge of the Istanbul real estate market and guide you to make the best investment decision.", features: ["Market and trend analysis", "Investment return evaluation", "Project feasibility study", "Legal and tax advisory"] },
  },
  {
    icon: Award,
    ar: { title: "الجنسية التركية", desc: "نتخصص في مساعدة المستثمرين الأجانب على الحصول على الجنسية التركية عن طريق الاستثمار العقاري بأمان وشفافية.", features: ["استشارة مجانية لتقييم الأهلية", "اختيار العقار المناسب", "إدارة جميع الأوراق الرسمية", "متابعة الطلب حتى الحصول على الجواز"] },
    tr: { title: "Türk Vatandaşlığı", desc: "Yabancı yatırımcıların gayrimenkul yatırımı yoluyla güvenli ve şeffaf bir şekilde Türk vatandaşlığı elde etmesine yardımcı olmada uzmanlaşıyoruz.", features: ["Uygunluk değerlendirmesi için ücretsiz danışmanlık", "Uygun mülk seçimi", "Tüm resmi evrakların yönetimi", "Pasaport alınana kadar başvuru takibi"] },
    en: { title: "Turkish Citizenship", desc: "We specialize in helping foreign investors obtain Turkish citizenship through real estate investment safely and transparently.", features: ["Free eligibility assessment consultation", "Selecting the right property", "Managing all official papers", "Application follow-up until passport receipt"] },
  },
  {
    icon: Settings,
    ar: { title: "إدارة العقارات", desc: "نتولى إدارة عقارك بالكامل بينما أنت في بلدك، لضمان أفضل العوائد وأعلى مستوى من الصيانة.", features: ["تحصيل الإيجار وإيداعه", "الصيانة الدورية والطارئة", "تقارير شهرية مفصلة", "تمثيلك قانونياً أمام الجهات"] },
    tr: { title: "Emlak Yönetimi", desc: "Siz ülkenizde olurken mülkünüzü tamamen yönetiyor, en iyi getiriyi ve en yüksek bakım standardını sağlıyoruz.", features: ["Kira tahsilatı ve yatırımı", "Düzenli ve acil bakım", "Ayrıntılı aylık raporlar", "Resmi makamlar önünde hukuki temsil"] },
    en: { title: "Property Management", desc: "We manage your property completely while you are in your country, ensuring the best returns and the highest level of maintenance.", features: ["Rent collection and deposit", "Regular and emergency maintenance", "Detailed monthly reports", "Legal representation before authorities"] },
  },
];

const FAQ_ITEMS = [
  {
    ar: { q: "هل يمكنني شراء عقار في تركيا كأجنبي؟", a: "نعم، يحق للمواطنين الأجانب من معظم دول العالم شراء العقارات في تركيا بشكل قانوني." },
    tr: { q: "Yabancı olarak Türkiye'de mülk satın alabilir miyim?", a: "Evet, çoğu ülke vatandaşı Türkiye'de yasal olarak gayrimenkul satın alabilir." },
    en: { q: "Can I buy property in Turkey as a foreigner?", a: "Yes, citizens from most countries can legally purchase real estate in Turkey." },
  },
  {
    ar: { q: "هل يمكن إتمام عملية الشراء عن بعد؟", a: "نعم، نوفر خدمة التوكيل الرسمي لإتمام جميع الإجراءات نيابةً عنك دون الحاجة للحضور." },
    tr: { q: "Satın alma işlemini uzaktan tamamlayabilir miyim?", a: "Evet, tüm işlemleri sizin adınıza tamamlamak için resmi vekalet hizmeti sunuyoruz." },
    en: { q: "Can I complete the purchase remotely?", a: "Yes, we provide official power of attorney services to complete all procedures on your behalf." },
  },
  {
    ar: { q: "ما هي رسوم خدماتكم؟", a: "رسوم الوساطة العقارية معيارية ومتفق عليها مسبقاً. نلتزم بالشفافية الكاملة ولا توجد رسوم خفية." },
    tr: { q: "Hizmet ücretleriniz nelerdir?", a: "Komisyon ücretleri standarttır ve önceden kararlaştırılır. Tam şeffaflık taahhüt ediyoruz, gizli ücret yok." },
    en: { q: "What are your service fees?", a: "Real estate brokerage fees are standard and agreed upon in advance. We are fully transparent with no hidden fees." },
  },
  {
    ar: { q: "كم من الوقت يستغرق تحويل ملكية العقار؟", a: "عادةً ما يتم تحويل الطابو خلال 1-3 أيام عمل بعد استيفاء جميع الشروط والأوراق." },
    tr: { q: "Tapu devri ne kadar sürer?", a: "Tüm koşulların ve evrakların karşılanmasının ardından tapu devri genellikle 1-3 iş günü içinde gerçekleşir." },
    en: { q: "How long does property title transfer take?", a: "The title deed transfer usually takes 1-3 working days after all requirements and documents are fulfilled." },
  },
];

export default function ServicesPage({ params: { locale } }: PageProps) {
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const getContent = (item: any) =>
    locale === "ar" ? item.ar : locale === "tr" ? item.tr : item.en;

  const t = (ar: string, tr: string, en: string) =>
    locale === "ar" ? ar : locale === "tr" ? tr : en;

  return (
    <div className="bg-[#0A0A0A] min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-[#080808] border-b border-[#1F1F1F] pt-28 pb-14 text-center">
        <div className="container-custom">
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            {t("ما نقدمه", "Sunduklarımız", "What We Offer")}
          </div>
          <h1 className="text-[clamp(28px,5vw,52px)] font-bold text-white mb-4">
            {t("خدماتنا", "Hizmetlerimiz", "Our Services")}
          </h1>
          <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
            {t(
              "حلول عقارية متكاملة تغطي كل ما تحتاجه من الشراء والبيع والإيجار وحتى الجنسية التركية",
              "Satın almadan satışa, kiralamadan Türk vatandaşlığına kadar ihtiyacınız olan her şeyi kapsayan kapsamlı gayrimenkul çözümleri",
              "Comprehensive real estate solutions covering everything you need from buying and selling to renting and Turkish citizenship"
            )}
          </p>
        </div>
      </div>

      <div className="container-custom py-20">
        {/* Services list - alternating layout */}
        <div className="space-y-6">
          {SERVICES.map((service, i) => {
            const content = getContent(service);
            const Icon = service.icon;
            const isEven = i % 2 === 0;
            const isGold = service.icon === Award;

            return (
              <div
                key={i}
                className={`flex flex-col lg:flex-row gap-8 items-center p-8 rounded-2xl border transition-all hover:border-gold/20 ${
                  isGold ? "bg-gold/5 border-gold/20" : "bg-surface-card border-[#1F1F1F]"
                } ${!isEven ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${isGold ? "bg-gold/20" : "bg-[#1A1A1A]"}`}>
                  <Icon size={36} className={isGold ? "text-gold" : "text-text-secondary"} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-white font-bold text-2xl mb-3">{content.title}</h2>
                  <p className="text-text-muted text-sm leading-relaxed mb-5">{content.desc}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {content.features.map((f: string, j: number) => (
                      <li key={j} className="flex items-center gap-2 text-text-secondary text-sm">
                        <CheckCircle size={14} className="text-gold shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <h2 className="text-[clamp(22px,4vw,38px)] font-bold text-white mb-12 text-center">
            {t("الأسئلة الشائعة", "Sık Sorulan Sorular", "Frequently Asked Questions")}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((faq, i) => {
              const content = getContent(faq);
              return (
                <details key={i} className="bg-surface-card border border-[#1F1F1F] rounded-xl overflow-hidden group">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:text-gold transition-colors">
                    <span className="text-white font-medium text-sm">{content.q}</span>
                    <ArrowRight size={16} className="text-gold shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5 text-text-muted text-sm leading-relaxed border-t border-[#1F1F1F] pt-4">
                    {content.a}
                  </div>
                </details>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-white font-bold text-2xl mb-4">
            {t("هل لديك سؤال؟", "Bir sorunuz mu var?", "Have a question?")}
          </h2>
          <p className="text-text-muted text-sm mb-8">
            {t("فريقنا جاهز للإجابة على جميع استفساراتك", "Ekibimiz tüm sorularınızı yanıtlamaya hazır", "Our team is ready to answer all your inquiries")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 btn-gold px-10 py-4 rounded-xl font-bold text-sm"
          >
            {t("تواصل معنا", "İletişime Geçin", "Contact Us")}
            <ArrowIcon size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
