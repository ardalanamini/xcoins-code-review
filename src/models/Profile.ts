import { COLLECTION, MODEL } from "#src/constants/index.js";
import { Document, model, Model, Schema } from "mongoose";

const schema = new Schema<ProfileSchemaI>(
  {
    name: String,
    nickname: String,
    email: String,
    capital: Number,
    divisa: String,
    prefered_cryptocurrency: String,
  },
  {
    collection: COLLECTION.PROFILE,
  },
);

export const Profile = model<ProfileSchemaI, ProfileModelI>(MODEL.PROFILE, schema);

/* ------------------------- Interfaces ------------------------- */

export interface ProfileI {
  name?: string;
  nickname?: string;
  email?: string;
  capital?: number;
  divisa?: string;
  prefered_cryptocurrency?: string;
}

export interface ProfileSchemaI extends Document, ProfileI {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileModelI extends Model<ProfileSchemaI> {
}
