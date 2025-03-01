import { usePost } from "@/hooks/useApi";

type SignInRequest = {
  username: string;
  password: string;
};

type SignInResponse = {
  token: string;
};

type PasswordResetRequest = {
  email: string;
  token: string;
  password: string;
};

export const useSignInMutation = (
  onSuccess: (data, variables, context) => void
) =>
  usePost<SignInRequest, SignInResponse>("/api/auth/login", {
    onSuccess,
    invalidateKeys: ["me"],
  });

export const useSignUpMutation = (onSuccess: VoidFunction) =>
  usePost<SignInRequest, SignInResponse>("/api/auth/signup", {
    onSuccess,
    invalidateKeys: ["me"],
  });

export const usePasswordResetMutation = (
  onSuccess: (data, variables, context) => void
) =>
  usePost<PasswordResetRequest, SignInResponse>("/api/auth/password-reset", {
    onSuccess,
    invalidatesKeys: ["me"],
  });
