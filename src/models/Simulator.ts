import { COLLECTION, MODEL, TIMESTAMPS, TimestampsI } from "#src/constants/index.js";
import { Document, model, Model, Schema, Types } from "mongoose";

/* ------------------------- Schema ------------------------- */

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
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
    },
    quantity: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
    },
  },
  {
    collection: COLLECTION.SIMULATOR,
    timestamps: TIMESTAMPS,
  },
);

/* ------------------------- Model ------------------------- */

export const Simulator = model<SimulatorSchemaI, SimulatorModelI>(MODEL.SIMULATOR, schema);

/* ------------------------- Interfaces ------------------------- */

export interface SimulatorI extends TimestampsI {
  profile_id: Types.ObjectId;
  recorded_at: Date;
  cryptocurrency: string;
  euros: Types.Decimal128;
  price: Types.Decimal128;
  quantity: Types.Decimal128;
}

export interface SimulatorSchemaI extends Document, SimulatorI {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SimulatorModelI extends Model<SimulatorSchemaI> {
}

/* ------------------------- Swagger ------------------------- */

/**
 * @openapi
 *
 * definitions:
 *   Simulator:
 *     allOf:
 *       - $ref: "#/definitions/DBDocument"
 *       - required:
 *           - profile_id
 *           - recorded_at
 *           - cryptocurrency
 *           - euros
 *           - price
 *           - quantity
 *         properties:
 *           profile_id:
 *             allOf:
 *               - $ref: "#/definitions/ObjectID"
 *               - readOnly: true
 *           recorded_at:
 *             $ref: "#/definitions/Timestamp"
 *           cryptocurrency:
 *             type: string
 *             example: BTC
 *           euros:
 *             $ref: "#/definitions/Decimal128"
 *           price:
 *             $ref: "#/definitions/Decimal128"
 *           quantity:
 *             $ref: "#/definitions/Decimal128"
 *
 * parameters:
 *   simulator_id_parameter:
 *     in: path
 *     name: simulator_id
 *     description: "Simulator id"
 *     schema:
 *       $ref: "#/definitions/ObjectID"
 *
 * tags:
 *   name: simulator_model
 *   x-displayName: Simulator
 *   description: |
 *     <SchemaDefinition schemaRef="#/definitions/Simulator" showReadOnly={true} showWriteOnly={true} />
 *
 */
