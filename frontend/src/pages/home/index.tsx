import { StoreLog } from "./storeLog";
import { ShowLog } from "./showLog";
import { ImagesShow } from "./images";
import { StoreImages } from "./storeImage";
import { Navbar } from "./Navbar";

export const HomePage = () => {
  return (
    <main className="container mx-auto ">
      <Navbar />

      <section className="p-6 flex flex-col gap-6">
        <StoreLog />

        <ShowLog />

        <StoreImages />

        <ImagesShow />
      </section>
    </main>
  );
};
