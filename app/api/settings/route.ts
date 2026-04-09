import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/client";
export async function GET(req: NextRequest) {
  try {
    const key = new URL(req.url).searchParams.get("key");
    const supabase = createServerClient();
    let query = supabase.from("site_settings").select("*");
    if (key) query = query.eq("key", key);
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ settings: data });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
