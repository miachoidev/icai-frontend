"use client";

import { usePathname } from "next/navigation"

import CategoryList from "@/components/CategorySearch"
import { useEffect, useState } from "react";

export default function SearchPage() {
  // In a real app, fetch product data based on params.id

  const path = usePathname()
  const searchword: any = path.match(/\/search\/(.+)/);

  const [category, setCategory] = useState('')

  const matchCategory = (x: string) => {
    switch(x) {
      case 'diet':
        return '다이어트'
      case 'slimming':
        return '슬리밍'
      case 'slim':
        return '슬림'
      case 'kcal':
        return '칼로리'
      case 'chicken':
        return '닭가슴살'
      case 'shake':
        return '쉐이크'
      case 'gonyak':
        return '곤약'
      case 'protein':
        return '프로틴'
      case 'arginine':
        return '아르기닌'
      case 'enzyme':
        return '효소'
      default:
        return '다이어트'
    }
  }

  useEffect(() => {
    const category2 = matchCategory(searchword[1])
    setCategory(category2)
  }, [path])

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
       <CategoryList searchword={category} />
      </div>
    </div>
  )
}

