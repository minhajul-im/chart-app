import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../lib/axiosClient";
import { images_route } from "../../endPoint";
import { useNavigate, type NavigateFunction } from "react-router";
import { apiErrorHandler } from "../../error";
import type { imageResponseType } from "../../../interface/apiResponse";

const getImage = async (navigate: NavigateFunction) => {
  try {
    const response = await axiosClient.get<imageResponseType>(images_route);
    return response.data;
  } catch (error: unknown) {
    apiErrorHandler(error, navigate);
    return null;
  }
};

export const useGetImages = () => {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["images_route"],
    queryFn: () => getImage(navigate),
  });
};
