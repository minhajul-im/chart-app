import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../lib/axiosClient";
import { signin_route } from "../../endPoint";
import { useNavigate, type NavigateFunction } from "react-router";
import { apiErrorHandler } from "../../error";
// import { revalidateQueryFn } from "../../../lib/queryClient";
import type { authResponseType } from "../../../interface/apiResponse";
import type { SignInType } from "../../../pages/auth/SignInPage";

const postFn = async (postData: SignInType, navigate: NavigateFunction) => {
  try {
    const response = await axiosClient.post<authResponseType>(
      signin_route,
      postData
    );
    return response.data;
  } catch (error: unknown) {
    apiErrorHandler(error, navigate);
    return null;
  }
};

export const useSignin = () => {
  const navigate = useNavigate();

  return useMutation<authResponseType, Error, SignInType>({
    mutationKey: ["signin_route"],
    mutationFn: (postData: SignInType) => postFn(postData, navigate),
    onSuccess: (response) => {
      if (response?.status) {
        // revalidateQueryFn("signin_route");
      }
    },
  });
};
