import dotenv from "dotenv";

dotenv.config();

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const EMBEDDING_MODEL = "text-embedding-3-small";

export async function get_embedding(text: string) {
  if (!text || typeof text !== "string") {
    return null;
  }

  try {
    const embedding = await openai.embeddings.create({
      input: text,
      model: EMBEDDING_MODEL,
    });
    return embedding.data[0].embedding;
  } catch (error) {
    console.error("Error in get_embedding:", error);
    return null;
  }
}

export async function get_chat_completion(messages: any[]): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });
  return completion.choices[0].message.content!;
}