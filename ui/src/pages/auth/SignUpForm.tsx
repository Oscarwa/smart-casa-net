import { useState } from "react";
import { Link } from "react-router";
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
import { useSignUpMutation } from "./auth.api";

export const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
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
          <CardTitle className="text-2xl">
            You're gonna love it in here
          </CardTitle>
          <CardDescription>
            We just need your email to get you started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              <Button className="w-full">Join</Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <Link to="/auth/signin" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
