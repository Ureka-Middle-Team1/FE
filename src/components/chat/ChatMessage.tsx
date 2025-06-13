import { Message } from "@/types/Chat";
import PlanCard from "./PlanCard";
import TypingMessage from "./TypingMessage";

interface ChatMessageProps {
  message: Message;
  isLastBotMessage?: boolean;
}

export default function ChatMessage({
  message,
  isLastBotMessage,
}: ChatMessageProps) {
  const isUser = message.role === "user";
  if (message.type === "plan" && message.planData) {
    return (
      <div className="flex items-start justify-start gap-2 py-2">
        <img
          src="/assets/moono/chatbot-moono.png"
          alt="무너"
          className="mt-1 h-8 w-8 rounded-full"
        />
        <div className="flex w-full flex-col">
          <span className="mb-1 text-xs text-gray-800">무너</span>
          <PlanCard {...message.planData} />
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-2">
        <div className="max-w-[75%] rounded-tl-2xl rounded-br-2xl rounded-bl-2xl bg-[#FFF3B0] px-3 py-2 text-sm shadow-md">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-start gap-2">
      <img
        src="/assets/moono/chatbot-moono.png"
        alt="무너"
        className="mt-1 h-8 w-8 rounded-full"
      />
      <div className="flex flex-col">
        <span className="mb-1 text-xs text-gray-800">무너</span>
        {isLastBotMessage ? (
          <TypingMessage fullText={message.content} />
        ) : (
          <div className="max-w-[75%] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-white px-3 py-2 text-sm shadow-md">
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
}
