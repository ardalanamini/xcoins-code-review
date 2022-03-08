import { Favorite } from "#src/models/index.js";
import { RequestHandler } from "express";

export const getFavoriteV1: RequestHandler = async (req, res) => {
  console.log(req.params);
  let query = {};
  const { profile_id } = req.params;
  query = { profile_id };
  console.log(query);
  const data = await Favorite.find(query);
  res.json(data);
};
