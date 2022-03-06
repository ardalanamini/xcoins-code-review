import { COLLECTION, MODEL, TIMESTAMPS, TimestampsI } from "#src/constants/index.js";
import { Document, model, Model, Schema } from "mongoose";

const schema = new Schema<FavoriteSchemaI>(
  {
    profile_id: String,
    name: String,
    favorite1: String,
    favorite2: String,
    favorite3: String,
  },
  {
    collection: COLLECTION.FAVORITE,
    timestamps: TIMESTAMPS,
  },
);

export const Favorite = model<FavoriteSchemaI, FavoriteModelI>(MODEL.FAVORITE, schema);

/* ------------------------- Interfaces ------------------------- */

export interface FavoriteI extends TimestampsI {
  profile_id?: string;
  name?: string;
  favorite1?: string;
  favorite2?: string;
  favorite3?: string;
}

export interface FavoriteSchemaI extends Document, FavoriteI {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FavoriteModelI extends Model<FavoriteSchemaI> {
}
