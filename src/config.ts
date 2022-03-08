import { ENV } from "#src/constants/index.js";
import { config } from "dotenv";

function check(variable: string, defaultValue?: string) {
  const value = process.env[variable] || defaultValue;

  if (value) return value;

  throw new Error(`The environment variable "${variable}" is missing!`);
}

config();

export const NODE_ENV = process.env.NODE_ENV = check("NODE_ENV", ENV.DEVELOPMENT);

export const SERVER_PORT = parseInt(check("SERVER_PORT", "3000"), 10);

export const CORS_ORIGINS = check("CORS_ORIGINS", "http://localhost:3000").split(",");

export const DATABASE_URI = check("DATABASE_URI");

export const SENTRY_DSN = process.env.SENTRY_DSN;
