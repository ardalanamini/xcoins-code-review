import { COLLECTION, MODEL, TIMESTAMPS } from "#src/constants/index.js";
import { Document, model, Model, Schema, Types } from "mongoose";

/* ------------------------- Schema ------------------------- */

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
    timestamps: TIMESTAMPS,
  },
);

/* ------------------------- Model ------------------------- */

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

/* ------------------------- Swagger ------------------------- */

/**
 * @openapi
 *
 * definitions:
 *   Profile:
 *     allOf:
 *       - $ref: "#/definitions/DBDocument"
 *       - required:
 *           - email
 *           - name
 *           - nickname
 *           - capital
 *         properties:
 *           email:
 *             type: string
 *             format: email
 *             example: ardalanamini22@gmail.com
 *           name:
 *             type: string
 *             example: Ardalan Amini
 *           nickname:
 *             type: string
 *             example: Ardalan
 *           capital:
 *             allOf:
 *               - $ref: "#/definitions/Decimal128"
 *               - readOnly: true
 *           divisa:
 *             type: string
 *             readOnly: true
 *           prefered_cryptocurrency:
 *             type: string
 *             readOnly: true
 *
 *
 * parameters:
 *   profile_id_parameter:
 *     in: path
 *     name: profile_id
 *     description: "Profile id"
 *     schema:
 *       $ref: "#/definitions/ObjectID"
 *
 * tags:
 *   name: profile_model
 *   x-displayName: Profile
 *   description: |
 *     <SchemaDefinition schemaRef="#/definitions/Profile" showReadOnly={true} showWriteOnly={true} />
 *
 */
