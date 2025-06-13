"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const isVoiceMode = mode === "voice";

  const handleClick = () => {
    if (isVoiceMode) {
      router.push("/chat");
    } else {
      router.back();
    }
  };

  const title = "챗봇";

  return (
    <div className="relative flex h-12 items-center justify-center bg-white">
      <Button className="absolute left-2" variant="ghost" onClick={handleClick}>
        {isVoiceMode ? <ArrowLeft size={20} /> : <X size={20} />}
      </Button>
      <span className="text-center text-sm font-semibold">{title}</span>
    </div>
  );
}
