export default function SpeechBubble({ text }: { text: string }) {
  return (
    <div className="absolute top-[15%] w-fit max-w-[80%] rounded-2xl border bg-white px-4 py-3 text-center text-base font-medium text-gray-800 shadow-md">
      {text}
      <div className="absolute bottom-[-10px] left-1/2 h-5 w-4 -translate-x-1/2 rotate-45 border-r border-b bg-white" />
    </div>
  );
}
