// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAIResponse } from "@/lib/ai/openrouter";

// format request
interface ChatRequestBody {
  prompt: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await getAIResponse(prompt);

    return NextResponse.json({ success: true, data: result });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
