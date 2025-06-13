import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { SmartChoiceApiInput } from "@/types/smartChoiceApiInput";
import { parsePlans, PlanApiResponse } from "@/types/Chat";
import { useGetFinalPlanInChatbot } from "./useGetFinalPlanInChatbot";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";

type Options = {
  onSuccess?: (data: PlanApiResponse) => void;
};

// 스마트 초이스에서 응답을 받아오는 useSmartChoiceRecommendation
export function useSmartChoiceRecommendation(options?: Options) {
  const { userTendencyInfo } = useTendencyStore();
  const addMessage = useChatStore((state) => state.appendMessage);

  // 구독 서비스까지 포함해서 추천을 수행
  const { mutate: getFinalPlanInChatbot } = useGetFinalPlanInChatbot({
    // 스마트 초이스로 가져온 거..
    onSuccess: (data) => {
      if (data.result.length > 0) {
        addMessage({
          role: "bot",
          content: "이 요금제가 어울릴 것 같아요!",
          type: "text",
        });

        addMessage({
          role: "bot",
          content: "",
          type: "plan",
          planData: data.result[0],
        });
      }
    },
  });

  return useMutation({
    mutationFn: (input: SmartChoiceApiInput) =>
      client.post("/smartchoice", input).then((res) => res.data),
    retry: 3, // 최대 3회까지 재시도
    onSuccess: (data) => {
      const parsed = parsePlans(data);
      // SmartChoice 결과를 이용해 chatbot 요청 진행
      getFinalPlanInChatbot({
        smartChoicePlans: parsed,
        subscribe: userTendencyInfo.subscribe,
      });
    },
    onError: (error) => {
      // 실패했을 경우 로직
      console.error("추천 실패:", error);
    },
  });
}
