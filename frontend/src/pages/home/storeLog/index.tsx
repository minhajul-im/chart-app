import { useStoreLog } from "../../../api/hooks/logs/useStoreLog";
import InputField from "../../../components/common/input";
import { storeLog } from "../../../controllers/logController";
import { useLogForm, type postDataType } from "../../../hooks/log/useLogForm";

export const StoreLog = () => {
  const { mutate: storeHook, isPending } = useStoreLog();
  const { register, handleSubmit, errors, reset } = useLogForm();

  const onSubmitFn = (postData: postDataType) => {
    storeLog(postData, storeHook, reset);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitFn)}
      className="flex flex-col gap-4 p-6 border rounded shadow-md">
      <InputField
        label="IP Address"
        placeholder="Enter IP Address"
        error={errors.ip?.message}
        {...register("ip")}
      />
      <InputField
        label="User Agent"
        placeholder="Enter User Agent"
        error={errors.userAgent?.message}
        {...register("userAgent")}
      />
      <button
        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        type="submit">
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
