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

type ComparisonType = "higher" | "lower"; // 이상, 이하로 단순화

interface NumericCondition {
  field: NumericField;
  type: ComparisonType;
  value: number;
}

interface RequestBody {
  category: string;
  numericConditions?: NumericCondition[];
  includeIngredients?: string[];
  excludeIngredients?: string[];
}

export async function POST(req: Request) {
  try {
    const { category, numericConditions, includeIngredients, excludeIngredients }: RequestBody =
      await req.json();

    if (!category) {
      return NextResponse.json(
        { error: "카테고리는 필수 값입니다." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("sample_jinho");
    const collection = db.collection("food_collection2");

    // 검색 조건 구성
    const matchConditions: Record<string, any> = {
      CATEGORY2: category,
    };

    // 숫자 필드 조건 추가
    if (numericConditions && numericConditions.length > 0) {
      numericConditions.forEach(({ field, type, value }) => {
        matchConditions[field] =
          type === "lower" ? { $lt: value } : { $gt: value };
      });
    }

    // 원재료 포함/제외 조건 추가
    if (includeIngredients && includeIngredients.length > 0) {
      matchConditions.RAWMTRL_NM = {
        $all: includeIngredients.map((term) => new RegExp(term, "i")),
      };
    }
    if (excludeIngredients && excludeIngredients.length > 0) {
      matchConditions.RAWMTRL_NM = {
        ...matchConditions.RAWMTRL_NM,
        $not: new RegExp(excludeIngredients.join("|"), "i"),
      };
    }

    const pipeline = [
      {
        $match: matchConditions,
      },
      { $limit: 5 },
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
