import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useStoreImages } from "../../../api/hooks/images/useStoreImages";
import toast from "react-hot-toast";

export const StoreImages = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: storeHook, isPending } = useStoreImages();

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
      "image/webp",
    ];
    const overSized = Array.from(files).some(
      (file) => file.size > 5 * 1024 * 1024
    );
    const invalidType = Array.from(files).some(
      (file) => !allowedTypes.includes(file.type.toLowerCase())
    );
    if (invalidType) {
      setError("Only JPEG, PNG, GIF, JPG, or WEBP images are allowed.");
      setPreviews([]);
      return;
    }
    if (overSized) {
      setError("Each file must be less than 5MB.");
      setPreviews([]);
      return;
    }
    const newPreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const files = inputRef.current?.files;
    if (!files) return;
    const dt = new DataTransfer();
    Array.from(files)
      .filter((_, i) => i !== index)
      .forEach((file) => dt.items.add(file));
    if (inputRef.current) {
      inputRef.current.files = dt.files;
    }
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = inputRef.current?.files;
    if (!files || files.length === 0) {
      setError("Please select at least one image.");
      setIsSubmitting(false);
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    const overSized = Array.from(files).some(
      (file) => file.size > 5 * 1024 * 1024
    );
    const invalidType = Array.from(files).some(
      (file) => !allowedTypes.includes(file.type.toLowerCase())
    );
    if (invalidType) {
      setError("Only JPEG, PNG, GIF, JPG, or WEBP images are allowed.");
      setIsSubmitting(false);
      return;
    }
    if (overSized) {
      setError("Each file must be less than 5MB.");
      setIsSubmitting(false);
      return;
    }

    const postData = new FormData();
    Array.from(files).forEach((file) => {
      postData.append("images", file);
    });

    storeHook(postData, {
      onSuccess: (res) => {
        if (res?.status) {
          setError(null);
          setIsSubmitting(false);
          setPreviews([]);
          toast.success(res?.message);
        }
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Upload Store Images</CardTitle>
        <p className="text-sm text-gray-500">
          Upload product images (JPEG, PNG, GIF, JPG, or WEBP). Max 5MB per
          file.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700 mb-2">
              Select Images
            </label>
            <input
              id="images"
              type="file"
              multiple
              ref={inputRef}
              onChange={onFileChange}
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              accept="image/jpeg,image/png,image/gif,image/jpg,image/webp"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          {previews.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Selected Images ({previews.length})
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {previews.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image">
                      ×
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                      {inputRef.current?.files?.[index]?.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || previews.length === 0}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                isSubmitting || previews.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
              {isSubmitting || isPending ? "Uploading..." : "Upload Images"}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
