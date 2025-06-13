import { SmartChoiceApiInput } from "@type/smartChoiceApiInput";

// userTendencyStore에서 사용하는 사용자 입력 정보를 분석한 자료의 자료형
export interface UserTendencyInfo extends SmartChoiceApiInput {
  subscribe: string;
}
