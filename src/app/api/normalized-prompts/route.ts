// 사용자 응답을 Normalize(정규화) 하는 함수
import { NextResponse } from "next/server";
import { client } from "@/lib/axiosInstance";
import { getPrompt } from "@/lib/chat/getPrompt";

export async function POST(req: Request) {
  const { message, questionId } = await req.json();

  if (!message || typeof questionId !== "number") {
    return NextResponse.json(
      { error: "message 또는 questionId 누락" },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API 키 누락" }, { status: 500 });
  }

  const url = "https://api.openai.com/v1/chat/completions";

  try {
    const systemPrompt = await getPrompt(questionId); // 해당하는 system prompt를 가져온다 (넘겨받은 quesitonId 활용)
    const response = await client.post(
      url,
      {
        model: "gpt-4.1-nano",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const normalizedValue =
      response.data?.choices?.[0]?.message?.content?.trim() ?? "INVALID";

    console.log("정규화 결과: ", normalizedValue);

    return NextResponse.json({ normalizedValue });
  } catch (error) {
    console.error("❌ normalizeUserPrompt 처리 중 오류:", error);
    return NextResponse.json({ error: "GPT 호출 실패" }, { status: 500 });
  }
}
