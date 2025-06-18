export interface PostDataType {
  ip: string;
  userAgent: string;
  visitedCount?: number;
}
export interface LogType {
  id: string;
  ip: string;
  userAgent: string;
  visitedCount: number;
  createdAt: string;
  updatedAt: string;
}
export interface PostLogResponse {
  code: number;
  status: boolean;
  message: string;
  data: PostDataType;
}
