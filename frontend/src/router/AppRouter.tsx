import { Route, Routes } from "react-router";
import { HomePage } from "../pages/home";
import { SignInPage } from "../pages/auth/SignInPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/signup" element={<SignUpPage />} />
      <Route path="/auth/signin" element={<SignInPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/contact" element={<div>Contact</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};
