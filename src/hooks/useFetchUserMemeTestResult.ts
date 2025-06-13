import { useQuery } from "@tanstack/react-query";
import { UserMemeTestResult } from "@/types/CalculateInMemeTest";

// 밈테스트로 분석된 사용자 정보를 DB로부터 가져오는 Hook
export function useFetchUserMemeTestResult(user_id: number) {
  return useQuery({
    queryKey: ["userMemeTest", user_id],
    queryFn: async (): Promise<UserMemeTestResult> => {
      const res = await fetch(`/api/userprofile?user_id=${user_id}`);
      if (!res.ok) throw new Error("유저 프로필 요청 실패");
      return res.json(); // { call_level, sms_level, ... } 형태를 UserMemeTestResult로 사용
    },
    enabled: !!user_id, // user_id가 있을 때만 요청
  });
}
