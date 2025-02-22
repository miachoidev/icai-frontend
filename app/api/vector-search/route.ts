import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/mongodb";
import { get_embedding } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "검색어가 필요합니다." },
        { status: 400 }
      );
    }

    const embedding = await get_embedding(query);
    if (!embedding) {
      return NextResponse.json(
        { error: "임베딩 생성에 실패했습니다." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("sample_jinho");
    const collection = db.collection("food_collection2");

    // 벡터 검색 파이프라인
    const pipeline = [
      {
        $vectorSearch: {
          index: "index_jinho2", // MongoDB Atlas의 벡터 검색 인덱스 이름
          queryVector: embedding,
          path: "embedded", // 임베딩이 저장된 필드명
          numCandidates: 150,
          limit: 5,
        },
      },
      {
        $project: {
          _id: 0,
          embedded: 0,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ];

    const results = await collection.aggregate(pipeline).toArray();

    if (!results.length) {
      return NextResponse.json(
        { error: "유사한 제품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ similar_products: results });
  } catch (error) {
    console.error("Vector search error:", error);
    return NextResponse.json(
      { error: `검색 중 오류가 발생했습니다: ${error}` },
      { status: 500 }
    );
  }
}
