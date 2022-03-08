import { Joi } from "#src/lib/index.js";
import { Simulator } from "#src/models/index.js";
import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";

export const postSimulatorV1: RequestHandler[] = [
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        profile_id: Joi.string().objectId().required(),
      })
      .required(),
    [Segments.BODY]: Joi.object()
      .keys({
        recorded_at: Joi.date().required(),
        cryptocurrency: Joi.string().required(), // TODO: Use only accepted values. needs information.
        euros: Joi.string().decimal128().required(),
        price: Joi.string().decimal128().required(),
        quantity: Joi.string().decimal128().required(),
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
