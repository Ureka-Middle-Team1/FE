import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/axiosInstance";
import { parseSmartChoiceXml } from "@/lib/parseSmartChoiceXml";
import { extractRawPlan } from "@/types/Chat";
import { RawPlan } from "@/types/Chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("요청하는 친구: ", body);

    const { voice, data, sms, age, type, dis } = body;

    // 프로젝트 root 폴더의 '.env.local' 파일에서 RECOMMENDATION_API_KEY 값을 가져온다 (Client 단에서 해당 동작 불가능, Server Side에서 수행해야 함)
    const RECOMMENDATION_API_KEY = process.env.RECOMMENDATION_API_KEY;
    if (!RECOMMENDATION_API_KEY) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }
    const url = `https://www.smartchoice.or.kr/api/openAPI.xml?authkey=${RECOMMENDATION_API_KEY}&voice=${voice}&data=${data}&sms=${sms}&age=${age}&type=${type}&dis=${dis}`;

    // smartChoice API에 요청
    const response = await client.get(url, {
      headers: { Accept: "application/xml" }, // 해당 경우는 답변이 xml이므로, header 따로 명시 필요 (instance 기본값은 json)
    });
    const xmlData = response.data;
    const result = parseSmartChoiceXml(xmlData); // 파싱

    const rawPlans: RawPlan[] = result.map(extractRawPlan); // RawPlan으로 사용할 수 있도록.. 변환 (일부 필요없는 필드 제거 버전)

    return NextResponse.json({ success: true, rawPlans });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "알 수 없는 오류";
    console.error("요금제 추천 API 오류:", msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
