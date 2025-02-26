"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

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

  useEffect(() => {
    if (isProductDetail && productInfo) {
      // embedded, STTEMNT_NO, _id, REGIST_DT 키를 제외한 새로운 객체 생성
      const { embedded, STTEMNT_NO, _id, REGIST_DT, ...productInfoFiltered } =
        productInfo;

      // 객체를 문자열로 변환
      const productInfoString = JSON.stringify(productInfoFiltered);
      // 먼저 config를 설정
      const initScript = document.createElement("script");
      initScript.textContent = `
        window.difyChatbotConfig = {
          token: 'BqyHPFOXfJ5Mm6zI',
          // token: 's2Hjhgw41tGStjAY',
          dynamicScript: true,
          inputs: {
            product : '${productInfoString}'
            },
        };
      `;
      document.head.appendChild(initScript);

      // 그 다음 embed.min.js 로드
      setTimeout(() => {
        const embedScript = document.createElement("script");
        embedScript.id = "BqyHPFOXfJ5Mm6zI";
        embedScript.src = "https://udify.app/embed.min.js";
        document.body.appendChild(embedScript);
      }, 100); // config가 설정된 후 스크립트 로드
    }

    return () => {
      // cleanup
      const elements = document.querySelectorAll(
        "script, #dify-chatbot-bubble-button"
      );
      elements.forEach((element) => element.remove());
      if (window.difyChatbotConfig) {
        delete window.difyChatbotConfig;
      }
    };
  }, [isProductDetail, productInfo]);

  return (
    <ProductContext.Provider value={{ productInfo, setProductInfo }}>
      {children}
    </ProductContext.Provider>
  );
}
