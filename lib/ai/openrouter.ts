// lib/openrouter.ts
import OpenAI from "openai";

const apiKey = process.env.OPENROUTER_API_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

if (!apiKey) {
  throw new Error("OPENROUTER_API_KEY is not defined in .env.local");
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey,
  defaultHeaders: {
    "HTTP-Referer": siteUrl,
    "X-Title": "My AI App",
  },
});

export const getAIResponse = async (userPrompt: string): Promise<string | null> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-nano-12b-v2-vl:free",
      messages: [{ role: "user", content: userPrompt }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error connecting to OpenRouter:", error);
    throw new Error("Failed to fetch response from AI");
  }
};
