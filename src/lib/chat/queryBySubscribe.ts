// lib/chat/queryBySubscribe.ts

import { ParsedPlan } from "@/types/Chat";
import { prisma } from "@/lib/prisma"; // Prisma 사용 시

/*
  구독 요금제 관련한 정보를 DB로부터 검색해서 가져오는 queryBySubscribe
  --> 현재는 구분 없이, 사용자에게 가장 맞아 보이는 요금제를 가져옴, 추후 확장 논의 가능
*/
export async function queryBySubscribe({
  smartChoicePlans,
  subscribe,
}: {
  smartChoicePlans: ParsedPlan[] | undefined;
  subscribe: string | undefined;
}): Promise<ParsedPlan[]> {
  // map 함수 사용해서, 이름 문자열 배열로 반환해야 한다
  const names = smartChoicePlans?.map((plan) => plan.name);

  //경우 1 - 이름 + 구독 서비스가 모두 일치하는 DB 요금제 (DB 연동하면 주석 처리된 아래 코드로 활용 예정)
  const perfectMatches = await prisma.plan.findMany({
    where: {
      name: { in: names },
      subscribe,
    },
    take: 2,
  });

  if (perfectMatches.length > 0) {
    // 경우 1에 대한 조회 결과가 존재하는 경우
    return perfectMatches;
  }

  // 경우 2 - 이름+구독 일치 요금제가 없을 때 => fallback 전략 수행 (DB 연동하면 주석 처리된 아래 코드로 활용 예정)
  const subscribeOnly = await prisma.plan.findMany({
    where: { subscribe },
    take: 2,
  });

  // Smart Choice와는 관계 없는.. 오직 DB의 구독제 관련 정보를 보고 뽑아온 애들
  return subscribeOnly;
}
