"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/chat/ChatbotHeader";
import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useWatchRecommendationTrigger } from "@/hooks/useWatchRecommendationTrigger";

type Mode = "text" | "voice";

// 챗봇 페이지 (음성/텍스트 버전 페이지는 해당 컴포넌트의 하위 컴포넌트로 들어와 조건부 처리됨)
export default function ChatbotPage() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as Mode) || "text";

  useWatchRecommendationTrigger();

  return (
    <div className="flex h-screen flex-col bg-pink-100">
      <Header />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mode === "text" ? <TextPage /> : <VoicePage />}
      </div>
    </div>
  );
}
