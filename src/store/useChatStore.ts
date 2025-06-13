import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Message } from "@/types/Chat";
import { questionTextMap } from "@/lib/chat/chatBotQuestionFlow";

const initialMessage: Message[] = questionTextMap[1]
  ? [{ role: "bot", content: questionTextMap[1] }]
  : [];

interface ChatStore {
  messages: Message[];
  currentQuestionId: number;
  setCurrentQuestionId: (id: number) => void;
  setMessages: (messages: Message[]) => void;
  appendMessage: (message: Message) => void;
  clearMessages: () => void;
  getLastBotMessage: () => Message | undefined;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: initialMessage,
      currentQuestionId: 1,
      setCurrentQuestionId: (id) => set({ currentQuestionId: id }),
      setMessages: (messages) => set({ messages }),
      appendMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () => set({ messages: initialMessage }),
      getLastBotMessage: () => {
        const messages = get().messages;
        for (let i = messages.length - 1; i >= 0; i--) {
          if (messages[i].role === "bot") return messages[i];
        }
        return undefined;
      },
    }),
    {
      name: "chat-storage", // localStorage key 이름
      partialize: (state) => ({
        messages: state.messages,
        currentQuestionId: state.currentQuestionId,
      }), // 저장할 필드 제한
    }
  )
);
