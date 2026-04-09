import { NextRequest, NextResponse } from "next/server";
import { getPropertyBySlug, getSimilarProperties } from "@/lib/api";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const property = await getPropertyBySlug(params.slug);
    if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const similar = await getSimilarProperties(property, 3);
    return NextResponse.json({ property, similar });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}
