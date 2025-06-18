import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../lib/axiosClient";
import { images_route } from "../../endPoint";
import { useNavigate, type NavigateFunction } from "react-router";
import { apiErrorHandler } from "../../error";
import { revalidateQueryFn } from "../../../lib/queryClient";
import type { imageResponseType } from "../../../interface/apiResponse";

const postImage = async (postData: FormData, navigate: NavigateFunction) => {
  try {
    const response = await axiosClient.post<imageResponseType>(
      `${images_route}/store`,
      postData
    );
    return response.data;
  } catch (error: unknown) {
    apiErrorHandler(error, navigate);
    return null;
  }
};

export const useStoreImages = () => {
  const navigate = useNavigate();

  return useMutation<imageResponseType | null, Error, FormData>({
    mutationKey: ["images_route_store"],
    mutationFn: (postData) => postImage(postData, navigate),
    onSuccess: (response) => {
      if (response?.status) {
        revalidateQueryFn("images_route");
      }
    },
  });
};
