import { Profile } from "#src/models/index.js";
import express from "express";

const router = express.Router();

router.get("/api/profile", async (req, res) => {
  const profile = await Profile.find().lean();
  console.log(profile);
  res.json({ profile });
});

router.post("/api/profile", async (req, res) => {
  const { email, name, nickname } = req.body;

  let profile = await Profile.findOne({
    $or: [{ email }, { nickname }],
  }).exec();

  if (!profile) {
    profile = await Profile.create({ name, email, nickname });
  }

  res.json(profile);
});

export default router;
