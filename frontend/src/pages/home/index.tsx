import { StoreLog } from "./storeLog";
import { ShowLog } from "./showLog";

export const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      <StoreLog />

      <ShowLog />
    </div>
  );
};
