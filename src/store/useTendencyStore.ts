import { create } from "zustand";
import { SmartChoiceApiInput } from "@/types/smartChoiceApiInput";
import { UserTendencyInfo } from "@/types/userTendencyInfo";

interface TendencyStore {
  userTendencyInfo: UserTendencyInfo;
  updateTendency: (patch: Partial<SmartChoiceApiInput>) => void;
  resetTendency: () => void;
  setSubscription: (value: string) => void; // 구독 서비스 관련 설정 함수
}

const defaultState: UserTendencyInfo = {
  data: "",
  voice: "",
  sms: "",
  age: "",
  type: "",
  dis: "",
  subscribe: "NONE", // 구독 서비스 관련
};

export const useTendencyStore = create<TendencyStore>((set) => ({
  userTendencyInfo: defaultState,
  updateTendency: (patch) =>
    set((state) => ({
      userTendencyInfo: { ...state.userTendencyInfo, ...patch },
    })),
  setSubscription: (value) =>
    set((state) => ({
      userTendencyInfo: {
        ...state.userTendencyInfo,
        subscription: value,
      },
    })),
  resetTendency: () => set({ userTendencyInfo: defaultState }),
}));
