import { NextResponse } from "next/server";

interface NutritionInput {
  CARBO: number;
  PROTEIN: number;
  FAT: number;
}

function main(
  CARBO: number,
  PROTEIN: number,
  FAT: number
): {
  total_score: number;
  recommendation: string;
} {
  let protein_score: number;
  let fat_score: number;

  if (PROTEIN <= 5) {
    protein_score = 0;
  } else if (PROTEIN < 10) {
    protein_score = 1;
  } else if (PROTEIN < 15) {
    protein_score = 2;
  } else if (PROTEIN < 20) {
    protein_score = 3;
  } else {
    protein_score = 4;
  }

  if (FAT <= 10) {
    fat_score = 3;
  } else if (FAT < 30) {
    fat_score = 2;
  } else {
    fat_score = 1;
  }

  const total = CARBO + PROTEIN + FAT;
  const x = CARBO / total;
  const y = PROTEIN / total;
  const z = FAT / total;

  const score =
    3 - (Math.abs(x - 0.5625) + Math.abs(y - 0.3125) + Math.abs(z - 0.125));
  const total_score = Number((protein_score + fat_score + score).toFixed(3));

  return {
    total_score,
    recommendation: total_score > 7 ? "추천" : "비추천",
  };
}

export async function POST(req: Request) {
  try {
    const body: NutritionInput = await req.json();

    if (!body.CARBO || !body.PROTEIN || !body.FAT) {
      return NextResponse.json(
        { error: "탄수화물, 단백질, 지방 값이 모두 필요합니다." },
        { status: 400 }
      );
    }

    const result = main(body.CARBO, body.PROTEIN, body.FAT);
    return NextResponse.json(result);
  } catch (error) {
    console.error("영양소 계산 오류:", error);
    return NextResponse.json(
      { error: "계산 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
