import toast from "react-hot-toast";
import type { PostDataType, PostLogResponse } from "../interface/logType";

export const storeLog = (
  postData: PostDataType,
  storeHook: (
    data: PostDataType,
    options: { onSuccess: (res: PostLogResponse) => void }
  ) => void,
  reset: () => void
) => {
  storeHook(postData, {
    onSuccess: (res: PostLogResponse) => {
      if (res?.status) {
        toast.success(res?.message || "Log submitted successfully");
        reset();
      }
    },
  });
};
