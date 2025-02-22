import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pillyze - Supplement Store",
  description: "Find the right supplements for your needs",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Dify 설정 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.difyChatbotConfig = {
                token: 'BqyHPFOXfJ5Mm6zI'
              }
            `,
          }}
        />

        {/* Dify 임베드 스크립트 */}
        <script
          src="https://udify.app/embed.min.js"
          id="BqyHPFOXfJ5Mm6zI"
          defer
        />

        {/* Dify 스타일 */}
        <style>
          {`
            #dify-chatbot-bubble-button {
              background-color: #1C64F2 !important;
            }
            #dify-chatbot-bubble-window {
              width: 24rem !important;
              height: 40rem !important;
            }
          `}
        </style>
      </head>
      <body className={inter.className}>
        <Header />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
