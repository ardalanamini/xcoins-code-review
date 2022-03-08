import { Simulator, SimulatorI } from "#src/models/index.js";
import { Types } from "mongoose";

export async function simulator(simulator: Partial<SimulatorI> = {}) {
  return Simulator.create({
    profile_id: new Types.ObjectId(),
    recorded_at: new Date(),
    cryptocurrency: "cryptocurrency",
    euros: Types.Decimal128.fromString("0"),
    price: Types.Decimal128.fromString("0"),
    quantity: Types.Decimal128.fromString("0"),
    ...simulator,
  });
}
