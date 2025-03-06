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
		"price": 31598,
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
	"price": 36690,
	"image": "/img/랠리카카오.jpg"
},
{
	"_id": "67bc4cb01e822eecff53c373",
	"PRODUCT": "슬림플래닛 차전자피 식이섬유 더비움",
	"ENTRPS": "에이치엔웨이",
	"RAWMTRL_NM": "차전자피식이섬유(고시형), 프락토올리고당(고시형), 기타가공품, 복숭아맛분말, 복숭아향분말, 구연산, 유청칼슘, 요거트향분말, 효소처리스테비아, 유산균배양건조물, 곡물발효효소분말, 서양자두분말, 파인애플추출분말, 수크랄로스",
	"KCAL": 100,
	"CARBO": 88,
	"PROT": 2,
	"FAT": 0.5,
	"SUGAR": 0,
	"SO": 5,
	"T_FAT": 0,
	"S_FAT": 0.1,
	"CHOL": 0,
	"CATEGORY2": "슬림",
	"price": 3767,
	"image": "/img/슬림플래닛.jpg"
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
	"price": 18496,
	"image": "/img/굽네만두.jpg"
},
{
	"_id": "67bc4cb01e822eecff53c399",
	"PRODUCT": "애플 사이다 비니거 클렌즈 슬림",
	"ENTRPS": "(주)한풍네이처팜",
	"RAWMTRL_NM": "아세설팜칼륨, 수크랄로스, 향료, 구연산삼나트륨, 과.채가공품, 알룰로오스, 정제수, 발효식초",
	"KCAL": 15,
	"CARBO": 0,
	"PROT": 0,
	"FAT": 0,
	"SUGAR": 0,
	"SO": 5,
	"T_FAT": 0,
	"S_FAT": 0,
	"CHOL": 0,
	"CATEGORY2": "슬림",
	"price": 3557,
	"image": "/img/애플사이다.jpg"
},
{
	"_id": "67bc4cb01e822eecff53c48d",
	"PRODUCT": "부스트 아르기닌 6200",
	"ENTRPS": "주식회사 한국고려홍삼",
	"RAWMTRL_NM": "타우린, 건조효모, 글루콘산아연, 수크랄로스, L-아스파트산, 오르니틴염산염, 과.채가공품, 효소처리스테비아, 합성향료, 세븐베리농축액, 덱스트린, 구연산(무수), L-아르지닌, 정제수, 과.채가공품, 기타가공품, 혼합제제",
	"KCAL": 300,
	"CARBO": 20,
	"PROT": 60,
	"FAT": 2,
	"SUGAR": 0,
	"SO": 100,
	"T_FAT": 0,
	"S_FAT": 0.5,
	"CHOL": 0,
	"CATEGORY2": "아르기닌",
	"price": 23466,
	"image": "/img/아르기닌8.JPG"
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