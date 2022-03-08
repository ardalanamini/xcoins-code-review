import { Joi as BaseJoi } from "celebrate";
import type { Root, StringSchema } from "joi";
import { Types } from "mongoose";

/* ------------------------- Library ------------------------- */

export const Joi: JoiI = BaseJoi.extend({
  base: BaseJoi.string(),
  type: "string",
  messages: {
    "string.objectId": "needs to be a valid ObjectId",
    "string.decimal128": "needs to be a valid decimal128",
  },
  rules: {
    objectId: {
      method() {
        return this.$_addRule("objectId");
      },
      validate(value, helpers) {
        if (!Types.ObjectId.isValid(value)) return helpers.error("string.objectId");

        return new Types.ObjectId(value);
      },
    },
    decimal128: {
      method() {
        return this.$_addRule("decimal128");
      },
      validate(value, helpers) {
        if (isNaN(parseFloat(value))) return helpers.error("string.decimal128");

        return Types.Decimal128.fromString(value);
      },
    },
  },
});

/* ------------------------- Interfaces ------------------------- */

export interface JoiI extends Root {
  string(): JoiStringSchemaI;
}

export interface JoiStringSchemaI extends StringSchema {
  /**
   * Requires the string value to be a valid ObjectId.
   */
  objectId(): this;

  /**
   * Requires the string value to be a valid Decimal128.
   */
  decimal128(): this;
}
