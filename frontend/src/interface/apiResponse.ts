import type { LogType } from "./logType";

export interface LogFilterType {
  [key: string]: string | number | boolean | undefined;
}

export interface ApiResponse<T = unknown> {
  status: boolean;
  code: number;
  message: string;
  data: T;
}

export type imageResponseType = ApiResponse<string[]> | null;
export type logResponseType = ApiResponse<LogType[]> | null;
export type signoutResponseType = ApiResponse<{ data: null }> | null;

export type authResponseType = ApiResponse<{
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
  message?: string;
}> | null;

export type forgotPasswordResponseType = ApiResponse<{
  resetToken: string;
}> | null;
