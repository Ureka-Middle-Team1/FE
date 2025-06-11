import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";
import { useRecommendationPlan } from "@/hooks/useRecommendationPlan";

export function useWatchRecommendationTrigger() {
  const currentQuestionId = useChatStore((state) => state.currentQuestionId);
  const { userTendencyInfo } = useTendencyStore();
  const { mutate: recommendPlan } = useRecommendationPlan();

  const hasTriggeredRef = useRef(false); // 중복 방지

  useEffect(() => {
    if (currentQuestionId === 13 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;

      // subscribe만 제거한 나머지 필드 추출
      const { subscribe, ...rest } = userTendencyInfo;

      // subscription 제외한 값으로 recommendPlan 호출 (subscribe는 smart choice api 호출 시 필요없는 사안)
      recommendPlan(rest);
    }
  }, [currentQuestionId, userTendencyInfo]);
}
