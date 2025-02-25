"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  productInfo: any;
  onClose?: () => void;
}

export default function ChatInterface({
  productInfo,
  onClose,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user" as const, content: input },
    ];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          productInfo,
        }),
      });

      const data = await response.json();

      setMessages([
        ...newMessages,
        { role: "assistant" as const, content: data.message },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-96 h-[600px] bg-white border rounded-lg shadow-lg m-4 flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-bold">핏블리 채팅</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-500">핏블리가 답변을 작성중입니다...</div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-2 border rounded"
            placeholder="메시지를 입력하세요..."
          />
          <Button onClick={sendMessage} disabled={isLoading}>
            전송
          </Button>
        </div>
      </div>
    </div>
  );
}
