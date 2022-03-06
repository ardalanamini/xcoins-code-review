import type { SchemaTimestampsConfig } from "mongoose";

export enum TIMESTAMP {
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
}

export const TIMESTAMPS: SchemaTimestampsConfig = {
  createdAt: TIMESTAMP.CREATED_AT,
  updatedAt: TIMESTAMP.UPDATED_AT,
};

export interface TimestampsI {
  created_at: Date,
  updated_at: Date,
}
