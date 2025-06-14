import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";
import { useSmartChoiceRecommendation } from "@/hooks/useSmartChoiceRecommendation";

// 요금제 추천 로직과 관련해서 지속적으로 상태를 지켜 보고 있는 useWatchRecommendationTrigger
export function useWatchRecommendationTrigger() {
  const currentQuestionId = useChatStore((state) => state.currentQuestionId);
  const { userTendencyInfo } = useTendencyStore();

  const { mutate: recommendPlan } = useSmartChoiceRecommendation();

  const hasTriggeredRef = useRef(false); // 중복 방지

  useEffect(() => {
    // 정해진 질문 로직에서, 마지막 질문까지 모두 완료해서 끝에 도달했을 경우
    if (currentQuestionId === 13 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;

      // subscribe만 제거한 나머지 필드 추출
      const { subscribe, ...rest } = userTendencyInfo;

      // recommendPlan에는 subscribe 값 제외한 값만 호출, 해당 hook 안에서 구독 서비스까지 호출할 예정
      recommendPlan(rest);
    }
  }, [currentQuestionId, userTendencyInfo]);
}
