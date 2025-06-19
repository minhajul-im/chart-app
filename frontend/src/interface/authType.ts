export interface SignUpDataType {
  username: string;
  email: string;
  password: string;
}
export interface ForgotPasswordType {
  email: string;
}

export interface ResetPasswordType {
  email: string;
  resetToken: string;
  newPassword: string;
}
