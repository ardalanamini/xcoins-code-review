import { Profile } from "#src/models/index.js";
import { RequestHandler } from "express";

export const listProfilesV1: RequestHandler[] = [
  async (req, res) => {
    const profiles = await Profile.find().lean();

    res.json({ profiles });
  },
];
