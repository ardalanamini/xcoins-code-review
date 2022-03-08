import { Simulator, SimulatorI } from "#src/models/index.js";
import { RequestHandler } from "express";
import { FilterQuery } from "mongoose";

export const listSimulatorsV1: RequestHandler = async (req, res) => {
  const { profile_id } = req.params;

  const query: FilterQuery<SimulatorI> = {};

  if (profile_id != null) query.profile_id = profile_id;

  const simulators = await Simulator.find(query).lean();

  res.json({ simulators });
};
