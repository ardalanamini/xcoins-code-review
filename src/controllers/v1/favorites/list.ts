import { Joi } from "#src/lib/index.js";
import { Favorite, FavoriteI } from "#src/models/index.js";
import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";
import { FilterQuery, Types } from "mongoose";

export const listFavoritesV1 = [
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        profile_id: Joi.string().objectId(),
      })
      .required(),
    [Segments.QUERY]: Joi.object()
      .keys({
        skip: Joi.number().integer().min(0).default(0),
        limit: Joi.number().integer().min(1).max(100).default(50),
      })
      .required(),
  }),
  async (req, res) => {
    const { profile_id } = req.params;
    const { skip, limit } = req.query;

    const query: FilterQuery<FavoriteI> = {};

    if (profile_id != null) query.profile_id = profile_id;

    const total_count = await Favorite.countDocuments(query);

    let favorites: FavoriteI[] = [];

    if (total_count > skip) {
      favorites = await Favorite.find(query)
        .skip(skip)
        .limit(limit)
        .lean();
    }

    res.json({
      favorites,
      meta: {
        skip,
        limit,
        page_count: favorites.length,
        total_count,
      },
    });
  },
] as RequestHandler<{ profile_id?: Types.ObjectId }, unknown, unknown, { skip: number, limit: number }>[];
