import { Simulator } from "#src/models/index.js";
import { RequestHandler } from "express";

export const postSimulatorV1: RequestHandler = async (req, res) => {
  const { profile_id } = req.params;
  const newData = {
    ...req.body,
    profile_id,
  };
  console.log(newData);
  const simulator = await Simulator.create(newData);
  res.json(simulator);
};
