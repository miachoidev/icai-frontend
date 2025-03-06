"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// 커스텀 상품 타입 정의
interface BestProduct {
  _id: string;
  PRODUCT: string;
  ENTRPS: string;
  RAWMTRL_NM: string;
  KCAL: number;
  CARBO: number;
  PROT: number;
  FAT: number;
  SUGAR: number;
  SO: number;
  T_FAT: number;
  S_FAT: number;
  CHOL: number;
  CATEGORY2: string;
  price: number;
  image: string;
}

// 베스트 상품 데이터 (가짜 데이터)
const bestProducts: BestProduct[] = [
  {
    _id: "67bc4cb01e822eecff53bb53",
    PRODUCT: "100일 유산균 곤약젤리",
    ENTRPS: "주식회사 초록에프앤비(F&B)",
    RAWMTRL_NM: "정제수, 에리스리톨, 혼합제제, 곤약분말, 구연산, 구연산삼나트륨, 요거트분말, 생선콜라겐분말, 젖산칼슘, 합성향료, 수크랄로스, 아세설팜칼륨, 비타민 C, 기타가공품",
    KCAL: 50,
    CARBO: 11,
    PROT: 0.5,
    FAT: 0.1,
    SUGAR: 4,
    SO: 30,
    T_FAT: 0,
    S_FAT: 0.01,
    CHOL: 0,
    CATEGORY2: "곤약",
    price: 20180,
    image: "https://via.placeholder.com/300x300"
  },
  {
    _id: "67bc4cb01e822eecff53bb54",
    PRODUCT: "저칼로리 곤약 쌀",
    ENTRPS: "건강식품 주식회사",
    RAWMTRL_NM: "곤약분말, 정제수, 첨가물",
    KCAL: 30,
    CARBO: 7,
    PROT: 0.3,
    FAT: 0.1,
    SUGAR: 2,
    SO: 20,
    T_FAT: 0,
    S_FAT: 0,
    CHOL: 0,
    CATEGORY2: "곤약",
    price: 15000,
    image: "/img/다이어트1.jpg"
  },
  {
    _id: "67bc4cb01e822eecff53bb55",
    PRODUCT: "곤약 면 파스타",
    ENTRPS: "웰빙푸드",
    RAWMTRL_NM: "곤약분말, 정제수, 첨가물",
    KCAL: 25,
    CARBO: 5,
    PROT: 0.2,
    FAT: 0.1,
    SUGAR: 1,
    SO: 15,
    T_FAT: 0,
    S_FAT: 0,
    CHOL: 0,
    CATEGORY2: "곤약",
    price: 18000,
    image: "https://via.placeholder.com/300x300"
  },
  {
    _id: "67bc4cb01e822eecff53bb56",
    PRODUCT: "다이어트 곤약 젤리",
    ENTRPS: "슬림푸드",
    RAWMTRL_NM: "곤약분말, 정제수, 과일농축액, 첨가물",
    KCAL: 35,
    CARBO: 8,
    PROT: 0.3,
    FAT: 0.1,
    SUGAR: 3,
    SO: 10,
    T_FAT: 0,
    S_FAT: 0,
    CHOL: 0,
    CATEGORY2: "곤약",
    price: 12500,
    image: "https://via.placeholder.com/300x300"
  },
  {
    _id: "67bc4cb01e822eecff53bb57",
    PRODUCT: "곤약 라이스볼",
    ENTRPS: "헬시푸드",
    RAWMTRL_NM: "곤약분말, 정제수, 첨가물",
    KCAL: 40,
    CARBO: 9,
    PROT: 0.4,
    FAT: 0.1,
    SUGAR: 2,
    SO: 25,
    T_FAT: 0,
    S_FAT: 0,
    CHOL: 0,
    CATEGORY2: "곤약",
    price: 16500,
    image: "https://via.placeholder.com/300x300"
  },
  {
    _id: "67bc4cb01e822eecff53bb58",
    PRODUCT: "곤약 쫄면",
    ENTRPS: "다이어트푸드",
    RAWMTRL_NM: "곤약분말, 정제수, 첨가물",
    KCAL: 45,
    CARBO: 10,
    PROT: 0.4,
    FAT: 0.1,
    SUGAR: 3,
    SO: 20,
    T_FAT: 0,
    S_FAT: 0,
    CHOL: 0,
    CATEGORY2: "곤약",
    price: 17800,
    image: "https://via.placeholder.com/300x300"
  }
];

export default function BestProducts() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">베스트 상품</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {bestProducts.map((product) => (
          <Link key={product._id} href={`/products/${product._id}?image=${encodeURIComponent(product.image)}`}>
            <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image src={product.image} alt={product.PRODUCT} fill className="object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-sm text-muted-foreground truncate">{product.ENTRPS}</div>
                  <h3 className="font-medium leading-tight line-clamp-2">{product.PRODUCT}</h3>
                  <div className="font-bold">{product.price.toLocaleString()}원</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 