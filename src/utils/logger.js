/**
 * This file sets up the logging functionality using Winston.
 * It configures the logger format and transports.
 *
 * Use this logger throughout the application to log messages and errors.
 */
import winston from "winston";

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = "MMM-DD-YYYY HH:mm:ss";

// logger
export const logger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      return `${level.toLocaleUpperCase()}::${timestamp}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // save all error logs in a file
    new winston.transports.File({ filename: "error.log", level: "error" }),
    // save all info logs in a file
    new winston.transports.File({ filename: "info.log", level: "info" }),
  ],
});
