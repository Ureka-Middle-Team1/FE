"use client";

import TagBadge from "./TagBadge";
import PlanModeToggle from "./PlanModeToggle";

interface PlanInfoProps {
  data: PlanDetailData;
  mode: "basic" | "compare";
  onChangeMode: (mode: "basic" | "compare") => void;
}

import { PlanDetailData } from "@/types/planDetail";

export default function PlanInfo({ data, mode, onChangeMode }: PlanInfoProps) {
  return (
    <div className="px-8">
      <h1 className="pt-5 text-[1.75rem] leading-tight font-bold text-gray-900">
        {data.name}
      </h1>
      <p className="text-[1rem] font-semibold text-gray-900">{data.price}</p>

      <div className="my-1 mb-5 flex flex-wrap gap-1">
        {data.tags.map((tag, index) => (
          <TagBadge key={index} text={tag} index={index} />
        ))}
      </div>

      <PlanModeToggle mode={mode} onChange={onChangeMode} />
    </div>
  );
}
