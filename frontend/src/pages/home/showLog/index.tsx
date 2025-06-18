import { useGetLogs } from "../../../api/hooks/logs/useGetLogs";
import { Card } from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import type { LogType } from "../../../interface/logType";

export const ShowLog = () => {
  const { data, isLoading } = useGetLogs();

  const logs = data?.data;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Recent Logs</h1>

      <Card>
        <Table>
          <TableCaption>Recent Logs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>User Agent</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-end">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : (
              logs.map((log: LogType) => (
                <TableRow key={log.id}>
                  <TableCell>{log.ip}</TableCell>
                  <TableCell>{log.userAgent}</TableCell>
                  <TableCell>
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-end">
                    <button
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      onClick={() => console.log(`Delete log ${log.id}`)}>
                      X
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Logs: {data?.length || 0}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  );
};
