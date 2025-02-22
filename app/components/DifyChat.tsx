"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function DifyChat() {
  useEffect(() => {
    // Dify 설정을 useEffect 내부로 이동
    window.difyChatbotConfig = {
      token: "BqyHPFOXfJ5Mm6zI",
    };
  }, []);

  return (
    <>
      <Script
        id="dify-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              window.difyChatbotConfig = {
                token: 'BqyHPFOXfJ5Mm6zI'
              }
            }
          `,
        }}
      />

      <Script
        src="https://udify.app/embed.min.js"
        id="BqyHPFOXfJ5Mm6zI"
        strategy="afterInteractive"
      />

      <style jsx global>{`
        #dify-chatbot-bubble-button {
          background-color: #1c64f2 !important;
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 9999 !important;
        }
        #dify-chatbot-bubble-window {
          width: 24rem !important;
          height: 40rem !important;
          position: fixed !important;
          bottom: 100px !important;
          right: 20px !important;
          z-index: 9999 !important;
        }
      `}</style>
    </>
  );
}
