import { COLLECTION, MODEL } from "#src/constants/index.js";
import { Document, model, Model, Schema, Types } from "mongoose";

// TODO: information required.
const schema = new Schema<ProfileSchemaI>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    capital: {
      type: Schema.Types.Decimal128,
      required: true,
      default: Types.Decimal128.fromString("0"),
      min: 0,
    },
    divisa: {
      type: String,
    },
    prefered_cryptocurrency: {
      type: String,
    },
  },
  {
    collection: COLLECTION.PROFILE,
  },
);

export const Profile = model<ProfileSchemaI, ProfileModelI>(MODEL.PROFILE, schema);

/* ------------------------- Interfaces ------------------------- */

export interface ProfileI {
  email: `${string}@${string}.${string}`;
  name: string;
  nickname: string;
  capital: Types.Decimal128;
  divisa?: string;
  prefered_cryptocurrency?: string;
}

export interface ProfileSchemaI extends Document, ProfileI {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileModelI extends Model<ProfileSchemaI> {
}
