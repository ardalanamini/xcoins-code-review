import { Favorite } from "#src/models/index.js";
import { Router } from "express";

const router = Router();

router.get("/favorite", async (req, res) => {
  const favorite = await Favorite.find().lean();
  console.log(favorite);
  res.json({ favorite });
});

router.get("/favorite/:profile_id", async (req, res) => {
  console.log(req.params);
  let query = {};
  const { profile_id } = req.params;
  query = { profile_id };
  console.log(query);
  const data = await Favorite.find(query);
  res.json(data);
});

export default router;
