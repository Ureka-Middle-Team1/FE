import { PlanDBApiResponse } from "@/types/PlanData";
import { PlanDetailData } from "@/types/planDetail";

const serviceMap: Record<string, PlanDetailData["benefits"][number]> = {
  NETFLIX: {
    imageSrc: "/assets/ott/netflix.jpg",
    title: "넷플릭스 3개월",
    description: "이 요금제와 함께 넷플릭스 3개월 구독권을 무료로 누려보세요",
  },
  YOUTUBE_PREMIUM: {
    imageSrc: "/assets/ott/youtubePremium.png",
    title: "유튜브 프리미엄 3개월",
    description:
      "이 요금제와 함께 유튜브 프리미엄 3개월 구독권을 무료로 누려보세요",
  },
  WATCHA: {
    imageSrc: "/assets/ott/watcha.jpg",
    title: "왓챠 3개월",
    description: "이 요금제와 함께 왓챠 3개월 구독권을 무료로 누려보세요",
  },
};

function getBenefits(services: string[]): PlanDetailData["benefits"] {
  return services
    .map((s) => serviceMap[s])
    .filter((b): b is PlanDetailData["benefits"][number] => b !== undefined);
}

export function mapPlanToDetailData(plan: PlanDBApiResponse): PlanDetailData {
  return {
    name: plan.name,
    price: `월 ${plan.price.toLocaleString()} 원`,
    tags: ["임시 태그데이터1", "임시 태그데이터2"],
    radar: [77, 50, 50, 97, 80],
    bar: [77, 50, 50, 97, 80],
    compare: [40, 82, 84, 43, 59],
    benefits: getBenefits(plan.subscriptionServices),
  };
}
