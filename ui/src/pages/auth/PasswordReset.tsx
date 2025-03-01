import { FC } from "react";
import { PasswordResetForm } from "./PasswordResetForm";

export const PasswordReset: FC = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <PasswordResetForm />
      </div>
    </div>
  );
};
