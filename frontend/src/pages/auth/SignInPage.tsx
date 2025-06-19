import { Link, useNavigate } from "react-router";
import InputField from "../../components/common/input-field";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useSignin } from "../../api/hooks/auth/useSignin";
import { setLocalStorage } from "../../helper/helper";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type SignInType = z.infer<typeof signInSchema>;

export const SignInPage = () => {
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const { isPending, mutate: signinHook } = useSignin();

  const onSubmit = (postData: SignInType) => {
    signinHook(postData, {
      onSuccess: (response) => {
        if (response?.status) {
          reset();
          setLocalStorage("token", response.data.token);
          toast.success(response.data.message || "Signin successful!");
          navigate("/");
        }
      },
    });
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm py-6">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/auth/signup">
              <Button variant="link">Sign up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <InputField
                label="Email"
                required
                placeholder="m@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
                error={errors.password?.message}
                {...register("password")}
              />
              <Link to="/auth/forgot-password">
                <span className="text-xs text-blue-500 -mt-2 underline">
                  Forgot password?
                </span>
              </Link>
            </div>
            <Button disabled={isPending} type="submit" className="w-full mt-4">
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Sign in with Google
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
