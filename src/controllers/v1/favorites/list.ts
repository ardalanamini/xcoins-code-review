import { Favorite } from "#src/models/index.js";
import { RequestHandler } from "express";

export const listFavoritesV1: RequestHandler = async (req, res) => {
  const favorite = await Favorite.find().lean();
  console.log(favorite);
  res.json({ favorite });
};
