import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LOG_PATH = path.join(__dirname, "../../db/logs.json");
const MONITOR_PATH = path.join(__dirname, "../../db/monitor.json");
const IMAGES_PATH = path.join(__dirname, "../../db/images.json");
const USER_PATH = path.join(__dirname, "../../db/users.json");

const initFile = async (PATH) => {
  try {
    await fs.access(PATH);
  } catch (error) {
    await fs.writeFile(PATH, JSON.stringify([], null, 2));
  }
};

// Log Service
export const saveFileLog = async (newLog) => {
  await initFile(LOG_PATH);

  const data = await fs.readFile(LOG_PATH, "utf-8");
  const db = JSON.parse(data);

  db.push(newLog);

  await fs.writeFile(LOG_PATH, JSON.stringify(db, null, 2));
};

export const readFileLogs = async () => {
  await initFile(LOG_PATH);

  const data = await fs.readFile(LOG_PATH, "utf-8");
  return JSON.parse(data);
};

export const updateFileLog = async (data) => {
  await fs.writeFile(LOG_PATH, JSON.stringify(data, null, 2));
};

// Monitor Service
export const saveFileMonitor = async (newMonitor) => {
  await initFile(MONITOR_PATH);

  const data = await fs.readFile(MONITOR_PATH, "utf-8");
  const db = JSON.parse(data);

  db.push(newMonitor);

  await fs.writeFile(MONITOR_PATH, JSON.stringify(db, null, 2));
};

export const readFileMonitors = async () => {
  await initFile(MONITOR_PATH);

  const data = await fs.readFile(MONITOR_PATH, "utf-8");
  return JSON.parse(data);
};

// File Services
export const saveFileImages = async (images) => {
  await initFile(IMAGES_PATH);

  const data = await fs.readFile(IMAGES_PATH, "utf-8");
  const db = JSON.parse(data);

  images?.forEach((img) => db.push(img));

  await fs.writeFile(IMAGES_PATH, JSON.stringify(db, null, 2));
};

export const readFileImages = async () => {
  await initFile(IMAGES_PATH);

  const data = await fs.readFile(IMAGES_PATH, "utf-8");
  return JSON.parse(data);
};

// User Services
export const saveFileUser = async (user) => {
  await initFile(USER_PATH);

  const data = await fs.readFile(USER_PATH, "utf-8");
  const db = JSON.parse(data);

  db.push(user);

  await fs.writeFile(USER_PATH, JSON.stringify(db, null, 2));
};

export const updateFileUser = async (users) => {
  await fs.writeFile(USER_PATH, JSON.stringify(users, null, 2));
};

export const readFileUsers = async () => {
  await initFile(USER_PATH);

  const data = await fs.readFile(USER_PATH, "utf-8");
  return JSON.parse(data);
};
