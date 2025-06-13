import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { Plan } from "@/types/plan";

export const useGetRecommendedPlanQuery = (): UseQueryResult<
  Plan[],
  AxiosError
> => {
  return useQuery<Plan[], AxiosError>({
    queryKey: ["recommended-plan"],
    queryFn: async () => {
      const { data } = await client.get("/plan/recommend");
      return data;
    },
    staleTime: 1000 * 60,
    retry: 2,
  });
};
