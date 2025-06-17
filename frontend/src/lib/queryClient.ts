import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60,
    },
  },
});

export const revalidateQueryFn = (query_key: string) => {
  queryClient.invalidateQueries({ queryKey: [query_key] });
};
