import { useStoreLog } from "../../../api/hooks/logs/useStoreLog";
import InputField from "../../../components/common/input";
import { Card } from "../../../components/ui/card";
import { storeLog } from "../../../controllers/logController";
import { useLogForm, type postDataType } from "../../../hooks/log/useLogForm";

export const StoreLog = () => {
  const { mutate: storeHook, isPending } = useStoreLog();
  const { register, handleSubmit, errors, reset } = useLogForm();

  const onSubmitFn = (postData: postDataType) => {
    storeLog(postData, storeHook, reset);
  };

  return (
    <Card>
      <form
        onSubmit={handleSubmit(onSubmitFn)}
        className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Upload Log</h1>
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
    </Card>
  );
};
