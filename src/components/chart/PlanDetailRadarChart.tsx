"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { getRadarChartOptions } from "./options/radarChartOptions";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface TendencyRadarChartProps {
  isRounded: boolean;
  data: number[] | [number[], number[]];
  name: string;
  labels?: string[];
}

const TendencyRadarChart = ({
  isRounded,
  data,
  name,
  labels = ["월정액", "데이터", "속도", "음성통화", "문자"],
}: TendencyRadarChartProps) => {
  const datasets = [
    {
      label: "기준값",
      data: [100, 100, 100, 100, 100],
      fill: true,
      backgroundColor: "rgba(200, 200, 255, 0.2)",
      borderColor: "rgba(200, 200, 255, 0.3)",
      borderWidth: 1,
      pointRadius: 0,
    },
    ...(Array.isArray(data[0])
      ? [
          {
            label: name,
            data: (data as [number[], number[]])[0],
            fill: true,
            backgroundColor: "rgba(255, 188, 31, 0.2)",
            borderColor: "rgba(255, 188, 31, 0.8)",
            borderWidth: 1.5,
            pointRadius: 0,
          },
          {
            label: "내 요금제",
            data: (data as [number[], number[]])[1],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 0.8)",
            borderWidth: 1.5,
            pointRadius: 0,
          },
        ]
      : [
          {
            label: name,
            data: data as number[],
            fill: true,
            backgroundColor: "rgba(255, 188, 31, 0.2)",
            borderColor: "rgba(255, 188, 31, 0.8)",
            borderWidth: 1.5,
            pointRadius: 0,
          },
        ]),
  ];

  return (
    <div className="h-[320px] w-full">
      <Radar
        data={{ labels, datasets }}
        options={getRadarChartOptions(isRounded)}
      />
    </div>
  );
};

export default TendencyRadarChart;
