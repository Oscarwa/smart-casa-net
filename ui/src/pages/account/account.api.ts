import { useGet } from "@/hooks/useApi";

type MeResponse = {
  id: number;
  email: string;
  username: string;
};

export const useGetMeQuery = () => useGet<MeResponse>("me", "/api/users/me");
