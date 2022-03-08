import { COLLECTION, MODEL, TIMESTAMPS, TimestampsI } from "#src/constants/index.js";
import { Document, model, Model, Schema, Types } from "mongoose";

/* ------------------------- Schema ------------------------- */

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

/* ------------------------- Model ------------------------- */

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

/* ------------------------- Swagger ------------------------- */

/**
 * @openapi
 *
 * definitions:
 *   Favorite:
 *     allOf:
 *       - $ref: "#/definitions/DBDocument"
 *       - required:
 *           - profile_id
 *           - name
 *         properties:
 *           profile_id:
 *             $ref: "#/definitions/ObjectID"
 *           name:
 *             type: string
 *           favorite1:
 *             type: string
 *           favorite2:
 *             type: string
 *           favorite3:
 *             type: string
 *
 * parameters:
 *   favorite_id_parameter:
 *     in: path
 *     name: favorite_id
 *     description: "Favorite id"
 *     schema:
 *       $ref: "#/definitions/ObjectID"
 *
 * tags:
 *   name: favorite_model
 *   x-displayName: Favorite
 *   description: |
 *     <SchemaDefinition schemaRef="#/definitions/Favorite" showReadOnly={true} showWriteOnly={true} />
 *
 */
