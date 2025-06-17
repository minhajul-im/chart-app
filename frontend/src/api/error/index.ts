import type { NavigateFunction } from "react-router";

export const apiErrorHandler = (error: unknown, navigate: NavigateFunction) => {
  console.error("API error:", error);

  navigate("/");
};
