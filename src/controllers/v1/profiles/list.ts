import { Joi } from "#src/lib/index.js";
import { Profile, ProfileI } from "#src/models/index.js";
import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";

export const listProfilesV1 = [
  celebrate({
    [Segments.QUERY]: Joi.object()
      .keys({
        skip: Joi.number().integer().min(0).default(0),
        limit: Joi.number().integer().min(1).max(100).default(50),
      })
      .required(),
  }),
  async (req, res) => {
    const { skip, limit } = req.query;

    const total_count = await Profile.countDocuments();

    let profiles: ProfileI[] = [];

    if (total_count > skip) {
      profiles = await Profile.find()
        .skip(skip)
        .limit(limit)
        .lean();
    }

    res.json({
      profiles,
      meta: {
        skip,
        limit,
        page_count: profiles.length,
        total_count,
      },
    });
  },
] as RequestHandler<unknown, unknown, unknown, { skip: number, limit: number }>[];
