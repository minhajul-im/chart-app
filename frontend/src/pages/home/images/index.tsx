import { useGetImages } from "../../../api/hooks/images/useGetImages";
import { Card, CardContent } from "../../../components/ui/card";

export const ImagesShow = () => {
  const { data, isLoading } = useGetImages();

  return (
    <Card className="p-4">
      <h1 className="text-2xl font-bold">Recent Image</h1>
      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          "Loading..."
        ) : data && data.data?.length > 0 ? (
          data.data.map((img: string, index: number) => (
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
