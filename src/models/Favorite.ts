import { COLLECTION, MODEL, TIMESTAMPS, TimestampsI } from "#src/constants/index.js";
import { Document, model, Model, Schema, Types } from "mongoose";

// TODO: information required.
const schema = new Schema<FavoriteSchemaI>(
  {
    profile_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    favorite1: {
      type: String,
    },
    favorite2: {
      type: String,
    },
    favorite3: {
      type: String,
    },
  },
  {
    collection: COLLECTION.FAVORITE,
    timestamps: TIMESTAMPS,
  },
);

export const Favorite = model<FavoriteSchemaI, FavoriteModelI>(MODEL.FAVORITE, schema);

/* ------------------------- Interfaces ------------------------- */

export interface FavoriteI extends TimestampsI {
  profile_id: Types.ObjectId;
  name: string;
  favorite1?: string;
  favorite2?: string;
  favorite3?: string;
}

export interface FavoriteSchemaI extends Document, FavoriteI {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FavoriteModelI extends Model<FavoriteSchemaI> {
}
