import { Profile } from "#src/models/index.js";
import { RequestHandler } from "express";

export const postProfileV1: RequestHandler = async (req, res) => {
  const { email, name, nickname } = req.body;

  let profile = await Profile.findOne({
    $or: [{ email }, { nickname }],
  }).exec();

  if (!profile) {
    profile = await Profile.create({ name, email, nickname });
  }

  res.json(profile);
};
