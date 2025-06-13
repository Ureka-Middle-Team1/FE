export type TrendDatum = { label: string; value: number };

export enum MemeTypeEnum {
  Saving = "꽁돈 무너",
  Youtube = "팝콘 무너",
  SNS = "인싸 무너",
  Chat = "투머니톡커 무너",
  Call = "여보세무너",
  Books = "꼬꼬무너",
}

export type MemeType = "Saving" | "Youtube" | "SNS" | "Chat" | "Call" | "Books";

export const getMemeTypeLabel = (type: MemeType) => {
  const labelMap: Record<MemeType, string> = {
    Saving: "꽁돈 무너",
    Youtube: "팝콘 무너",
    SNS: "인싸 무너",
    Chat: "투머니톡커 무너",
    Call: "여보세무너",
    Books: "꼬꼬무너",
  };
  return labelMap[type];
};

export const memeTypeData: Record<
  string,
  {
    descriptionText: string;
    hashtagText: string;
    image: string;
  }
> = {
  Youtube: {
    descriptionText: `"한 편만 본다더니 시즌 정주행한 나 자신… 또 속았지 뭐야?".
                      영화, 드라마, 예능, 유튜브, 숏폼까지!.
                      당신의 하루는 스크린 속에서 시작되고 끝나요.
                      시간만 나면 넷플릭스 켜고, 잠들기 전엔 유튜브 한 편은 필수!.
                      '이거 안 보면 대화 못 껴'라는 핑계로 모든 콘텐츠를 섭렵하는.
                      당신은, 세상의 모든 스트리밍을 책임지는 '콘텐츠 요정!'.
                      오늘도 플레이 버튼을 눌러주세요~. 
                      끝나지 않는 재미가 기다리고 있어요.`,
    hashtagText: "정주행은_못참지 하루종일_재생중 팝콘들고_출발",
    image: "/assets/moono/youtube-moono.png",
  },
  SNS: {
    descriptionText: `"오늘 뭐 입었냐고? 인스타 보라구~ 😎📱".
                      인생샷, 릴스, 짧은 영상에 진심인 당신!.
                      하루 중 가장 먼저 하는 일은 SNS 확인이고,.
                      가장 많이 누르는 버튼은 '좋아요'. 
                      스토리는 매일매일 새로 올라오고, 틱톡 트렌드는 이미 섭렵 완료!.
                      디지털 세상의 인기인, 인싸력 만렙!.
                      당신은 무너계의 '감성 인플루언서'이자 '필터 마법사'.
                       SNS 없인 못 살아~`,
    hashtagText: "오늘도_셀카한장 팔로우미플리즈 인스타중독러",
    image: "/assets/moono/sns-moono.png",
  },
  Saving: {
    descriptionText: `"세상에 공짜는 없다지만, 아끼면 돈이다!".
                      최저가 비교는 이제 습관이고, 적금이자까지 계산해버리는 숫자 천재.
                      소소한 혜택도 놓치지 않고 알뜰살뜰 챙기는 당신은.
                      진정한 소비 설계사!.
                      지출을 줄여서 더 큰 행복을 누리고 싶은 라이프 플래너예요.
                      지갑이 가벼워도 머리는 무거운 당신, 바로 무너계의 '알뜰킹 천재'!`,
    hashtagText: "1원까지_관리함 가계부요정 알뜰살뜰짠돌이",
    image: "/assets/moono/saving-moono.png",
  },
  Chat: {
    descriptionText: `"전화? 그건 너무 급습이야~ 나는 톡으로 말할게~".
                      마음은 누구보다 따뜻하지만, 통화는 부담스러운 타입!.
                      시간차로 천천히 대답할 수 있는 채팅과 문자에 진심인 당신!.
                      답장을 위해 귀여운 이모티콘도 모아두고, 진심을 담은 긴 글도.
                      종종 날리는 감성파! 대화보다 기록을 사랑하는.
                      당신은, 진정한 '디지털 대화 장인'이에요!.
                      톡 속에서 세상을 소통하는 당신은,
                      말보다 글에 강한.
                      '문자요정 무너'!`,
    hashtagText: "카톡속도가빛의속도 문자한줄로끝내기 채팅마스터",
    image: "/assets/moono/chat-moono.png",
  },
  Calling: {
    descriptionText: `"단체 채팅방에선 조용하지만, 전화에선 말이 많아요😶➡️😆".
                      누가 카톡 읽씹한다고요? 그게 아니라,. 전화가 훨씬 빠르고 편한 거예요~.
                      누군가의 목소리를 들으며 직접 반응을 주고받는 게 찐 소통이라. 
                      생각하는 당신! 한 번 통화 시작하면 1시간은 기본이고,.
                      끊고 나서도 "아, 이 말 할 걸!" 생각나서 다시 전화 걸 타입~.
                      감정까지 실시간 전송하는 '수다본능' 전화파 무너.목소리로 세상을 연결해요!`,
    hashtagText: "수다요정_등장 전화가_먼저다 하루통화5시간",
    image: "/assets/moono/calling-moono.png",
  },
  Books: {
    descriptionText: `"이게 왜 궁금한지 모르겠지만, 지금 당장 검색하러 갑니다!".
                     궁금증이 생기면 절대 못 넘기고, 질문을 들으면 검색부터 하는 당신!.
                     유튜브로 공부하고, 위키로 파고들고, 독서와 뉴스 앱으로.
                     세상 흐름까지 챙기는 똑똑 무너! 아는 게 많아 주변 사람들에게.
                     "와, 너 어떻게 그걸 알았어?"라는 말도 들어요.
                     당신은 늘 '왜?'라는 물음을 던지며 지식의 바다를 헤엄치는 탐험가!`,
    hashtagText: "호기심천국 지식이최고의무기 물음표살인마",
    image: "/assets/moono/books-moono.png",
  },
};
