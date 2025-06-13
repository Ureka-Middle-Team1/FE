import { PlanSelectionInput, PlanSelectionOutput } from "@type/Chat";

// 구독 서비스 관련 선호도와 Smart Choice API 조회 결과에 대해 분기 처리를 진행하는 selectPlanStrategy
export function selectPlanStrategy({
  smartChoicePlans,
  subscribe,
}: PlanSelectionInput): PlanSelectionOutput {
  // 경우 1 - smartChoice로 받아온 게 아무것도 없고, 구독 서비스도 희망하지 않는 경우
  if (smartChoicePlans.length === 0 && subscribe === "NONE")
    return { type: "FALLBACK" };

  // 경우 2 - smartChoice로 받아온 게 아무것도 없고, 구독 서비스는 희망하는 경우
  if (smartChoicePlans.length === 0 && subscribe !== "NONE")
    return { type: "SUBSCRIBE_MATCH", subscribe };

  // 경우 3 - smartChoice로 받아온 게 존재하고, 구독 서비스는 희망하지 않는 경우
  if (smartChoicePlans.length > 0 && subscribe === "NONE")
    return { type: "SMART_CHOICE_ONLY", smartChoicePlans: smartChoicePlans };

  // 경우 4 - smartChoice로 받아온 게 존재하면서, 구독 서비스도 희망하는 경우
  if (smartChoicePlans.length > 0 && subscribe !== "NONE")
    return {
      type: "SUBSCRIBE_MATCH",
      smartChoicePlans: smartChoicePlans,
      subscribe,
    };

  return { type: "FALLBACK" };
}
