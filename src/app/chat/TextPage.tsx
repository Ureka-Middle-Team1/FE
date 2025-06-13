"use client";

import { useEffect, useRef, useState } from "react";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInputBox from "@/components/chat/ChatInputBox";
import { useChatStore } from "@/store/useChatStore";
import { useHandleAnswer } from "@/hooks/useHandleAnswer";

// "텍스트"로 챗봇 기능을 사용하는 페이지
export default function TextPage() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isSubmittingRef = useRef(false);
  const { handleNormalizedAnswer } = useHandleAnswer();

  const { messages } = useChatStore();

  // 스크롤 아래로 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 텍스트 높이 자동 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    if (!input.trim() || isSubmittingRef.current) return;

    const userMessage = input.trim();
    isSubmittingRef.current = true;

    // 1. 입력 비우기
    setTimeout(() => {
      setInput("");
    }, 0);

    try {
      // 2. 외부 처리 로직 실행 (정규화, 업데이트, 다음 질문 등)
      await handleNormalizedAnswer(userMessage);
    } catch (error) {
      // 3. 필요 시 에러 핸들링 (옵션)
      console.error("onUserSubmit 처리 실패:", error);
    } finally {
      // 4. 중복 제출 방지 해제
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <ChatMessageList messages={messages} bottomRef={bottomRef} />
      <ChatInputBox
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        textareaRef={textareaRef}
      />
    </div>
  );
}
