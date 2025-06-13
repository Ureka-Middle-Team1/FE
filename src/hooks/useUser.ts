import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user?id=${id}`);
      return data.user;
    },
    enabled: !!id,
  });
};
