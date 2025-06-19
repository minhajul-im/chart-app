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
import { useSignup } from "../../api/hooks/auth/useSignup";
import toast from "react-hot-toast";

const signUpSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpType = z.infer<typeof signUpSchema>;

export const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const { isPending, mutate: signupHook } = useSignup();

  const onSubmit = (postData: SignUpType) => {
    signupHook(postData, {
      onSuccess: (response) => {
        if (response?.status) {
          reset();
          toast.success(response.data.message || "Signup successful!");
          navigate("/auth/signin");
        }
      },
    });
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm py-6">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/auth/signin">
              <Button variant="link">Sign In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <InputField
                label="Username"
                required
                placeholder="Username"
                error={errors.username?.message}
                {...register("username")}
              />
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
            </div>
            <Button disabled={isPending} type="submit" className="w-full mt-4">
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
