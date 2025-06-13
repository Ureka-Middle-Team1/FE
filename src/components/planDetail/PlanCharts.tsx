"use client";

import { PlanDetailData } from "@/types/planDetail";
import TendencyRadarChart from "@/components/chart/PlanDetailRadarChart";
import TendencyBarChart from "@/components/chart/PlanDetailBarChart";

interface PlanChartsProps {
  data: PlanDetailData;
  mode: "basic" | "compare";
}

export default function PlanCharts({ data, mode }: PlanChartsProps) {
  const isRounded = true;

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="h-80 w-full">
        <TendencyRadarChart
          isRounded={isRounded}
          data={mode === "basic" ? data.radar : [data.radar, data.compare]}
          name={data.name}
        />
      </div>

      <div className="ml-[2rem] h-80 w-[85%]">
        <TendencyBarChart
          data={mode === "basic" ? data.bar : [data.bar, data.compare]}
          name={data.name}
        />
      </div>
    </div>
  );
}
