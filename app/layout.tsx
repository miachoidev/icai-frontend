import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Pick & Chat",
  description: "Pick the products and Chat",
  generator: "v1.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex px-8">
        <Sidebar />
        <div className="w-full px-16">
          <Header />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
