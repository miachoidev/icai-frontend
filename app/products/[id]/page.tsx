"use client";

import { BASE_URL } from "@/lib/request";
import { Product } from "@/types/Product";
import { useState, useEffect, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { ProductContext } from "./layout";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { setProductInfo } = useContext(ProductContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetched = await fetch(`${BASE_URL}/api/products/${params.id}`);
        const data = await fetched.json();
        setProduct(data);
        setProductInfo(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, setProductInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl relative">
        {/* 메인 제품 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-6">
            {/* 왼쪽 이미지 */}
            <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Image src={product.image} alt={product.PRODUCT} width={120} height={120} className="object-cover" />
            </div>
            {/* 오른쪽 제품 정보 */}
            <div className="flex-grow">
              <div className="text-sm text-gray-600 mb-1">{product.TYPE}</div>
              <div className="text-sm text-gray-600 mb-2">{product.ENTRPS}</div>
              <h1 className="text-2xl font-bold mb-2">{product.PRODUCT}</h1>
              <div className="text-lg font-semibold text-blue-600">
                {product.price?.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>

        {/* 탭 섹션 */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="details">상세정보</TabsTrigger>
            <TabsTrigger value="reviews">리뷰</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="space-y-6">
              {/* 영양 정보 카드 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">영양 정보</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600">칼로리</p>
                    <p className="font-medium">{product.KCAL}kcal</p>
                  </div>
                  <div>
                    <p className="text-gray-600">탄수화물</p>
                    <p className="font-medium">{product.CARBO}g</p>
                  </div>
                  <div>
                    <p className="text-gray-600">단백질</p>
                    <p className="font-medium">{product.PROT}g</p>
                  </div>
                  <div>
                    <p className="text-gray-600">지방</p>
                    <p className="font-medium">{product.FAT}g</p>
                  </div>
                  <div>
                    <p className="text-gray-600">당류</p>
                    <p className="font-medium">{product.SUGAR}g</p>
                  </div>
                  <div>
                    <p className="text-gray-600">나트륨</p>
                    <p className="font-medium">{product.SO}mg</p>
                  </div>
                </div>
              </div>

              {/* 원재료 정보 카드 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">원재료 정보</h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.RAWMTRL_NM}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-center">
                아직 작성된 리뷰가 없습니다.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
