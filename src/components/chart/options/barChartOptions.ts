import { ChartOptions, TooltipItem } from "chart.js";

//Bar 차트 옵션 정의
export const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  indexAxis: "y",
  maintainAspectRatio: false,
  layout: {
    padding: { right: 24 },
  },
  animation: {
    duration: 1000,
    easing: "easeOutQuart",
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 100,
      ticks: { display: false },
      grid: {
        lineWidth: 1,
        color: "rgba(0, 0, 0, 0.2)",
      },
    },
    y: {
      grid: { display: false },
      ticks: {
        font: { size: 10 },
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        font: { size: 10 },
        boxWidth: 10,
        boxHeight: 10,
      },
      onClick: () => {}, //범례 클릭 숨김기능 제거
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bar">) => {
          const label = context.dataset.label || "";
          const value = context.parsed.x;
          return `${label}: ${value}%`;
        },
      },
    },
  },
};
