"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

// 클라이언트용 제품 타입 정의
interface ClientProduct {
  _id: string;
  PRODUCT: string;
  ENTRPS: string;
  CATEGORY2?: string;
  price: number;
  image: string;
  KCAL?: number;
  PROT?: number;
}

interface SearchResultsProps {
  searchQuery: string;
  category2?: string;
}

async function searchProducts(query: string, afterId?: string) {
  const limit = 20;
  let url = `/api/search-products?limit=${limit}&query=${encodeURIComponent(query)}`;
  
  if (afterId) {
    url += `&afterId=${afterId}`;
  }
  
  const response = await fetch(url);
  const data = await response.json();
  return data.products || [];
}

export default function SearchResults({ searchQuery, category2 }: SearchResultsProps) {
  const [products, setProducts] = useState<ClientProduct[]>([]);
  const [lastId, setLastId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const { ref, inView } = useInView();

  // 검색어가 변경되면 결과 초기화
  useEffect(() => {
    setProducts([]);
    setLastId(undefined);
    setNoResults(false);
    
    if (searchQuery) {
      loadProducts();
    }
  }, [searchQuery]);

  const loadProducts = async () => {
    if (!searchQuery || loading) return;
    
    setLoading(true);
    try {
      const newProducts = await searchProducts(searchQuery, lastId);
      
      if (newProducts.length === 0 && products.length === 0) {
        setNoResults(true);
      } else if (newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
        setLastId(newProducts[newProducts.length - 1]._id);
      }
    } catch (error) {
      console.error("검색 결과 로딩 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 무한 스크롤
  useEffect(() => {
    if (inView && !loading && products.length > 0) {
      loadProducts();
    }
  }, [inView]);

  if (!searchQuery) {
    return null;
  }

  return (
    <div className="space-y-4">
      {searchQuery && (
        <h3 className="text-xl font-medium mb-4">
          "{searchQuery}" 검색 결과 {products.length > 0 && `(${products.length}개)`}
        </h3>
      )}

      {noResults && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">검색 결과가 없습니다.</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image 
                    src={product.image || "https://via.placeholder.com/300x300"} 
                    alt={product.PRODUCT} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-sm text-muted-foreground">{product.ENTRPS}</div>
                  <h3 className="font-medium leading-tight">{product.PRODUCT}</h3>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      {product.KCAL}kcal · 단백질 {product.PROT}g
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {products.length > 0 && (
        <div ref={ref} className="h-10 flex items-center justify-center">
          {loading && <p className="text-sm text-muted-foreground">로딩 중...</p>}
        </div>
      )}
    </div>
  );
} 