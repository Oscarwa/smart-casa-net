import { usePost } from "@/hooks/useApi";

type SignInRequest = {
  email: string;
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
  onSuccess: (data: any, variables: any, context: any) => void
) =>
  usePost<SignInRequest, SignInResponse>("/api/auth/signin", {
    onSuccess,
    invalidateKeys: ["me"],
  });

export const useSignUpMutation = (onSuccess: VoidFunction) =>
  usePost<Omit<SignInRequest, "password">, SignInResponse>("/api/auth/signup", {
    onSuccess,
    invalidateKeys: ["me"],
  });

export const usePasswordResetMutation = (
  onSuccess: (data: any, variables: any, context: any) => void
) =>
  usePost<PasswordResetRequest, SignInResponse>("/api/auth/password-reset", {
    onSuccess,
    invalidateKeys: ["me"],
  });
