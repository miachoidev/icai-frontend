import { mongoClient } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const product = await mongoClient.getProduct(id);
  return NextResponse.json(product);
}