import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-center px-4">
      <div>
        <div className="text-gold text-8xl font-bold mb-4">404</div>
        <h1 className="text-white text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-text-muted mb-8">الصفحة التي تبحث عنها غير موجودة</p>
        <Link href="/ar" className="btn-gold px-8 py-3.5 rounded-xl font-bold text-sm inline-block">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
