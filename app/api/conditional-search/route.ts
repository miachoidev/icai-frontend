import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/mongodb-client";

// 타입 정의
type NumericField =
  | "KCAL"
  | "CARBO"
  | "PROT"
  | "FAT"
  | "SUGAR"
  | "SO"
  | "T_FAT"
  | "S_FAT"
  | "CHOL"
  | "price";

interface SearchCondition {
  type: "higher" | "lower";
  value: number;
}

interface SearchConditions {
  numeric?: {
    field: NumericField;
    condition: SearchCondition;
  }[];
  ingredient?: {
    include?: string;
    exclude?: string;
  };
}

export async function POST(req: Request) {
  try {
    const { currentProduct, searchConditions } = await req.json();

    if (!currentProduct || !searchConditions) {
      return NextResponse.json(
        { error: "현재 제품 정보와 검색 조건이 필요합니다." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("sample_jinho");
    const collection = db.collection("food_collection2");

    // 검색 조건 구성
    const matchConditions: Record<string, any> = {
      CATEGORY2: currentProduct.CATEGORY2,
    };

    // 숫자 필드 조건 추가 (가격과 영양소를 한번에 처리)
    if (searchConditions.numeric) {
      searchConditions.numeric.forEach(({ field, condition }) => {
        matchConditions[field] =
          condition.type === "lower"
            ? { $lt: condition.value }
            : { $gt: condition.value };
      });
    }

    // 원재료 포함/제외 조건 추가
    if (searchConditions.ingredient) {
      if (searchConditions.ingredient.include) {
        matchConditions.RAWMTRL_NM = new RegExp(
          searchConditions.ingredient.include,
          "i"
        );
      }
      if (searchConditions.ingredient.exclude) {
        matchConditions.RAWMTRL_NM = {
          $not: new RegExp(searchConditions.ingredient.exclude, "i"),
        };
      }
    }

    const pipeline = [
      {
        $match: matchConditions,
      },
      { $limit: 20 },
      {
        $project: {
          PRODUCT: 1,
          ENTRPS: 1,
          price: 1,
          KCAL: 1,
          CARBO: 1,
          PROT: 1,
          FAT: 1,
          SUGAR: 1,
          SO: 1,
          T_FAT: 1,
          S_FAT: 1,
          CHOL: 1,
          CATEGORY1: 1,
          CATEGORY2: 1,
          RAWMTRL_NM: 1,
        },
      },
    ];

    const results = await collection.aggregate(pipeline).toArray();

    if (!results.length) {
      return NextResponse.json(
        { error: "조건에 맞는 제품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      similar_products: results,
      search_criteria: {
        conditions: matchConditions,
      },
    });
  } catch (error) {
    console.error("Conditional search error:", error);
    return NextResponse.json(
      { error: `검색 중 오류가 발생했습니다: ${error}` },
      { status: 500 }
    );
  }
}
