"use client";

<<<<<<< HEAD:src/app/meme-test/result/page.tsx
import React from "react";
import { ChevronLeft } from "lucide-react";
import ShareSection from "@/components/meme/shareSection";
import TrendBar from "@/components/chart/TrendBar";
import PlanCard from "@/components/plan/planCard";
=======
export const dynamic = "force-dynamic";

import React from "react";
import { decrypt } from "@/utils/crypto";
import { useUser } from "@/hooks/useUser";
import { useGetRecommendedPlanQuery } from "@/hooks/useGetRecommendedPlanQuery";
import { getMemeTypeLabel, MemeType, memeTypeData } from "@/store/memeTypeData";
import TrendBar from "@/components/chart/TrendBar";
import PlanCard from "@/components/plan/planCard";
import ShareSection from "@/components/meme/shareSection";
import { ChevronLeft } from "lucide-react";
>>>>>>> f125a6a8e94c1c7152899f7fc3ca93971356d275:src/app/meme-test/result/[id]/page.tsx
import {
  parseSentences,
  parseHashtags,
  renderHighlightedText,
} from "@/utils/textUtils";
<<<<<<< HEAD:src/app/meme-test/result/page.tsx
import { memeTypeData } from "@/data/memeTypeData";

export default function TestPage() {
  const typeNameMap: Record<string, string> = {
    SNS: "인싸 무너",
    Youtube: "팝콘 무너",
    Chat: "투머치톡커 무너",
    Calling: "여보세무너",
    Books: "꼬꼬무너",
    Saving: "꽁돈 무너",
  };
=======

export default function ResultPage({ params }: { params: { id: string } }) {
  const encryptedId = params.id;
  /* 복호화 */
  const decryptedId = encryptedId
    ? decrypt(decodeURIComponent(encryptedId))
    : null;
  const { data: plans, isLoading, isError } = useGetRecommendedPlanQuery();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser(decryptedId || "");

  if (!encryptedId || !decryptedId) {
    return <p>잘못된 접근입니다.</p>;
  }
>>>>>>> f125a6a8e94c1c7152899f7fc3ca93971356d275:src/app/meme-test/result/[id]/page.tsx

  // 더미 데이터 설정
  const dummyUser = {
    characterProfile: {
      type: "Books",
      sns_level: 70,
      youtube_level: 90,
      sms_level: 40,
      call_level: 30,
      book_level: 20,
      saving_level: 50,
    },
  };

  const dummyPlans = [
    {
      rank: 1,
      title: "요금제 A",
      subtitle: "합리적인 선택",
      detail: "월 33,000원 / 데이터 10GB",
    },
  ];

  const user = dummyUser;
  const plans = dummyPlans;
  const typeTitle = typeNameMap[user.characterProfile.type] || "";

  if (!user.characterProfile) {
    return (
      <p className="text-center">
        아직 테스트 결과가 없습니다. 테스트를 먼저 진행해주세요.
      </p>
    );
  }
<<<<<<< HEAD:src/app/meme-test/result/page.tsx

  const type = user.characterProfile.type || "Saving";
  const profile = user.characterProfile;
  const { descriptionText, hashtagText, image } = memeTypeData[type];
=======
  const type = user.characterProfile?.type || "Saving";
  const profile = user.characterProfile;
  const { descriptionText, hashtagText } = memeTypeData[type];
>>>>>>> f125a6a8e94c1c7152899f7fc3ca93971356d275:src/app/meme-test/result/[id]/page.tsx
  const splitSentences = parseSentences(descriptionText);
  const hashtags = parseHashtags(hashtagText);

  return (
<<<<<<< HEAD:src/app/meme-test/result/page.tsx
    <div className="relative w-full max-w-[393px] bg-pink-200">
      <header className="sticky top-0 z-100 flex h-12 w-full items-center justify-between bg-yellow-200 px-4 font-bold">
=======
    <div className="relative flex min-h-screen w-full max-w-[430px] flex-col bg-pink-200">
      <header className="sticky top-0 z-10 flex h-12 w-full items-center justify-between bg-yellow-200 px-4 font-bold">
>>>>>>> f125a6a8e94c1c7152899f7fc3ca93971356d275:src/app/meme-test/result/[id]/page.tsx
        <div className="flex items-center">
          <ChevronLeft className="h-5 w-5" />
        </div>
        <div className="flex-1 text-center">콘텐츠 과몰입 테스트</div>
        <div className="h-5 w-5" />
      </header>

      <main className="flex flex-col items-center gap-5 px-4 pt-6 pb-10 text-center">
<<<<<<< HEAD:src/app/meme-test/result/page.tsx
        <div className="text-2xl font-bold">{typeTitle}</div>
=======
        <div className="text-2xl font-bold">
          {getMemeTypeLabel(type as MemeType)}
        </div>
>>>>>>> f125a6a8e94c1c7152899f7fc3ca93971356d275:src/app/meme-test/result/[id]/page.tsx
        <div>
          전체 테스트 참여자 중 <span className="font-bold">35.6%</span>가 같은
          유형입니다.
        </div>

        <img
          src={`/assets/moono/${user.characterProfile.type.toLowerCase()}-moono.png`}
          className="w-[40%]"
          alt="무너"
        />

        <div className="w-[90%] rounded-lg border-1 border-pink-400 bg-white p-4">
          <div className="flex flex-col items-center">
            {/* 해시태그 영역 */}
            <div className="mb-2 flex flex-col items-center">
              {hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{ fontFamily: "kkubulim" }}
                  className="relative z-10 inline-block text-[17px]">
                  <span
                    className="absolute bottom-[0.3em] left-0 -z-10 h-[0.26em] w-full bg-pink-400"
                    aria-hidden="true"
                  />
                  {tag}
                </span>
              ))}
            </div>
<<<<<<< HEAD:src/app/meme-test/result/page.tsx
            <div className="mt-3 flex flex-col text-[11px] leading-relaxed">
=======

            <div className="mt-3 flex flex-col text-[12px] leading-relaxed">
>>>>>>> f125a6a8e94c1c7152899f7fc3ca93971356d275:src/app/meme-test/result/[id]/page.tsx
              {splitSentences.map((line, idx) => (
                <p key={idx} className="mb-[3px]">
                  {renderHighlightedText(line)}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[90%] rounded-lg border-1 border-pink-400 bg-white p-4">
          <p className="relative mb-4 inline-block text-base font-bold">
            <span
              className="absolute bottom-[0.1em] left-0 -z-10 h-[0.4em] w-full bg-pink-400"
              aria-hidden="true"
            />
            영역별 트렌드 능력치
          </p>

          <div className="flex flex-col gap-3">
<<<<<<< HEAD:src/app/meme-test/result/page.tsx
            <TrendBar label="SNS" value={profile.sns_level} />
            <TrendBar label="Youtube" value={profile.youtube_level} />
            <TrendBar label="Chat" value={profile.sms_level} />
            <TrendBar label="Calling" value={profile.call_level} />
            <TrendBar label="Books" value={profile.book_level} />
            <TrendBar label="Saving" value={profile.saving_level} />
          </div>
        </div>

        <div className="mt-3 flex w-[100%] flex-col items-center gap-2 rounded-lg">
          <div className="mt-5 flex gap-2 text-2xl">
            <img src="\assets\icons\U_plus.png" className="h-[30px]"></img>
            <p style={{ fontFamily: "kkubulim" }} className="text-[25px]">
              추천 요금제
            </p>
          </div>
          <div className="flex w-[90%] flex-col gap-4">
            {plans.map((plan) => (
              <PlanCard
                key={plan.rank}
                rank={plan.rank}
                title={plan.title}
                subtitle={plan.subtitle}
                detail={plan.detail}
              />
            ))}
            <p className="text-[11px] text-black">
              본 테스트는 LG유플러스와의 협업을 통해 제작되었으며, <br />
              테스트 결과에 기반한 추천 요금제는 모두 LG유플러스의 요금제입니다.
            </p>
          </div>
        </div>
=======
            <TrendBar label="SNS" value={user.characterProfile.sns_level} />
            <TrendBar
              label="Youtube"
              value={user.characterProfile.youtube_level}
            />
            <TrendBar label="Chat" value={user.characterProfile.sms_level} />
            <TrendBar
              label="Calling"
              value={user.characterProfile.call_level}
            />
            <TrendBar label="Books" value={user.characterProfile.book_level} />
            <TrendBar
              label="Saving"
              value={user.characterProfile.saving_level}
            />
          </div>
        </div>

        <ShareSection
          title="내 결과 공유하기"
          count={150}
          id={decryptedId}
          shareUrl={`/meme-test/result/[encryptedId]`}
        />
>>>>>>> f125a6a8e94c1c7152899f7fc3ca93971356d275:src/app/meme-test/result/[id]/page.tsx

        <div className="mt-10 flex w-[100%] flex-col items-center gap-2 rounded-lg">
          <p style={{ fontFamily: "kkubulim" }} className="text-[25px]">
            더 정확한 요금제 추천을 원한다면?
          </p>
          <img
            src="\assets\icons\moomool_banner.png"
            className="w-[70%]"
            alt="무물배너"
          />
          <p className="text-lg">무물에서</p>
          <p className="text-lg font-bold">진짜 나한테 맞는 요금제 찾기</p>
          <img
            src="\assets\icons\arrow.png"
            className="w-[80px]"
            alt="화살표"
          />
          <button className="rounded-full bg-pink-400 px-9 py-4 font-bold text-black">
            무너에게 요금제 상담하기
          </button>
        </div>

        <div className="rounded-lgp-4 mt-10 flex w-[100%] flex-col items-center text-[14px]">
          <div className="mb-2 flex flex-col items-center">
            <p
              style={{ fontFamily: "kkubulim" }}
              className="relative z-10 mb-2 inline-block text-xl">
              <span className="relative z-10 inline-block text-xl">
                <span
                  className="absolute bottom-[0.3em] left-0 -z-10 h-[0.26em] w-full bg-pink-400"
                  aria-hidden="true"
                />
                테스트 결과 공유
              </span>
              하고, <br />
              히든 프로필 획득하자!
            </p>
          </div>
          <img
            src="\assets\icons\stamp_area.png"
            alt="도장 미션"
            className="mx-auto w-[100%]"
          />
          <div className="mt-4 flex w-[90%] flex-col items-center justify-between">
            <ShareSection title="내 결과 공유하기" count={150} />
            <div className="rounded-md p-3 text-[11px] leading-tight text-gray-800">
              <ul className="list-disc space-y-1 text-left">
                <li>본 이벤트는 "무물"에 로그인한 회원에 한해 적용됩니다.</li>
                <li>
                  테스트를 공유받은 사용자가 해당 링크를 통해 테스트를 완료한
                  경우, 공유한 회원에게 도장이 1회 지급됩니다.
                </li>
                <li>
                  도장은 로그인된 계정에 자동으로 누적되며, 일정 개수 이상 모일
                  경우 프로필이 단계별로 업그레이드됩니다.
                </li>
              </ul>
            </div>
          </div>
        </div>

<<<<<<< HEAD:src/app/meme-test/result/page.tsx
        <div
          style={{ fontFamily: "kkubulim" }}
          className="mt-6 flex w-[90%] flex-col gap-3 text-2xl">
          <button className="rounded-lg bg-pink-400 py-3 text-black shadow-md">
            테스트 다시하기
          </button>
          <button className="rounded-lg bg-yellow-300 py-3 text-black shadow-md">
            전체 유형 확인하기
          </button>
=======
        <div className="flex w-full flex-col gap-4">
          {isLoading && <p className="text-center">요금제를 불러오는 중...</p>}
          {isError && (
            <p className="text-center text-red-500">요금제 불러오기 실패</p>
          )}
          {plans?.map((plan) => <PlanCard key={plan.rank} {...plan} />)}
>>>>>>> f125a6a8e94c1c7152899f7fc3ca93971356d275:src/app/meme-test/result/[id]/page.tsx
        </div>
      </main>
    </div>
  );
}
