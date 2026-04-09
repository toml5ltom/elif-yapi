import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/client";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone) return NextResponse.json({ error: "name and phone required" }, { status: 400 });
    const supabase = createServerClient();
    const { data, error } = await supabase.from("inquiries").insert([{ ...body, status: "new", source: body.source || "website" }]).select().single();
    if (error) throw error;
    return NextResponse.json({ inquiry: data }, { status: 201 });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
