import { StoreLog } from "./storeLog";
import { ShowLog } from "./showLog";
import { ImagesShow } from "./images";
import { StoreImages } from "./storeImage";

export const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      <StoreLog />

      <ShowLog />

      <StoreImages />

      <ImagesShow />
    </div>
  );
};
