// DB에 저장되어 있는 plan 테이블에서 user로부터 입력 받은 정보를 바탕으로 구독제 요금 혜택이 포함된 요금제를 찾아보는 api
import { NextRequest, NextResponse } from "next/server";
import { selectPlanStrategy } from "@/lib/chat/selectPlanStrategy";
import { queryBySubscribe } from "@/lib/chat/queryBySubscribe";

export async function POST(req: NextRequest) {
  // 1. 받아온 req에 대해서 json으로 파싱
  const { plans, subscribe } = await req.json();

  // 2. 분기 전략 고르기 (해당 로직은 selectPlanStrategy에서..)
  const strategy = selectPlanStrategy({
    smartChoicePlans: plans,
    subscribe,
  });

  // 3. 받아온 strategy 값에 따라 동작 수행 (DB, 외부 API 포함)
  switch (strategy.type) {
    case "FALLBACK":
    //TODO: 사용자들이 가장 많이 추천받은 요금제 top3 출력 (”홈화면”에서 사용하는 api 똑같이 사용해서 띄울 예정)
    case "SMART_CHOICE_ONLY":
      return NextResponse.json(plans.slice(0, 2)); // smart choice api 요청 결과 중 최대 2개만 return (여기는 RawPlan[]으로 리턴)
    case "SUBSCRIBE_MATCH":
      const results = await queryBySubscribe({
        smartChoicePlans: strategy.smartChoicePlans,
        subscribe: strategy.subscribe,
      });
      if (results.length > 0) {
        // results 값이 존재하는 경우
        NextResponse.json(results);
      } else {
        //TODO: 사용자들이 가장 많이 추천받은 요금제 top3 출력 (”홈화면”에서 사용하는 api 똑같이 사용해서 띄울 예정)
      }
  }
}
