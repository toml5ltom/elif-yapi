import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/client";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const supabase = createServerClient();
    let query = supabase.from("properties").select("*, district:districts(*)", { count: "exact" }).eq("status", "available").not("published_at", "is", null);
    const type = searchParams.get("type"); if (type) query = query.eq("type", type);
    const category = searchParams.get("category"); if (category) query = query.eq("category", category);
    const featured = searchParams.get("featured"); if (featured === "true") query = query.eq("is_featured", true);
    const citizenship = searchParams.get("citizenship"); if (citizenship === "true") query = query.eq("is_citizenship_eligible", true);
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    switch (sort) {
      case "price_asc": query = query.order("price", { ascending: true }); break;
      case "price_desc": query = query.order("price", { ascending: false }); break;
      default: query = query.order("created_at", { ascending: false });
    }
    query = query.range((page-1)*limit, page*limit-1);
    const { data, error, count } = await query;
    if (error) throw error;
    return NextResponse.json({ properties: data, count, page, limit });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
