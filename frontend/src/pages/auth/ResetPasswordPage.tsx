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
import toast from "react-hot-toast";
import { useResetPassword } from "../../api/hooks/auth/useResetPassword";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../../helper/helper";

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
  resetToken: z.string(),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { isPending, mutate: resetPasswordHook } = useResetPassword();

  const onSubmit = (postData: ResetPasswordType) => {
    postData.email = getLocalStorage("email") || "";
    postData.resetToken = getLocalStorage("resetToken") || "";

    resetPasswordHook(postData, {
      onSuccess: (response) => {
        if (response?.status) {
          reset();
          removeLocalStorage("email");
          removeLocalStorage("resetToken");
          setLocalStorage("token", response.data.token);
          toast.success(response.data.message || "Reset password successful!");
          navigate("/");
        }
      },
    });
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm py-6">
        <CardHeader>
          <CardTitle>Reset Password </CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <InputField
                label="New Password"
                type="password"
                placeholder="Enter your password"
                required
                error={errors.newPassword?.message}
                {...register("newPassword")}
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
