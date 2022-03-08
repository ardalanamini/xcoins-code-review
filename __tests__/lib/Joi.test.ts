import { Joi } from "#src/lib/Joi.js";
import { Types } from "mongoose";

it("should validate objectId successfully", async() => {
  const objectId = new Types.ObjectId();

  const result = await Joi.string().objectId().validateAsync(objectId.toString());

  expect(objectId.equals(result)).toBe(true);
});

it("should fail validating objectId", async() => {
  expect.assertions(1);

  try {
    await Joi.string().objectId().validateAsync("asfdgfhuiy7t3yghasf");
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
  }
});

it("should validate decimal128 successfully", async() => {
  const decimal128 = "123.456789";

  const result = await Joi.string().decimal128().validateAsync(decimal128);

  expect(result.toString()).toEqual(decimal128);
});

it("should fail validating decimal128", async() => {
  expect.assertions(1);

  try {
    await Joi.string().decimal128().validateAsync("asfdgfhuiy7t3yghasf");
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
  }
});
