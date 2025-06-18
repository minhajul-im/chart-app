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
