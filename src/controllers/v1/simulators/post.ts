import { Simulator } from "#src/models/index.js";
import { celebrate, Joi, Segments } from "celebrate";
import { RequestHandler } from "express";

export const postSimulatorV1: RequestHandler[] = [
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        profile_id: Joi.string().required(),
      })
      .required(),
    [Segments.BODY]: Joi.object()
      .keys({
        recorded_at: Joi.date().required(),
        cryptocurrency: Joi.string().required(), // TODO: Use enum.
        euros: Joi.string().required(), // TODO: Decimal128 conversion.
        price: Joi.string().required(), // TODO: Decimal128 conversion.
        quantity: Joi.string().required(), // TODO: Decimal128 conversion.
      })
      .required(),
  }),
  async (req, res) => {
    const { profile_id } = req.params;

    const simulator = await Simulator.create({
      ...req.body,
      profile_id,
    });

    res.json({ simulator });
  },
];
