"use client";

import { useEffect } from "react";
declare global {
  interface Window {
    difyChatbotConfig: {
      token: string;
    };
  }
}

export default function DifyChat() {
  useEffect(() => {
    // 이미 존재하는 스크립트 확인
    const existingScript = document.getElementById("r2wQBv2jAmabMXbv");
    if (existingScript) {
      return;
    }

    // Dify 설정
    window.difyChatbotConfig = {
      token: "BqyHPFOXfJ5Mm6zI", // 여기에 Dify에서 받은 실제 토큰을 넣어주세요
    };

    // 스크립트 추가
    const script = document.createElement("script");
    script.src = "https://udify.app/embed.min.js"; // 이 URL이 올바른지 확인해주세요
    script.id = "BqyHPFOXfJ5Mm6zI";
    script.defer = true;
    document.body.appendChild(script);

    // 스타일 추가
    const style = document.createElement("style");
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
        z-index: 9999 !important;
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        z-index: 9999 !important;
        position: fixed !important;
        bottom: 100px !important;
        right: 20px !important;
      }
    `;
    document.head.appendChild(style);

    // 클린업
    return () => {
      const scriptToRemove = document.getElementById("r2wQBv2jAmabMXbv");
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
}
