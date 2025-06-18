import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const postDataSchema = z.object({
  ip: z.string().min(1, "IP Address is required"),
  userAgent: z.string().min(1, "User Agent is required"),
});

export type postDataType = z.infer<typeof postDataSchema>;

export const useLogForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<postDataType>({
    resolver: zodResolver(postDataSchema),
  });

  return { register, handleSubmit, errors, reset };
};
