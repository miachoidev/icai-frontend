"use client";

import { Button } from "@/components/ui/button";

export default function DifyChatButton() {
  return <Button
  className="w-full"
  size="lg"
  onClick={() => {
    // 챗봇 버튼 클릭 시 Dify 챗봇 창 열기
    const chatButton = document.querySelector(
      "#dify-chatbot-bubble-button"
    ) as HTMLElement;
    console.log("CHAT BUTTON!", chatButton);
    if (chatButton) {
      chatButton.click();
    }
  }}
>
  챗봇과 대화하기
</Button>
}