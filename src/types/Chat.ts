export type MessageType = "text" | "voice" | "summary" | "plan";

// Smart Choice API 응답 시 받는 자료형
export interface Plan {
  v_tel: { _text: string }; // 이동통신사(SKT,KT,LGU+)
  v_plan_price: { _text: string }; // 예상 금액
  v_dis_price: { _text: string }; // 약정 할인 금액
  v_plan_over: { _text: string }; // 기본 제공량 초과 사용량과 금액
  v_add_name: { _text: string }; // 요금제 기본료, 부가서비스 기본료
  v_plan_name: { _text: string }; // 요금제명, 부가서비스명
  v_plan_display_voice: { _text: string }; // 음성 기본 제공량
  v_display_data: { _text: string }; // 데이터 기본 제공량
  v_plan_sms: { _text: string }; // 문자 기본 제공량
  rn: { _text: string }; // 요금제 추천 구분(으뜸: 1, 알뜰: 2, 넉넉: 3)
}

export type PlanSelectionInput = {
  smartChoicePlans: ParsedPlan[];
  subscribe: string;
};

export type PlanSelectionOutput = {
  type: "SMART_CHOICE_ONLY" | "SUBSCRIBE_MATCH" | "FALLBACK";
  smartChoicePlans?: ParsedPlan[]; // Smart Choice로 받아온 것은 없을 수도 있다
  subscribe?: string; // 구독 서비스에 대해 받아온 정보 또한 없을 수도 있다
};

// 최초에 Smart Choice API를 받아올 때, 이처럼 필터링하는 과정이 필요 (불필요한 필드 제거 / smartchoice api에서 호출함)
export function extractRawPlan(plan: Plan): RawPlan {
  return {
    v_plan_name: plan.v_plan_name,
    v_plan_display_data: plan.v_display_data,
    v_plan_display_voice: plan.v_plan_display_voice,
    v_plan_display_sms: plan.v_plan_sms,
    v_add_name: plan.v_add_name,
    v_plan_price: plan.v_plan_price,
    v_tel: plan.v_tel,
  };
}

export type Message = {
  id?: string;
  role: "user" | "bot";
  content: string;
  type?: MessageType; // 기본 "text"
  planData?: ParsedPlan;
};

export type RawPlan = {
  v_plan_name: { _text: string };
  v_plan_display_data: { _text: string };
  v_plan_display_voice: { _text: string };
  v_plan_display_sms: { _text: string };
  v_add_name: { _text: string };
  v_plan_price: { _text: string };
  v_tel: { _text: string };
};

export type ParsedPlan = {
  name: string;
  data: string;
  voice: string;
  sms: string;
  price: string;
  tel: string;
};

// 해당 내용은 Smart Choice API 요청 시에 리턴되는 값의 자료형
export type PlanApiResponse = {
  result: RawPlan[];
  success: boolean;
};

// 해당 내용은 챗봇에서 최종 결과를 낼 때 리턴되는 값의 자료형
export type ChatApiResponse = {
  result: ParsedPlan[];
  subscribe: string;
  success: boolean;
};

export function parsePlans(raw: PlanApiResponse): ParsedPlan[] {
  if (!raw.result || !Array.isArray(raw.result)) return [];

  return raw.result.map((item) => ({
    name: item.v_plan_name._text.trim(),
    data: item.v_plan_display_data._text.trim(),
    voice: item.v_plan_display_voice._text.trim(),
    sms: item.v_plan_display_sms._text.trim(),
    price: item.v_add_name._text.trim(),
    tel: item.v_tel._text.trim(),
  }));
}
