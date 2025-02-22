import dotenv from "dotenv";

dotenv.config();

import { MongoClient } from "mongodb";
import { get_embedding } from "./openai";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI가 설정되지 않았습니다.");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // 개발 환경에서는 전역 변수를 사용하여 연결 재사용
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // 프로덕션 환경에서는 새로운 연결
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export { clientPromise };

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
}

// const client = new MongoDBClient();

// client.vector_search("몸에 좋은 비타민이 들어간 건강한 음식").then((res) => console.log(res));
