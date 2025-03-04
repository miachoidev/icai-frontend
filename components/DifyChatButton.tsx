"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import pako from "pako";

interface DifyChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatbotId: string;
  inputs: string;
}

const DifyChatModal = ({
  isOpen,
  onClose,
  chatbotId,
  inputs,
}: DifyChatModalProps) => {
  if (!isOpen) return null;
  if (!inputs) return null; // inputs가 없으면 모달을 렌더링하지 않음

  console.log("original inputs:", inputs);

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(inputs);

    // gzip 압축
    const compressed = pako.gzip(data);

    // Base64 인코딩
    const encodedValue = btoa(
      String.fromCharCode.apply(null, Array.from(compressed))
    );
    // Base64 인코딩 (안전한 방법)
    // const encodedValue = btoa(
    //   new Uint8Array(compressed).reduce(
    //     (data, byte) => data + String.fromCharCode(byte),
    //     ""
    //   )
    // );

    // URL에서 깨지지 않도록 추가 인코딩
    const urlSafeEncodedValue = encodeURIComponent(encodedValue);

    // console.log("encodedValue:", encodedValue);

    const iframeUrl = `https://065e-58-230-178-34.ngrok-free.app/chatbot/${chatbotId}?product=${urlSafeEncodedValue}`;
    console.log("final URL:", iframeUrl);

    return (
      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          width: "500px",
          height: "700px",
          // backgroundColor: "rgb(248 248 255)",
          border: "1px solid #E6E9ED",
          boxShadow: "0px 2px 10px rgba(70, 56, 147, 0.1)",
          borderRadius: "10px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: "5px",
            top: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#463893",
            zIndex: 1,
          }}
        >
          ×
        </button>
        <iframe
          src={iframeUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "10px",
          }}
          allow="microphone"
        />
      </div>
    );
  } catch (error) {
    console.error("Error encoding inputs:", error);
    return null;
  }
};

interface ChatButtonProps {
  chatbotId: string;
  imagePath: string;
  imageAlt: string;
  tooltipText: string;
  inputs: string;
  // inputs?: string;
}

export const DifyChatButton = ({
  chatbotId,
  imagePath,
  imageAlt,
  tooltipText,
  inputs,
}: ChatButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // 초기 로드 시 말풍선 애니메이션
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000); // 5초 후 사라짐

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          right: "30px",
          bottom: chatbotId === "sOdLG3fHDRrpvfzR" ? "30px" : "150px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 999,
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* 말풍선 */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            padding: "8px 12px",
            borderRadius: "20px",
            border: "1px solid #E6E9ED",
            boxShadow: "0px 2px 10px rgba(70, 56, 147, 0.1)",
            position: "relative",
            fontSize: "14px",
            color: "white",
            whiteSpace: "nowrap",
            marginRight: "5px",
            opacity: showTooltip ? 1 : 0,
            transform: showTooltip
              ? "translateX(0) scale(1)"
              : "translateX(20px) scale(0.95)",
            transition: "all 0.3s ease-in-out",
            pointerEvents: showTooltip ? "auto" : "none",
          }}
        >
          {tooltipText}
          {/* 말풍선 꼬리 */}
          <div
            style={{
              position: "absolute",
              right: "-5px",
              top: "50%",
              width: "10px",
              height: "10px",
              backgroundColor: "#1A1A1A",
              border: "1px solid #E6E9ED",
              borderLeft: "none",
              borderBottom: "none",
              transform: "translateY(-50%) rotate(45deg)",
              transition: "opacity 0.3s ease-in-out",
              opacity: showTooltip ? 1 : 0,
            }}
          />
        </div>

        {/* 버튼 */}
        <button
          className="chat-button"
          onClick={() => setIsModalOpen(true)}
          style={{
            width: "100px",
            height: "100px",
            padding: "3px",
            borderRadius: "50%",
            border: "1px solid #E6E9ED",
            cursor: "pointer",
            boxShadow: "0px 2px 10px rgba(70, 56, 147, 0.1)",
            overflow: "hidden",
            backgroundColor: "white",
            transition: "all 0.3s ease-in-out",
            transform: showTooltip ? "scale(1.05)" : "scale(1)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Image
              src={imagePath}
              alt={imageAlt}
              width={84}
              height={84}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </button>
      </div>
      <DifyChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chatbotId={chatbotId}
        inputs={inputs}
      />
    </>
  );
};
