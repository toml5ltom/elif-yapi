import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "ELIF YAPI GAYRİMENKUL",
  description: "Luxury Real Estate in Istanbul",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
