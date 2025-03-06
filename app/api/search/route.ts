import { mongoClient } from "@/lib/mongodb";
// import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  // const afterId = searchParams.get("afterId");
  const searchword = searchParams.get("searchword");
  const list = await mongoClient.getProducts(limit, searchword ? searchword : "");
  return NextResponse.json(list);
}
