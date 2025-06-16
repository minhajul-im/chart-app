import LogModel from "../models/Log.js";
import {
  readFileLogs,
  saveFileLog,
  updateFileLog,
} from "../services/fileService.js";
import { logValidationError } from "../utils/errorHandler.js";

export const getAllLogs = async (req, res) => {
  const logs = await readFileLogs();

  res.status(200).json({
    code: 200,
    status: true,
    message: "Logs retrieved successfully",
    data: logs,
  });
};

export const storeLog = (req, res, next) => {
  logValidationError(req, res, next);

  const logData = new LogModel(req.body);

  saveFileLog(logData);

  res.status(201).json({
    code: 201,
    status: true,
    message: "Log created successfully",
    data: logData,
  });
};

export const updateLog = async (req, res, next) => {
  const logId = req.params?.id;
  if (!logId) {
    return res.status(400).json({
      code: 400,
      status: false,
      errors: ["Log ID is required for update"],
      message: "Log ID is required for update",
    });
  }

  const data = await readFileLogs();

  const logIndex = data.findIndex((log) => log?.id === logId);
  if (logIndex === -1) {
    return res.status(404).json({
      code: 404,
      status: false,
      errors: ["Log ID not found"],
      message: "Log ID not found",
    });
  }

  const logData = req.body;
  const updatedLog = {
    ...data[logIndex],
    ...logData,
    updatedAt: new Date().toISOString(),
  };

  logValidationError(req, res, next);

  data[logIndex] = updatedLog;
  updateFileLog(data);

  res.status(201).json({
    code: 201,
    status: true,
    data: updatedLog,
    message: "Update successfully",
  });
};

export const deleteLog = async (req, res) => {
  const logId = req.params?.id;
  if (!logId) {
    return res.status(400).json({
      code: 400,
      status: false,
      errors: ["Log ID is required for deletion"],
      message: "Log ID is required for deletion",
    });
  }

  const data = await readFileLogs();

  const logIndex = data.findIndex((log) => log?.id === logId);
  if (logIndex === -1) {
    return res.status(404).json({
      code: 404,
      status: false,
      errors: ["Log ID not found"],
      message: "Log ID not found",
    });
  }

  data.splice(logIndex, 1);
  updateFileLog(data);

  res.status(200).json({
    code: 200,
    status: true,
    message: "Log deleted successfully",
  });
};
