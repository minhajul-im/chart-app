import { useGetImages } from "../../../api/hooks/images/useGetImages";
import { Card, CardContent } from "../../../components/ui/card";

export const ImagesShow = () => {
  const { data, isLoading } = useGetImages();

  if (isLoading) return <h1>Loading...</h1>;

  if (!data) return <h1>Loading...</h1>;

  const images = data.data;

  return (
    <Card className="p-4">
      <h1 className="text-2xl font-bold">Recent Image</h1>
      <CardContent className="flex flex-col gap-4">
        {images?.length > 0 ? (
          images?.map((img: string, index: number) => (
            <div key={index}>
              <img src={img} alt={img} />
            </div>
          ))
        ) : (
          <div> NO images</div>
        )}
      </CardContent>
    </Card>
  );
};
