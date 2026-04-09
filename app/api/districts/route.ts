import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/client";
export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from("districts").select("*").eq("is_active", true).order("sort_order");
    if (error) throw error;
    return NextResponse.json({ districts: data });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
