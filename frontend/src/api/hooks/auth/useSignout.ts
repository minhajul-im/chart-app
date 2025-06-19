import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../lib/axiosClient";
import { signout_route } from "../../endPoint";
import { useNavigate, type NavigateFunction } from "react-router";
import { apiErrorHandler } from "../../error";
import type { signoutResponseType } from "../../../interface/apiResponse";

const signOutFn = async (navigate: NavigateFunction) => {
  try {
    const response = await axiosClient.get<signoutResponseType>(signout_route);

    return response.data;
  } catch (error: unknown) {
    apiErrorHandler(error, navigate);
    return null;
  }
};

export const useSignout = () => {
  const navigate = useNavigate();

  return useMutation<signoutResponseType, Error>({
    mutationKey: ["signout_route"],
    mutationFn: () => signOutFn(navigate),
  });
};
