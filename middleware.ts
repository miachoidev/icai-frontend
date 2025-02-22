import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");

  // vector-search API 경로에 대해서만 검사
  if (request.nextUrl.pathname.startsWith("/api/vector-search")) {
    if (!apiKey || apiKey !== process.env.MONGODB_API_KEY) {
      return NextResponse.json(
        { error: "유효하지 않은 API 키입니다." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/vector-search",
};
