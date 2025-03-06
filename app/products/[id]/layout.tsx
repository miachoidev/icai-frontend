"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DifyChatButton } from "@/components/DifyChatButton";

// Window 타입 확장
declare global {
  interface Window {
    difyChatbotConfig?: any;
  }
}

// Context를 만들어서 제품 정보를 공유
export const ProductContext = React.createContext<any>(null);

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productInfo, setProductInfo] = useState<any>(null);
  const pathname = usePathname();
  const isProductDetail = pathname?.startsWith("/products/");

  // productInfo 객체에서 특정 키들을 제외하고 문자열로 변환하는 함수
  const getProductInfoString = (info: any) => {
    if (!info) return "";

    const excludeKeys = [
      "_id",
      "createdAt",
      "updatedAt",
      "embedded",
      "image",
      "STTEMNT_NO",
      "REGIST_DT",
      "CATEGORY1",
      "CATEGORY2",
      "TYPE",
      "TEXT",
    ];

    // 필터링된 객체 생성
    const filteredInfo = Object.fromEntries(
      Object.entries(info).filter(([key]) => !excludeKeys.includes(key))
    );

    // 각 키-값 쌍을 줄바꿈으로 구분된 문자열로 변환
    return Object.entries(filteredInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  };

  useEffect(() => {
    if (productInfo) {
      console.log("info:", productInfo);
    }
  }, [productInfo]);

  return (
    <ProductContext.Provider value={{ productInfo, setProductInfo }}>
      {children}
      {isProductDetail && productInfo && (
        <>
          <DifyChatButton
            chatbotId="MvYdgLCzHJaTrUkk"
            imagePath="/suncity.jpg"
            imageAlt="일반 문의"
            tooltipText="키토 전문가 썬시티5스타에게 물어보세요"
            inputs={getProductInfoString(productInfo)}
          />
          <DifyChatButton
            chatbotId="3c6CkWF8na7GgWX8"
            imagePath="/fit.jpeg"
            imageAlt="상품 문의"
            tooltipText="헬스/다이어트 전문가 핏블리에게 물어보세요"
            inputs={getProductInfoString(productInfo)}
          />
        </>
      )}
    </ProductContext.Provider>
  );
}
