// lib/chatbot/mapTendencyData.ts

import { UserTendencyInfo } from "@/types/userTendencyInfo";

// 특정 질문에 대해서 어떤 어떤 데이터로 변환할 지 mapTendencyData()로 결정
export function mapTendencyData(
  questionId: number,
  normalized: string,
  prevState: UserTendencyInfo
): Partial<UserTendencyInfo> {
  const patch: Partial<UserTendencyInfo> = { ...prevState };

  switch (questionId) {
    case 2:
      if (normalized === "YES") patch.data = "60000";
      break;
    case 3:
      if (normalized === "YES") patch.data = "999999";
      break;
    case 4:
      if (!isNaN(Number(normalized))) patch.data = normalized;
      else if (normalized === "IDONTKNOW") {
        if (!prevState.data || prevState.data === "") patch.data = "30000";
      }
      break;
    case 5:
      if (normalized === "YES") {
        const original = Number(prevState.data || 0);
        patch.data = String(original * 2);
      }
      break;
    case 6:
      if (normalized === "YES") {
        const original = Number(prevState.data || 0);
        patch.data = String(Math.floor(original / 2));
      }
      break;
    case 7:
      if (normalized === "YES") {
        patch.voice = "999999";
        patch.sms = "999999";
      } else if (normalized === "NO") {
        patch.voice = "1000";
        patch.sms = "1000";
      } else {
        patch.voice = "300";
        patch.sms = "300";
      }
      break;
    case 8:
      if (!isNaN(Number(normalized))) patch.age = normalized;
      break;
    case 9:
      if (!isNaN(Number(normalized))) patch.type = normalized;
      break;
    case 10:
      if (!isNaN(Number(normalized))) patch.dis = normalized;
      break;
    case 12:
      if (normalized !== "INVALID") patch.subscribe = normalized;
    default:
      break;
  }

  return patch; // 각 질문에 대해 설정한 data로 patch 후, 그 값을 return
}
