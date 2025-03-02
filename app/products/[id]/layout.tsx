"use client";

import React, { useState } from "react";
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

  return (
    <ProductContext.Provider value={{ productInfo, setProductInfo }}>
      {children}
      {isProductDetail && productInfo && (
        <>
          {console.log("Original Product Info:", productInfo)}
          <DifyChatButton
            chatbotId="1lxNf1pXyzXJunTv"
            imagePath="/suncity.jpg"
            imageAlt="일반 문의"
            tooltipText="키토 전문가 썬시티5스타에게 물어보세요"
            inputs={{
              product: JSON.stringify(
                (() => {
                  const {
                    embedded,
                    STTEMNT_NO,
                    _id,
                    REGIST_DT,
                    image,
                    TEXT,
                    // "KCAL.1": kcal1,
                    ...productInfoFiltered
                  } = productInfo;
                  console.log("Filtered Product Info:", productInfoFiltered);
                  return productInfoFiltered;
                })()
              ),
            }}
          />
          <DifyChatButton
            chatbotId="sOdLG3fHDRrpvfzR"
            imagePath="/fit.jpeg"
            imageAlt="상품 문의"
            tooltipText="헬스/다이어트 전문가 핏블리에게 물어보세요"
            inputs={{
              product: JSON.stringify(
                (() => {
                  const {
                    embedded,
                    STTEMNT_NO,
                    _id,
                    REGIST_DT,
                    image,
                    TEXT,
                    // "KCAL.1": kcal1,
                    ...productInfoFiltered
                  } = productInfo;
                  return productInfoFiltered;
                })()
              ),
            }}
          />
        </>
      )}
    </ProductContext.Provider>
  );
}
