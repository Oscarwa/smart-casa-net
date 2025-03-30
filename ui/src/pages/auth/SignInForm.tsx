import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
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
import { useSignInMutation } from "./auth.api";

export const SignInForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: signInMutation } = useSignInMutation((token) => {
    console.log("setting token:", token);
    localStorage.setItem("token", token);
    navigate("/");
  });
  const [email, setEmail] = useState("oscar2@mail.com");
  const [password, setPassword] = useState("Zant#181088wa");

  const handleSignIn = (e: any) => {
    e.preventDefault();
    signInMutation({ email, password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("login")}</CardTitle>
          <CardDescription>{t("loginDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("password")}</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t("forgotPassword")}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full">{t("login")}</Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              {t("noAccount")}{" "}
              <Link to="/auth/signup" className="underline underline-offset-4">
                {t("register")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
