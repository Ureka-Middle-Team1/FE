"use client";

interface BottomGradientProps {
  show: boolean;
}

export default function BottomGradient({ show }: BottomGradientProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 h-[30rem] w-full transition-opacity duration-700 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "linear-gradient(to top, #ffe4e8, transparent)",
      }}
    />
  );
}
