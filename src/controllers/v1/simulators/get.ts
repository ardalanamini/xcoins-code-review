import { Simulator } from "#src/models/index.js";
import { RequestHandler } from "express";

export const getSimulatorV1: RequestHandler = async (req, res) => {
  console.log("========== ");
  let query = {};
  const { profile_id } = req.params;
  console.log({ profile_id });
  query = { profile_id };
  const data = await Simulator.find(query);
  res.json(data);
};
