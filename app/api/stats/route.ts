import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/client";
export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from("site_stats").select("*").order("sort_order");
    if (error) throw error;
    return NextResponse.json({ stats: data });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
