import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../../db/logs.json");

export const initLogsFile = async () => {
  try {
    await fs.access(DB_PATH);
  } catch (error) {
    await fs.writeFile(DB_PATH, JSON.stringify([], null, 2));
  }
};

export const saveFileLog = async (newLog) => {
  await initLogsFile();

  const data = await fs.readFile(DB_PATH, "utf-8");
  const db = JSON.parse(data);

  db.push(newLog);

  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
};

export const readFileLogs = async () => {
  await initLogsFile();

  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
};

export const updateFileLog = async (data) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};
