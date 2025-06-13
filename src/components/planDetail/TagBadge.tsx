"use client";

import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  text: string;
  index: number;
}

export default function TagBadge({ text, index }: TagBadgeProps) {
  const colorClass =
    index === 0
      ? "bg-red-100 text-red-500"
      : index === 1
        ? "bg-indigo-100 text-indigo-500"
        : "bg-gray-100 text-gray-600";

  return (
    <Badge
      className={`rounded-md px-2 py-1 text-[0.6rem] font-medium ${colorClass}`}>
      {text}
    </Badge>
  );
}
