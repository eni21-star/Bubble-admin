// src/lib/logger.ts
import { createLogger, format, transports } from 'winston';

const isDev = process.env.NODE_ENV !== 'production';

export const logger = createLogger({
  level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),

  // Pretty in dev, compact JSON in prod
  format: isDev
    ? format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message, ...meta }) =>
          `${timestamp} [${level}] ${message}${
            Object.keys(meta).length ? ' ' + JSON.stringify(meta) : ''
          }`,
        ),
      )
    : format.combine(format.timestamp(), format.json()),

  transports: [
    new transports.Console(),

    // Optional: ONE persistent file (no rotation, grows indefinitely)
    // new transports.File({ filename: 'logs/app.log' })
  ],
});
