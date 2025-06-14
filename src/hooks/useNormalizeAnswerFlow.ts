// src/hooks/useNormalizeAnswer.ts
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { mapTendencyData } from "@/lib/chat/mapTendencyData";
import { getNextQuestionId } from "@/lib/chat/getNextQuestionId";
import { questionTextMap } from "@/lib/chat/chatBotQuestionFlow";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";

// 요청 파라미터
type NormalizeParam = {
  message: string;
  questionId: number;
};

// API 응답 타입
interface NormalizeResponse {
  normalizedValue: string;
}

export function useNormalizeAnswerFlow() {
  const { userTendencyInfo, updateTendency } = useTendencyStore();
  const { appendMessage, setCurrentQuestionId } = useChatStore();

  const { mutate } = useMutation<NormalizeResponse, Error, NormalizeParam>({
    mutationFn: (input) =>
      client.post("/normalized-prompts", input).then((res) => res.data),

    onSuccess: (data, variables) => {
      const { questionId } = variables;

      const patch = mapTendencyData(
        questionId,
        data.normalizedValue,
        userTendencyInfo
      );
      updateTendency(patch);

      const nextId = getNextQuestionId(questionId, data.normalizedValue);
      if (nextId === -1) {
        // "자연스러운 대화" 모드(nextQuestionId 값으로 -1 받음)로 진입 시엔 다른 로직 필요
        appendMessage({
          role: "bot",
          content:
            "자연스러운 대화 모드로 진입합니다. 요금제 추천 관련해서 자연스레 물어봐 주세요.",
        });
        setCurrentQuestionId(nextId); // 현재 questionID를 -1로 설정
      } else {
        const contentToAppend =
          nextId !== undefined && data.normalizedValue !== "INVALID"
            ? questionTextMap[nextId]
            : questionTextMap[questionId];

        if (contentToAppend) {
          appendMessage({ role: "bot", content: contentToAppend });
        }

        if (nextId !== undefined && data.normalizedValue !== "INVALID") {
          setCurrentQuestionId(nextId);
        }
      }
    },

    onError: (error) => {
      console.error("에러 사항....: ", error);
      appendMessage({
        role: "bot",
        content: "죄송해요! 뭔가 잘못됐어요. 다시 한 번 입력해 주실 수 있나요?",
      });
    },

    retry: 3,
  });

  return { normalizeAnswer: mutate };
}
