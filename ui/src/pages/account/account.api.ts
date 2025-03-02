import { useGet } from "@/hooks/useApi";

export const useGetMeQuery = () => useGet("me", "/api/users/me");
