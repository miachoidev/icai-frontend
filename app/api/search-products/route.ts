import { NextResponse } from "next/server";
import { mongoClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  const afterId = searchParams.get("afterId");
  const category2 = searchParams.get("category2");
  const searchQuery = searchParams.get("query");

  try {
    // 검색어가 있으면 productPattern 설정
    let productPattern: string[] | undefined;
    let excludePatterns: string[] | undefined;

    if (searchQuery) {
      productPattern = [searchQuery];
    }

    // category2 값에 따라 excludePatterns 설정
    if (category2) {
      if (category2 === "슬림") {
        excludePatterns = ["쉐이크", "효소", "유부", "소스", "단무지", "두부", "저칼로리"];
      } else if (category2 === "닭가슴살") {
        // excludePatterns = ["샐러드"];
      }
    }

    const products = await mongoClient.getRecentRecords(
      limit,
      afterId ? new ObjectId(afterId) : undefined,
      category2 || undefined,
      productPattern,
      excludePatterns
    );

    // ObjectId를 문자열로 변환
    const serializedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString()
    }));

    return NextResponse.json({
      success: true,
      count: serializedProducts.length,
      products: serializedProducts
    });
  } catch (error) {
    console.error("검색 API 오류:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 