import { Joi } from "#src/lib/index.js";
import { Profile } from "#src/models/index.js";
import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";

export const postProfileV1: RequestHandler[] = [
  celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(3).required(),
        nickname: Joi.string().min(3).required(),
      })
      .required(),
  }),
  async (req, res) => {
    const { email, name, nickname } = req.body;

    let profile = await Profile.findOne({
      $or: [{ email }, { nickname }],
    });

    if (!profile) {
      profile = await Profile.create({ name, email, nickname });
    }

    res.json({ profile });
  },
];
