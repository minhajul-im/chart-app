import { useNavigate } from "react-router";
import InputField from "../../components/common/input-field";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPassword } from "../../api/hooks/auth/useForgotPassword";
import { setLocalStorage } from "../../helper/helper";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
});

export type SignInType = z.infer<typeof signInSchema>;

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const { isPending, mutate: signinHook } = useForgotPassword();

  const onSubmit = (postData: SignInType) => {
    signinHook(postData, {
      onSuccess: (response) => {
        if (response?.status) {
          setLocalStorage("email", postData.email);
          setLocalStorage("resetToken", response.data.resetToken);
          reset();
          navigate("/auth/reset-password");
        }
      },
    });
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm py-6">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
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
