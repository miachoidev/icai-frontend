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
		"_id": "67bc4cb01e822eecff53bb65",
		"PRODUCT": "1am 저당 귀리 곤약김밥 참치마요",
		"ENTRPS": "복을만드는사람들 주식회사 농업회사법인",
		"RAWMTRL_NM": "기타 수산물가공품, 당근, 절임식품, 마늘종, 어묵, 양파, 절임식품, 소스, 김, 참기름, 설탕, 볶은참깨, 가공소금, 양파분말, 후추가루, 향미유, 즉석조리식품",
		"KCAL": 120,
		"CARBO": 18,
		"PROT": 6,
		"FAT": 3,
		"SUGAR": 1,
		"SO": 400,
		"T_FAT": 0,
		"S_FAT": 0.5,
		"CHOL": 10,
		"CATEGORY2": "곤약",
		"price": 4000,
		"image": "/img/1am.jpg"
},
{
	"_id": "67c649257a5116819dfc3e12",
	"PRODUCT": "랠리 프로틴 쉐이크 카카오",
	"ENTRPS": "마음푸드",
	"RAWMTRL_NM": "잔탄검, 정제소금, 효소처리스테비아, 혼합제제, 탈지분유, 고형차, 에리스리톨, 곡류가공품, 난소화성말토덱스트린분말(고시형), 코코아분말, 식물성크림, 유함유가공품, 현미가루, 분리대두단백분말",
	"KCAL": 120,
	"CARBO": 8,
	"PROT": 20,
	"FAT": 2.5,
	"SUGAR": 3,
	"SO": 150,
	"T_FAT": 0,
	"S_FAT": 1,
	"CHOL": 10,
	"CATEGORY2": "쉐이크",
	"price": 3000,
	"image": "/img/랠리카카오.jpg"
},
{
	"_id": "67bc4cb01e822eecff53bf6e",
	"PRODUCT":"간편 한끼 닭가슴살 숯불갈비맛 만두",
	"ENTRPS":"(주)풀그린",
	"RAWMTRL_NM":"닭가슴살, 양파, 밀가루, 대파, 양배추, 닭고기, 소스, 두류가공품, 기타밀가루, 난백액, 참기름, 마늘, 설탕, 건표고버섯, 분리대두단백, 옥수수전분, 기타가공품, 전분가공품, 곡류가공품, 정제소금, 후추가루, 기타 식용유지가공품",
	"KCAL":280.0,
	"CARBO":34.0,
	"PROT":20.0,
	"FAT":7.0,
	"SUGAR":9.0,
	"SO":580.0,
	"T_FAT":0.0,
	"S_FAT":1.9,
	"CHOL":30.0,
	"CATEGORY2":"닭가슴살",
	"price": 26812,
	"image": "/img/아임닭.png"
},
{
	"_id": "67bc4cb01e822eecff53c013",
	"PRODUCT": "굽네 닭가슴살 곤약 새우 만두 오리지널",
	"ENTRPS": "나래식품주식회사",
	"RAWMTRL_NM": "두부, 배추잎, 정제수, 묵류, 혼합제제, 닭가슴살, 후추가루, 혼합제제, 글루코만난, 생강, 정제소금, L-글루탐산나트륨제제, 참기름, 마늘, 설탕, 과.채가공품, 소스, 새우, 돼지지방, 전분가공품, 양파, 대파, 부추, 혼합제제, 혼합제제",
	"KCAL": 100,
	"CARBO": 14,
	"PROT": 10,
	"FAT": 2,
	"SUGAR": 1,
	"SO": 500,
	"T_FAT": 0,
	"S_FAT": 0.5,
	"CHOL": 30,
	"CATEGORY2": "닭가슴살",
	"price": 2425,
	"image": "/img/굽네만두.jpg"
},
{
	"_id":"67bc4cb01e822eecff53c7e3",
	"PRODUCT":"뉴케어 올프로틴 초코맛",
	"ENTRPS":"대상웰라이프주식회사천안2공장",
	"RAWMTRL_NM":"정제수, 분리대두단백, 분리유단백, 옥수수기름(옥배유), 덱스트린, 코코아분말, 구연산칼륨, 향료, 향료, 알룰로오스, 향료, 비타민혼합제제, 기타가공품, 탄산수소나트륨, 수크랄로스, L-아스코브산나트륨, 셀룰로오스혼합제제, 혼합제제, 혼합제제, 카라기난, 카라기난혼합제제, 비타민D3혼합제제, 비타민 A 혼합제제, 비타민B2, L-아르지닌",
	"KCAL":135.0,
	"CARBO":3.0,
	"PROT":25.0,
	"FAT":2.5,
	"SUGAR":0.0,
	"SO":250.0,
	"T_FAT":0.0,
	"S_FAT":0.5,
	"CHOL":8.0,
	"CATEGORY2":"프로틴",
	"price": 2828,
	"image": "/img/뉴케어.png"
},
{
	"_id": "67bc4cb01e822eecff53bfec",
	"PRODUCT":"곰곰 소스 닭가슴살 슬라이스 스파이시커리",
	"ENTRPS":"(주)햇살푸드시스템",
	"RAWMTRL_NM":"포도당, 정제수, 소스, 닭고기, 식품첨가물혼합제제, 복합조미식품, 소스, 유청, 두류가공품, 식품첨가물혼합제제, 산도조절제, 천연향신료",
	"KCAL":131.0,
	"CARBO":11.0,
	"PROT":18.5,
	"FAT":1.4,
	"SUGAR":9.1,
	"SO":890.0,
	"T_FAT":0.0,
	"S_FAT":0.0,
	"CHOL":50.0,
	"CATEGORY2":"닭가슴살",
	"price": 36143,
	"image": "/img/곰곰닭가슴살.png"
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