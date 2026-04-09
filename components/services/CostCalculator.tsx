"use client";

import { useState } from "react";
import { Calculator, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostCalculatorProps { locale: string }

export default function CostCalculator({ locale }: CostCalculatorProps) {
  const [value, setValue] = useState(500000);
  const isRTL = locale === "ar";

  const t = (ar: string, tr: string, en: string) =>
    locale === "ar" ? ar : locale === "tr" ? tr : en;

  const tapu = Math.round(value * 0.04);
  const vat = Math.round(value * 0.01);
  const lawyer = 3000;
  const translation = 500;
  const total = value + tapu + vat + lawyer + translation;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const rows = [
    { label: t("قيمة العقار", "Mülk Değeri", "Property Value"), amount: value, highlight: true },
    { label: t("رسوم الطابو (4%)", "Tapu Harcı (%4)", "Title Deed Fee (4%)"), amount: tapu },
    { label: t("ضريبة القيمة المضافة (1%)", "KDV (%1)", "VAT (1%)"), amount: vat },
    { label: t("رسوم المحامي", "Avukat Ücreti", "Lawyer Fee"), amount: lawyer },
    { label: t("رسوم الترجمة", "Tercüme Ücreti", "Translation Fee"), amount: translation },
  ];

  return (
    <div className="bg-surface-card border border-gold/20 rounded-2xl p-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
          <Calculator size={20} className="text-gold" />
        </div>
        <div>
          <h3 className="text-white font-semibold">
            {t("حاسبة تكاليف الشراء", "Satın Alma Maliyeti Hesaplayıcısı", "Purchase Cost Calculator")}
          </h3>
          <p className="text-text-muted text-xs">
            {t("تقدير تقريبي", "Yaklaşık tahmin", "Approximate estimate")}
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-text-muted mb-2">
          <span>{t("قيمة العقار", "Mülk Değeri", "Property Value")}</span>
          <span className="text-gold font-bold">{fmt(value)}</span>
        </div>
        <input
          type="range"
          min={400000}
          max={2000000}
          step={50000}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-[#C9A84C] h-2 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>$400K</span>
          <span>$2M</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 mb-6">
        {rows.map((row, i) => (
          <div key={i} className={cn("flex justify-between items-center py-2", i < rows.length - 1 && "border-b border-[#1F1F1F]")}>
            <span className={cn("text-sm", row.highlight ? "text-white font-medium" : "text-text-muted")}>
              {row.label}
            </span>
            <span className={cn("text-sm font-semibold price-tag", row.highlight ? "text-white" : "text-text-secondary")}>
              {fmt(row.amount)}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex justify-between items-center">
        <span className="text-white font-bold">
          {t("الإجمالي التقديري", "Tahmini Toplam", "Estimated Total")}
        </span>
        <span className="text-gold text-xl font-bold price-tag">{fmt(total)}</span>
      </div>

      <p className="text-text-muted text-xs mt-4 text-center">
        {t("* الأرقام تقديرية، قد تختلف حسب نوع العقار", "* Rakamlar tahmini olup mülk türüne göre değişebilir", "* Figures are estimates and may vary by property type")}
      </p>
    </div>
  );
}
