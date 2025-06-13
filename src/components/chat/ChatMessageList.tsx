import { Message } from "@/types/message";
import ChatMessage from "./ChatMessage";
import { useChatStore } from "@/store/useChatStore";

interface ChatMessageListProps {
  messages: Message[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatMessageList({
  messages,
  bottomRef,
}: ChatMessageListProps) {
  const { getLastBotMessage } = useChatStore();

  const lastBot = getLastBotMessage();
  const isLastMessageBot = lastBot && messages[messages.length - 1] === lastBot;

  return (
    <div className="scrollbar-hide flex-1 space-y-2 overflow-y-auto px-4 py-2">
      {messages.map((msg, idx) => {
        const isLast = isLastMessageBot && msg === lastBot;
        return (
          <ChatMessage key={idx} message={msg} isLastBotMessage={isLast} />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
