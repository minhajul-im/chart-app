import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../lib/axiosClient";
import { reset_password_route } from "../../endPoint";
import { useNavigate, type NavigateFunction } from "react-router";
import { apiErrorHandler } from "../../error";
import type { authResponseType } from "../../../interface/apiResponse";
import type { ResetPasswordType } from "../../../interface/authType";

const postFn = async (
  postData: ResetPasswordType,
  navigate: NavigateFunction
) => {
  try {
    const response = await axiosClient.post<authResponseType>(
      reset_password_route,
      postData
    );
    return response.data;
  } catch (error: unknown) {
    apiErrorHandler(error, navigate);
    return null;
  }
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation<authResponseType, Error, ResetPasswordType>({
    mutationKey: ["reset_password_route"],
    mutationFn: (postData: ResetPasswordType) => postFn(postData, navigate),
  });
};
