import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/mongodb-client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 웹 검색 함수
async function searchWeb(query: string) {
  const url = "https://google.serper.dev/search";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: query,
      gl: "kr",
      hl: "ko",
    }),
  });
  return response.json();
}

// 유사 제품 검색 함수
async function findSimilarProducts(productName: string) {
  const client = await clientPromise;
  const db = client.db("sample_jinho");
  const collection = db.collection("food_collection");

  try {
    const pipeline = [
      {
        $search: {
          index: "jinho",
          text: {
            query: productName,
            path: "PRDUCT",
          },
        },
      },
      {
        $limit: 5,
      },
    ];

    const results = await collection.aggregate(pipeline).toArray();
    return { similar_products: results };
  } catch (error) {
    console.error("Error finding similar products:", error);
    return { error: "유사 제품을 찾을 수 없습니다." };
  }
}

const tools = [
  {
    type: "function" as const,
    function: {
      name: "search_web",
      description: "정확한 성분 정보를 수집하기위해 수행합니다.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "검색할 성분 관련 키워드",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "find_similar_products",
      description: "기존 제품과 유사한 제품을 찾아 추천합니다.",
      parameters: {
        type: "object",
        properties: {
          product_name: {
            type: "string",
            description: "현재 제품의 이름",
          },
        },
        required: ["product_name"],
      },
    },
  },
] as const;

export async function POST(req: Request) {
  try {
    const { messages, productInfo } = await req.json();

    const systemMessage = {
      role: "system",
      content: `너는 다이어트 헬스 전문가 챗봇 핏블리야.
      너는 다이어트 식품의 단백질 함량을 중요시해.
      식품 100그램당 최소 20g 이상의 단백질 함량을 권장해.
      탄수화물 : 단백질 : 지방 = 4 : 4 : 2 의 비율을 권장해.
      당류가 10g 이상인 제품은 피하라고 조언해줘.
      운동 전문가로서 다이어트 보조제에 의지하지 않도록 단호하면서도 친절하고 전문적인 어조로 대답해.
      현재 제품 정보: ${JSON.stringify(productInfo)}`,
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, ...messages],
      tools: tools,
      tool_choice: "auto",
    });

    const response = completion.choices[0].message;

    if (response.tool_calls) {
      const toolResponses = await Promise.all(
        response.tool_calls.map(async (toolCall) => {
          const functionName = toolCall.function.name;
          const args = JSON.parse(toolCall.function.arguments);

          if (functionName === "search_web") {
            return await searchWeb(args.query);
          } else if (functionName === "find_similar_products") {
            return await findSimilarProducts(args.product_name);
          }
        })
      );

      const secondCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          ...messages,
          response,
          {
            role: "function",
            name: "tool_results",
            content: JSON.stringify(toolResponses),
          },
        ],
      });

      return NextResponse.json({
        message: secondCompletion.choices[0].message.content,
      });
    }

    return NextResponse.json({
      message: response.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
