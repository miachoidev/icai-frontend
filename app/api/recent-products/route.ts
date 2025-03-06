import { mongoClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const afterId = searchParams.get("afterId");
    const category2 = searchParams.get("category2") || undefined;
    const productPattern = searchParams.get("productPattern") || undefined;
    
    console.log("API 호출: /api/recent-products");
    console.log("파라미터:", { limit, afterId, category2 });
    
    const products = await mongoClient.getRecentRecords(
      limit, 
      afterId ? new ObjectId(afterId) : undefined,
      category2,
      productPattern
    );
    
    console.log("결과 개수:", products.length);
    
    return NextResponse.json({
      success: true,
      count: products.length,
      products: products
    });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 