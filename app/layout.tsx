import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pillyze - Supplement Store",
  description: "Find the right supplements for your needs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'