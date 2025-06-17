import { useGetLogs } from "../../api/hooks/logs/useGetLogs";

export const HomePage = () => {
  const { data } = useGetLogs();
  console.log("Logs Data:", data);
  return <div>{JSON.stringify(data)}</div>;
};
