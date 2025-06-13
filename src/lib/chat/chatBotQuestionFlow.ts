// chatBotQuestionFlow.ts (src/lib/questionFlowMap.ts로 분리 가능)
export const questionFlow: Record<number, Record<string, number>> = {
  1: {
    YES: 3,
    NO: 2,
    IDONTKNOW: 2,
    INVALID: 1, // 재질문
  },
  2: {
    YES: 3,
    NO: 4,
    IDONTKNOW: 4,
    INVALID: 2,
  },
  3: {
    YES: 7,
    NO: 4,
    IDONTKNOW: 4,
    INVALID: 3,
  },
  4: {
    __NUMERIC__: 5, // 수치형 응답일 경우 5번 질문으로 이동
    IDONTKNOW: 6,
    INVALID: 4,
  },
  5: {
    YES: 6,
    NO: 6,
    IDONTKNOW: 6,
    INVALID: 5,
  },
  6: {
    YES: 7,
    NO: 7,
    IDONTKNOW: 7,
    INVALID: 6,
  },
  7: {
    YES: 8,
    NO: 8,
    IDONTKNOW: 8,
    INVALID: 7,
  },
  8: {
    __NUMERIC__: 9,
    INVALID: 8,
  },
  9: {
    __NUMERIC__: 10,
    INVALID: 9,
  },
  10: {
    __NUMERIC__: 11,
    INVALID: 10,
  },
  11: {
    YES: 12,
    NO: 13,
    IDONTKNOW: 12,
    INVALID: 11,
  },
  12: {
    __DEFAULT__: 13, // 해당하는 단어를 추출했을 경우... getNextQuestionId() 메소드에서 이걸로 변환해 올 것임
    INVALID: 12,
  },
};

// 각 질문에 대해서 여기에다가 매핑해 놓을게
export const questionTextMap: Record<number, string> = {
  1: "혹시 넌 무제한 요금제 쓰는 중이야? 요금제를 실제로 쓸 사람 기준으로 얘기해줘!",
  2: "넌 그러면 휴대폰으로 영상이나 게임 서비스 같이 데이터 많이 쓰는 서비스들 자주 이용할 것 같아?",
  3: "무제한 요금제가 꼭 필요하다고 생각해?",
  4: "사용하고 있는 요금제에서, 데이터가 얼마나 제공되는지 알고 있어? 알고 있으면 알려줘. 모르겠으면 모르겠다고 말해줘.",
  5: "지금 쓰고 있는 요금제에서, 데이터 혹시 안 부족해?",
  6: "와이파이 자주 연결해서 사용해?",
  7: "카톡, 인스타 DM 말고 전화나 문자는 많이 해?",
  8: "요금제 쓰는 사람 나이대가 어떻게 돼? 난 20대야.. 이렇게 말해줘",
  9: "3G, LTE, 5G 요금제 중에 어떤 거를 자주 사용할 것 같아?",
  10: "약정을 주로 껴서 사는 편이야? 약정을 만약 낀다면 12개월, 24개월 중에 어떤 걸로 끼는 편이야?",
  11: "넷플릭스, 유튜브 프리미엄 같은 구독제 서비스 즐겨서 보는 편이야?",
  12: "주로 어떤 구독제 서비스 사용하는 편이야?",
};
