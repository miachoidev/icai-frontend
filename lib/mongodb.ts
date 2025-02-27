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

function imgByCategory2(category: string) {
  const name =  productImages[category as keyof typeof productImages][Math.floor(Math.random() * productImages[category as keyof typeof productImages].length)]
  return `/img/${name}`
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

  async getRecords(limit: number, afterId?: ObjectId): Promise<Product[]> {
    const collection = await this.getCollection(
      "sample_jinho",
      "food_collection2"
    );
    const results = await collection
      .find<Product>({
        ...(afterId ? { _id: { $gt: afterId } } : {}),
      })
      .sort({ _id: 1 })
      .limit(limit)
      .toArray();
    results.forEach(i => {
      i.image = imgByCategory2(i.CATEGORY2)
    })
    return results;
  }

  async getProduct(id: string): Promise<Product | null> {
    const collection = await this.getCollection(
      "sample_jinho",
      "food_collection2"
    );
    const result = await collection.findOne<Product>({ _id: new ObjectId(id) });
    if (result) {
      result.image = imgByCategory2(result.CATEGORY2)
    }
    return result;
  }
}

export const mongoClient = new MongoDBClient();
