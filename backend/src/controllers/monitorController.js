import { readFileMonitors, saveFileMonitor } from "../services/fileService.js";

export const getAllMonitors = async (req, res) => {
  const data = await readFileMonitors();
  res.status(200).json({
    code: 200,
    status: true,
    data,
    message: "Get all monitors successfully",
  });
};

export const storeMonitor = () => {
  setInterval(async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour === 12 && currentMinute === 48) {
      const newMonitor = {
        id: crypto.randomUUID(),
        cpu: process.cpuUsage(),
        memory: process.memoryUsage(),
        uptime: process.uptime(),
        platform: process.platform,
        arch: process.arch,
        version: process.version,
        pid: process.pid,
        createdAt: now.toISOString(),
      };
      await saveFileMonitor(newMonitor);
    }
  }, 1000);
};
