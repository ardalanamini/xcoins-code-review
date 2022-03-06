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
    timestamps: true,
  },
);

export const Favorite = model<FavoriteSchemaI, FavoriteModelI>("Favorite", schema);

/* ------------------------- Interfaces ------------------------- */

export interface FavoriteI {
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
