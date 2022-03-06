import { COLLECTION, MODEL, TIMESTAMPS, TimestampsI } from "#src/constants/index.js";
import { Document, model, Model, Schema, Types } from "mongoose";

// TODO: information required.
const schema = new Schema<SimulatorSchemaI>(
  {
    profile_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    recorded_at: {
      type: Date,
      required: true,
    },
    cryptocurrency: {
      type: String,
      required: true,
    },
    euros: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    collection: COLLECTION.SIMULATOR,
    timestamps: TIMESTAMPS,
  },
);

export const Simulator = model<SimulatorSchemaI, SimulatorModelI>(MODEL.SIMULATOR, schema);

/* ------------------------- Interfaces ------------------------- */

export interface SimulatorI extends TimestampsI {
  profile_id: Types.ObjectId;
  recorded_at: Date;
  cryptocurrency: string;
  euros: number;
  price: number;
  quantity: number;
}

export interface SimulatorSchemaI extends Document, SimulatorI {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SimulatorModelI extends Model<SimulatorSchemaI> {
}
