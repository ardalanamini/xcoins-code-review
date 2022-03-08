import { Simulator } from "#src/models/index.js";
import { RequestHandler } from "express";

export const listSimulatorsV1: RequestHandler = async (req, res) => {
  const simulator = await Simulator.find().lean();
  console.log(simulator);
  res.json({ simulator });
};
