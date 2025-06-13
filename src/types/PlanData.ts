import { Plan } from "./Chat";

// Smart Choice API 응답 시 받는 자료형
export interface PlanDBApiResponse {
  id: number;
  name: string;
  price: number;
  dataAmountGb: number;
  overageSpeedMbps: number | null;
  voiceMinutes: number;
  smsIncluded: boolean;
  networkType: "LTE" | "5G";
  subscriptionServices: string[];
}

export type PlanSelectionInput = {
  smartChoicePlans: Plan[];
  subscribe: string;
};

export type PlanSelectionOutput = {
  type: "SMART_CHOICE_ONLY" | "SUBSCRIBE_MATCH" | "FALLBACK";
  smartChoicePlans?: Plan[]; // Smart Choice로 받아온 것은 없을 수도 있다
  subscribe?: string; // 구독 서비스에 대해 받아온 정보 또한 없을 수도 있다
};
