import { Document, model, Model, Schema, Types } from "mongoose";

const schema = new Schema<SimulatorSchemaI>(
  {
    profile_id: Schema.Types.ObjectId,
    dateRecorded: Date,
    cryptocurrency: String,
    euros: Number,
    price: Number,
    quantity: Number,
  },
  {
    timestamps: true,
  },
);

export const Simulator = model<SimulatorSchemaI, SimulatorModelI>("Simulator", schema);

/* ------------------------- Interfaces ------------------------- */

export interface SimulatorI {
  profile_id?: Types.ObjectId;
  dateRecorded?: Date;
  cryptocurrency?: string;
  euros?: number;
  price?: number;
  quantity?: number;
}

export interface SimulatorSchemaI extends Document, SimulatorI {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SimulatorModelI extends Model<SimulatorSchemaI> {
}
