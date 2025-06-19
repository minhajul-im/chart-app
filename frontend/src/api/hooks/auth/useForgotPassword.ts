import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../lib/axiosClient";
import { forgot_password_route } from "../../endPoint";
import { useNavigate, type NavigateFunction } from "react-router";
import { apiErrorHandler } from "../../error";
import type { forgotPasswordResponseType } from "../../../interface/apiResponse";
import type { ForgotPasswordType } from "../../../interface/authType";

const postFn = async (
  postData: ForgotPasswordType,
  navigate: NavigateFunction
) => {
  try {
    const response = await axiosClient.post<forgotPasswordResponseType>(
      forgot_password_route,
      postData
    );
    return response.data;
  } catch (error: unknown) {
    apiErrorHandler(error, navigate);
    return null;
  }
};

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation<forgotPasswordResponseType, Error, ForgotPasswordType>({
    mutationKey: ["forgot_password_route"],
    mutationFn: (postData: ForgotPasswordType) => postFn(postData, navigate),
  });
};
