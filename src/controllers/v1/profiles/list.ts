import { Profile } from "#src/models/index.js";
import { RequestHandler } from "express";

export const listProfilesV1: RequestHandler = async (req, res) => {
  const profile = await Profile.find().lean();
  console.log(profile);
  res.json({ profile });
};
