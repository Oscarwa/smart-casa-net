import { useState } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
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
import { useSignUpMutation } from "./auth.api";

export const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { t } = useTranslation();
  const { mutate: signUpMutation } = useSignUpMutation(() =>
    console.log("yay")
  );
  const [email, setEmail] = useState("oscar2@mail.com");

  const handleSignIn = (e: any) => {
    e.preventDefault();
    signUpMutation({ email });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("register")}</CardTitle>
          <CardDescription>{t("registerDescription")}</CardDescription>
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
              <Button className="w-full">{t("register")}</Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              {t("yesAccount")}{" "}
              <Link to="/auth/signin" className="underline underline-offset-4">
                {t("login")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
