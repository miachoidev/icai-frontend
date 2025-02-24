"use client";

import { usePathname } from "next/navigation"

import VectorList from "@/components/CategorySearch"

export default function SearchPage() {
  // In a real app, fetch product data based on params.id

  const path = usePathname()
  const searchword: any = path.match(/\/search\/(.+)/);

  // console.log(searchword[1])

  const product = {
    id: 1,
    name: "살펜다 혈당컷 다이어트",
    brand: "한국건강",
    rating: 4.51,
    reviews: 139,
    image: "/placeholder.svg",
    tags: ["단백질 대사", "체지방 감소"],
    description: "만족 수 있는 브랜드 스토어에서",
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-8 lg:grid-cols-2">
       <VectorList searchword={searchword[1]} />
      </div>
    </div>
  )
}

