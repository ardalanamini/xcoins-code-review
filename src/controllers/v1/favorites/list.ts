import { Favorite, FavoriteI } from "#src/models/index.js";
import { RequestHandler } from "express";
import { FilterQuery } from "mongoose";

export const listFavoritesV1: RequestHandler = async (req, res) => {
  const { profile_id } = req.params;

  const query: FilterQuery<FavoriteI> = {};

  if (profile_id != null) query.profile_id = profile_id;

  const favorites = await Favorite.find(query).lean();

  res.json({ favorites });
};
