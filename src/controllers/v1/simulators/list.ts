import { Joi } from "#src/lib/index.js";
import { Simulator, SimulatorI } from "#src/models/index.js";
import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";
import { FilterQuery } from "mongoose";

export const listSimulatorsV1: RequestHandler[] = [
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        profile_id: Joi.string().objectId().required(),
      })
      .required(),
  }),
  async (req, res) => {
    const { profile_id } = req.params;

    const query: FilterQuery<SimulatorI> = {};

    if (profile_id != null) query.profile_id = profile_id;

    const simulators = await Simulator.find(query).lean();

    res.json({ simulators });
  },
];
