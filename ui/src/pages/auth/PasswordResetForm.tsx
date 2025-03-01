import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePasswordResetMutation } from "./auth.api";

export const PasswordResetForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const navigate = useNavigate();
  const { mutate: passwordResetMutation } = usePasswordResetMutation((data) => {
    //localStorage.setItem("token", data.email);
    navigate("/");
  });
  const [password, setPassword] = useState("Zant#181088wa");
  const [params] = useSearchParams();
  const token = params.get("token");
  if (!token) {
    console.error("No token provided for password reset");
  }
  const email = params.get("email");
  if (!email) {
    console.error("No email provided for password reset");
  }

  const handlePasswordReset = (e) => {
    e.preventDefault();
    passwordResetMutation({ email, token, password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Password reset</CardTitle>
          <CardDescription>
            Enter a new password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordReset}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  readOnly
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Your new password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full">Reset password</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
