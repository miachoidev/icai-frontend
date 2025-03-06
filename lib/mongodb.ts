import dotenv from "dotenv";

dotenv.config();

import { MongoClient, ObjectId } from "mongodb";
import { get_embedding } from "./openai";
import { Product } from "@/types/Product";

const productImages = {
  '곤약': ['곤약1.jpg', '곤약2.JPG', '곤약3.JPG', '곤약4.JPG', '곤약5.JPG', '곤약6.JPG', '곤약7.JPG', '곤약8.JPG', '곤약9.JPG', '곤약10.jpg'],
  '다이어트': ['다이어트1.jpg', '다이어트2.jpeg', '다이어트3.avif', '다이어트4.png', '다이어트5.jpg', '다이어트6.jpg', '다이어트7.jpg', '다이어트8.avif', '다이어트9.jpg', '다이어트10.jpg'],
  '닭가슴살': ['닭가슴살1.jpg', '닭가슴살2.jpg', '닭가슴살3.jpg', '닭가슴살4.jpg', '닭가슴살5.jpg', '닭가슴살6.JPG', '닭가슴살7.JPG', '닭가슴살8.JPG', '닭가슴살9.JPG', '닭가슴살10.JPG'],
  '쉐이크': ['쉐이크1.jpg', '쉐이크2.png', '쉐이크3.jpeg', '쉐이크4.jpeg', '쉐이크5.jpeg', '쉐이크6.jpeg', '쉐이크7.jpg', '쉐이크8.JPG', '쉐이크9.JPG', '쉐이크10.JPG'],
  '슬리밍': ['슬리밍1.png', '슬리밍2.jpg', '슬리밍3.jpg', '슬리밍4.jpg', '슬리밍5.jpg', '슬리밍6.jpg', '슬리밍7.jpg', '슬리밍8.jpg', '슬리밍9.jpg', '슬리밍10.jpg'],
  '슬림': ['슬림1.jpg', '슬림2.jpg', '슬림3.jpg', '슬림4.jpg', '슬림5.jpg', '슬림6.jpg', '슬림7.jpg', '슬림8.jpg', '슬림9.jpg', '슬림10.jpg'],
  '아르기닌': ['아르기닌1.JPG', '아르기닌2.JPG', '아르기닌3.JPG', '아르기닌4.JPG', '아르기닌5.JPG', '아르기닌6.JPG', '아르기닌7.JPG', '아르기닌8.JPG', '아르기닌9.JPG', '아르기닌10.JPG'],
  '칼로리': ['칼로리1.jpg', '칼로리2.jpg', '칼로리3.jpg', '칼로리4.jpg', '칼로리5.jpg', '칼로리6.jpeg', '칼로리7.jpg', '칼로리8.jpg', '칼로리9.jpg', '칼로리10.jpg'],
  '프로틴': ['프로틴1.JPG', '프로틴2.JPG', '프로틴3.JPG', '프로틴4.JPG', '프로틴5.JPG', '프로틴6.JPG', '프로틴7.JPG', '프로틴8.JPG', '프로틴9.JPG', '프로틴10.JPG'],
  '효소': ['효소1.JPG', '효소2.JPG', '효소3.JPG', '효소4.JPG', '효소5.JPG', '효소6.JPG', '효소7.JPG', '효소8.jpg', '효소9.JPG', '효소10.JPG'],
}

const IMAGE_MAP: {[k: string]: string} = {}

function imgByCategory2(product: string, category: string) {
  if (IMAGE_MAP[product]) {
    return IMAGE_MAP[product]
  }
  const name =  productImages[category as keyof typeof productImages][Math.floor(Math.random() * productImages[category as keyof typeof productImages].length)]
  const image =  `/img/${name}`
  IMAGE_MAP[product] = image
  return image
}

class MongoDBClient {
  client: MongoClient;

  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI!);
    this.onInit();
  }

  async onInit() {
    await this.client.connect();
  }

  async getDatabase(databaseName: string) {
    return this.client.db(databaseName);
  }

  async getCollection(databaseName: string, collectionName: string) {
    const db = await this.getDatabase(databaseName);
    return db.collection(collectionName);
  }

  async vector_search(user_query: string) {
    const collection = await this.getCollection(
      "sample_jinho",
      "food_collection2"
    );

    const query_embedding = await get_embedding(user_query);
    if (!query_embedding) {
      return "Invalid query or embedding generation failed.";
    }

    const pipeline = [
      {
        $vectorSearch: {
          index: "index_jinho2",
          queryVector: query_embedding,
          path: "embedded",
          numCandidates: 150,
          limit: 5,
        },
      },
      {
        $project: {
          _id: 0,
          embedded: 0,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ];

    const results = await collection.aggregate(pipeline).toArray();
    return results;
  }

  async getRecords(limit: number, afterId?: ObjectId, category2?: string): Promise<Product[]> {
    const collection = await this.getCollection(
      "sample_jinho",
      "food_collection2"
    );
    const results = await collection
      .find<Product>({
        ...(afterId ? { _id: { $gt: afterId } } : {}),
        ...(category2 ? {CATEGORY2: category2} : {}),
				REGIST_DT: { $gt: 20240000 } // 2024년 이후 데이터만 조회
      })
      .sort({ _id: 1 })
      .limit(limit)
      .toArray();
    results.forEach(i => {
      i.image = imgByCategory2(i.PRODUCT, i.CATEGORY2 || "")
    })
    return results;
  }

  async getRecentRecords(limit: number, afterId?: ObjectId, category2?: string, productPattern?: string[], excludePatterns?: string[], productIds?: string[]): Promise<Product[]> {
    const collection = await this.getCollection(
      "sample_jinho",
      "food_collection2"
    );

    // 쿼리 조건 구성
    const query: any = {
      ...(afterId ? { _id: { $gt: afterId } } : {}),
      ...(category2 ? {CATEGORY2: category2} : {}),
      REGIST_DT: { $gt: 20240000 },
			TYPE: { $not: { $regex: "건강기능식품", $options: 'i' } }
    };

    // productIds가 있는 경우 완전 일치 OR 조건 추가 (_id 필드 기준)
    if (productIds && productIds.length > 0) {
      try {
        // 문자열 ID를 ObjectId로 변환
        const objectIds = productIds.map(id => new ObjectId(id));
        query._id = { $in: objectIds }; // 완전 일치 OR 조건
      } catch (error) {
        console.error("ObjectId 변환 오류:", error);
        // 오류가 발생해도 계속 진행 (잘못된 ID는 무시)
      }
    }
    // PRODUCT 필드에 대한 조건 처리 (productIds가 없는 경우에만 적용)
    else if (productPattern && productPattern.length > 0 && excludePatterns && excludePatterns.length > 0) {
      // 포함 패턴 리스트와 제외 패턴 리스트가 모두 있는 경우
      const excludeConditions = excludePatterns.map(pattern => ({ 
        PRODUCT: { $not: { $regex: pattern, $options: 'i' } } 
      }));
      
      // 포함 패턴 리스트 중 하나라도 일치하는 조건 (OR 조건)
      const includeCondition = {
        $or: productPattern.map(pattern => ({
          PRODUCT: { $regex: pattern, $options: 'i' }
        }))
      };
      
      query.$and = [
        includeCondition,
        ...excludeConditions
      ];
    } else if (productPattern && productPattern.length > 0) {
      // 포함 패턴 리스트만 있는 경우 (OR 조건)
      query.$or = productPattern.map(pattern => ({
        PRODUCT: { $regex: pattern, $options: 'i' }
      }));
    } else if (excludePatterns && excludePatterns.length > 0) {
      // 제외 패턴만 있는 경우
      const excludeConditions = excludePatterns.map(pattern => ({ 
        PRODUCT: { $not: { $regex: pattern, $options: 'i' } } 
      }));
      
      query.$and = excludeConditions;
    }

    // REGIST_DT가 숫자 형태이므로 20240000보다 큰 값을 찾음
    const results = await collection
      .find<Product>(query)
      .sort({ REGIST_DT: -1 }) // REGIST_DT 기준으로 내림차순 정렬 (큰 값이 먼저 나오도록)
      .project<Product>({ 
				embedded: 0, 
				TEXT: 0,
				// KCAL: 0,
				// CARBO: 0,
				// PROT: 0,
				// FAT: 0,
				// SO: 0,
				// price: 0,
				// RAWMTRL_NM: 0,
				// T_FAT: 0,
				// SUGAR: 0,
				// S_FAT: 0,
				// CHOL: 0,
				// ENTRPS: 0,
				

				

			 }) // embedded와 TEXT 필드 제외
      .limit(limit)
      .toArray();
    
    console.log("MongoDB 쿼리 결과:", {
      count: results.length,
      firstItem: results.length > 0 ? {
        _id: results[0]._id.toString(),
        PRODUCT: results[0].PRODUCT,
        REGIST_DT: (results[0] as any).REGIST_DT
      } : null
    });
    
    results.forEach(i => {
      i.image = imgByCategory2(i.PRODUCT, i.CATEGORY2 || "")
    });
    
    return results;
  }

  async getProduct(id: string): Promise<Product | null> {
    const collection = await this.getCollection(
      "sample_jinho",
      "food_collection2"
    );
    const result = await collection.findOne<Product>({ _id: new ObjectId(id) });
    if (result) {
      result.image = imgByCategory2(result.PRODUCT, result.CATEGORY2 || "")
    }
    return result;
  }
}

export const mongoClient = new MongoDBClient();
