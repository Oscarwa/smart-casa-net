import { usePost } from "@/hooks/useApi";

type SignInRequest = {
  username: string;
  password: string;
};

type SignInResponse = {
  token: string;
};

export const useSignInMutation = (
  onSuccess: (data, variables, context) => void
) =>
  usePost<SignInRequest, SignInResponse>("/api/user/login", {
    onSuccess,
    invalidateKeys: ["me"],
  });

export const useSignUpMutation = (onSuccess: VoidFunction) =>
  usePost<SignInRequest, SignInResponse>("/api/user/signup", {
    onSuccess,
    invalidateKeys: ["me"],
  });
