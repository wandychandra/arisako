import OpenAI from "openai";

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("Missing OPENROUTER_API_KEY environment variable");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const AI_MODEL =
  process.env.OPENROUTER_MODEL ||
  "mistralai/mistral-7b-instruct:free";
