import dotenv from "dotenv";

dotenv.config();

import { MongoClient, ObjectId } from "mongodb";
import { get_embedding } from "./openai";
import { Product } from "@/types/Product";

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
    const collection = await this.getCollection("sample_jinho", "food_collection2");

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
    const collection = await this.getCollection("sample_jinho", "food_collection2");
    const results = await collection.find<Product>({
      ...(afterId ? { _id: { $gt: afterId } } : {}),
    })
      .sort({ _id: 1 })
      .limit(limit)
      .toArray();
    return results;
  }
}

export const mongoClient = new MongoDBClient();

// client.vector_search("몸에 좋은 비타민이 들어간 건강한 음식").then((res) => console.log(res));
