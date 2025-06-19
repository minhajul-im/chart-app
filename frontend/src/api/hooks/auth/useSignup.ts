import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../lib/axiosClient";
import { signup_route } from "../../endPoint";
import { useNavigate, type NavigateFunction } from "react-router";
import { apiErrorHandler } from "../../error";
import type { authResponseType } from "../../../interface/apiResponse";
import type { SignUpDataType } from "../../../interface/authType";

const postFn = async (postData: SignUpDataType, navigate: NavigateFunction) => {
  try {
    const response = await axiosClient.post<authResponseType>(
      signup_route,
      postData
    );
    return response.data;
  } catch (error: unknown) {
    apiErrorHandler(error, navigate);
    return null;
  }
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation<authResponseType, Error, SignUpDataType>({
    mutationKey: ["signup_route"],
    mutationFn: (postData: SignUpDataType) => postFn(postData, navigate),
  });
};
