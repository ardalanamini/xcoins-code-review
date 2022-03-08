import { Simulator } from "#src/models/index.js";
import { RequestHandler } from "express";

export const postSimulatorV1: RequestHandler = async (req, res) => {
  const { profile_id } = req.params;

  const simulator = await Simulator.create({
    ...req.body,
    profile_id,
  });

  res.json({ simulator });
};
