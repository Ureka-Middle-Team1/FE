"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { barChartOptions } from "./options/barChartOptions";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface TendencyBarChartProps {
  data: number[] | [number[], number[]];
  name: string;
  labels?: string[];
}

const TendencyBarChart = ({
  data,
  name,
  labels = ["월정액", "데이터", "속도", "음성통화", "문자"],
}: TendencyBarChartProps) => {
  const datasets = Array.isArray(data[0])
    ? [
        {
          label: name,
          data: (data as [number[], number[]])[0],
          backgroundColor: "rgba(255, 188, 31, 0.6)",
          borderWidth: 0,
          categoryPercentage: 0.4,
          barPercentage: 0.6,
        },
        {
          label: "내 요금제",
          data: (data as [number[], number[]])[1],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderWidth: 0,
          categoryPercentage: 0.4,
          barPercentage: 0.6,
        },
      ]
    : [
        {
          label: name,
          data: data as number[],
          backgroundColor: "rgba(255, 188, 31, 0.6)",
          borderWidth: 0,
          categoryPercentage: 0.4,
          barPercentage: 0.6,
        },
      ];

  return (
    <div className="w-full" style={{ height: 320 }}>
      <Bar data={{ labels, datasets }} options={barChartOptions} />
    </div>
  );
};

export default TendencyBarChart;
