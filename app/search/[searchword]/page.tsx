"use client";

import { usePathname } from "next/navigation"

import { useEffect, useState } from "react";
import HeaderSearch from "@/components/HeaderSearch";

export default function SearchPage() {
  // In a real app, fetch product data based on params.id

  const path = usePathname()
  const searchword: any = path.match(/\/search\/(.+)/);

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    setKeyword(searchword[1])
  }, [path])

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
       <HeaderSearch searchword={keyword} />
      </div>
    </div>
  )
}

