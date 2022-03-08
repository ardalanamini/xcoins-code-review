import { Favorite, FavoriteI } from "#src/models/index.js";
import { celebrate, Joi, Segments } from "celebrate";
import { RequestHandler } from "express";
import { FilterQuery } from "mongoose";

export const listFavoritesV1: RequestHandler[] = [
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        profile_id: Joi.string().required(), // TODO: ObjectID conversion.
      })
      .required(),
  }),
  async (req, res) => {
    const { profile_id } = req.params;

    const query: FilterQuery<FavoriteI> = {};

    if (profile_id != null) query.profile_id = profile_id;

    const favorites = await Favorite.find(query).lean();

    res.json({ favorites });
  },
];
