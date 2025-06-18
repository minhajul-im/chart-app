import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router";

interface ApiError {
  response?: {
    status?: number;
    data?: {
      errors?: string[];
    };
  };
}

export const apiErrorHandler = (error: unknown, navigate: NavigateFunction) => {
  console.error("API error:", error);

  const isUnauthorized =
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as ApiError).response?.status === 401;

  if (isUnauthorized) {
    toast.error("Unauthorized access. Please log in again.");
    navigate("/login");
    return;
  }

  const errors =
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as ApiError).response?.data?.errors
      ? (error as ApiError).response?.data?.errors
      : [];

  if (Array.isArray(errors) && errors.length > 0) {
    errors.forEach((err: string) => {
      toast.error(err);
    });
  }
};
