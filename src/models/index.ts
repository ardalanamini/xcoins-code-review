export * from "./Favorite.js";
export * from "./Profile.js";
export * from "./Simulator.js";

/* ------------------------- Swagger ------------------------- */

/**
 * @openapi
 *
 * definitions:
 *   DBDocument:
 *     type: object
 *     required:
 *       - _id
 *       - created_at
 *       - updated_at
 *     properties:
 *       _id:
 *         allOf:
 *           - $ref: "#/definitions/ObjectID"
 *           - readOnly: true
 *       created_at:
 *         allOf:
 *           - $ref: "#/definitions/Timestamp"
 *           - readOnly: true
 *       updated_at:
 *         allOf:
 *           - $ref: "#/definitions/Timestamp"
 *           - readOnly: true
 *
 *   ObjectID:
 *     type: string
 *     format: ObjectID
 *     example: a1b2c3d
 *
 *   Decimal128:
 *     type: string
 *     format: Decimal128
 *     example: "123.456789"
 *
 *   Timestamp:
 *     type: string
 *     format: date-time
 *     example: 2022-02-13T20:38:28Z
 *
 */
