import { mongoClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     // 요청 본문에서 파라미터 가져오기
//     const body = await request.json();
    
//     const limit = body.limit || 20;
//     const afterId = body.afterId;
//     const category2 = body.category2;
//     const productPattern = body.productPattern;
//     const excludePatterns = body.excludePatterns;
    
//     console.log("API 호출: /api/recent-products (POST)");
//     console.log("파라미터:", { limit, afterId, category2, productPattern, excludePatterns });
    
//     const products = await mongoClient.getRecentRecords(
//       limit, 
//       afterId ? new ObjectId(afterId) : undefined,
//       category2,
//       productPattern,
//       excludePatterns // 이미 배열로 전달됨
//     );
    
//     console.log("결과 개수:", products.length);
    
//     return NextResponse.json({
//       success: true,
//       count: products.length,
//       products: products
//     });
//   } catch (error) {
//     console.error("API 오류:", error);
//     return NextResponse.json({
//       success: false,
//       error: error instanceof Error ? error.message : String(error)
//     }, { status: 500 });
//   }
// }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  const afterId = searchParams.get("afterId");
  const category2 = searchParams.get("category2");
	console.log("category2", category2);
	console.log("searchParams", searchParams);

  let productPattern: string[] | undefined;
  let excludePatterns: string[] | undefined;

  // category2 값에 따라 productPattern과 excludePatterns 설정
  if (category2) {
    if (category2 === "슬림") {
      excludePatterns = ["쉐이크", "효소", "유부", "소스", "단무지", "두부", "저칼로리"];
    } else if (category2 === "쉐이크") {
      // 쉐이크 카테고리는 특별한 패턴 없이 카테고리만 사용
    } else if (category2 === "닭가슴살") {
      // excludePatterns = ["샐러드"];
    } else if (category2 === "곤약") {
      productPattern = ["밥", "젤리"];
    } else if (category2 === "칼로리") {
      productPattern = ["저칼로리", "저당"];
    } else if (category2 === "효소") {
      // 효소 카테고리는 특별한 패턴 없이 카테고리만 사용
    } else if (category2 === "아르기닌") {
      // 아르기닌 카테고리는 특별한 패턴 없이 카테고리만 사용
    }
  }

  console.log("API 호출: /api/recent-products (GET)");
  console.log("파라미터:", { limit, afterId, category2, productPattern, excludePatterns });

  // getRecentRecords 함수 호출로 변경
  const list = await mongoClient.getRecentRecords(
    limit, 
    afterId ? new ObjectId(afterId) : undefined,
    category2 || undefined,
    productPattern,
    excludePatterns
  );

  console.log("결과 개수:", list.length);
  
  // return NextResponse.json({
  //   success: true,
  //   count: products.length,
  //   products: products
  // });
	return NextResponse.json(list);
}

// export async function POST(request: Request) {
//   try {
//     // 요청 본문에서 파라미터 가져오기
//     const body = await request.json();
    
//     const limit = body.limit || 20;
//     const afterId = body.afterId;
//     const category2 = body.category2;
//     const productPattern = body.productPattern;
//     const excludePatterns = body.excludePatterns;
    
//     console.log("API 호출: /api/recent-products (POST)");
//     console.log("파라미터:", { limit, afterId, category2, productPattern, excludePatterns });
    
//     const products = await mongoClient.getRecentRecords(
//       limit, 
//       afterId ? new ObjectId(afterId) : undefined,
//       category2,
//       productPattern,
//       excludePatterns // 이미 배열로 전달됨
//     );
    
//     console.log("결과 개수:", products.length);
    
//     return NextResponse.json({
//       success: true,
//       count: products.length,
//       products: products
//     });
//   } catch (error) {
//     console.error("API 오류:", error);
//     return NextResponse.json({
//       success: false,
//       error: error instanceof Error ? error.message : String(error)
//     }, { status: 500 });
//   }
// } 