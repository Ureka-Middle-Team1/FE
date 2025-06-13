import {
  UserMemeTestResult,
  SmartChoiceInput,
} from "@/types/CalculateInMemeTest";

// 밈 테스트 결과를 통해 얻은 정보들을 Smart Choice API로 넘기는 형태로 계산하는 메소드
export function calculateSmartChoiceValues(
  userMemeTestResult: UserMemeTestResult
): SmartChoiceInput {
  const { call, sms, sns, youtube, saving } = userMemeTestResult;

  // 평균값 기준
  const avg_call = 300;
  const avg_sms = 300;
  const avg_data = 30000;

  // 통화량 계산
  const finalCall = call >= 80 ? 999999 : Math.round((avg_call * call) / 50);

  // 문자량 계산
  const finalSms = sms >= 80 ? 999999 : Math.round((avg_sms * sms) / 50);

  // 데이터 사용량 계산 (가중 평균 + 무제한 조건)
  const sns_weight = 0.3;
  const youtube_weight = 0.4;
  const saving_weight = -0.1;

  const data_score =
    sns_weight * sns + youtube_weight * youtube + saving_weight * saving;

  const isUnlimitedData = data_score >= 54;

  const finalData = isUnlimitedData
    ? 999999
    : Math.min(
        Math.max(Math.round(avg_data * (data_score / 30)), 1000),
        999999
      );

  return {
    call: finalCall,
    sms: finalSms,
    data: finalData,
  };
}
