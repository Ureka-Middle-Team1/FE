// 밈 테스트 결과 -> Smart Choice API request body를 만들기 위해 사용되는 type들
export type UserMemeTestResult = {
  call: number; // 0~100
  sms: number; // 0~100
  sns: number; // 0~100
  youtube: number; // 0~100
  saving: number; // 0~100
};

// Smart Choice API에 넘길 때는 해당 값들을 각각 string으로 변환해서 넘겨야 한다!
export type SmartChoiceInput = {
  call: number; // 분
  sms: number; // 건
  data: number; // MB
};
