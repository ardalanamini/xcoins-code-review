import { Joi } from "#src/lib/index.js";
import { Profile } from "#src/models/index.js";
import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";

/* ------------------------- Controller ------------------------- */

export const postProfileV1: RequestHandler[] = [
  celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        profile: Joi.object()
          .keys({
            email: Joi.string().email().required(),
            name: Joi.string().min(3).required(),
            nickname: Joi.string().min(3).required(),
          })
          .required(),
      })
      .required(),
  }),
  async (req, res) => {
    const { email, name, nickname } = req.body.profile;

    let profile = await Profile.findOne({
      $or: [{ email }, { nickname }],
    });

    if (!profile) {
      profile = await Profile.create({ name, email, nickname });
    }

    res.json({ profile });
  },
];

/* ------------------------- Swagger ------------------------- */

/**
 * @openapi
 *
 * /v1/profiles:
 *   post:
 *     tags:
 *       - Profile
 *     description: Create a profile
 *     consumes:
 *      - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - profile
 *             properties:
 *               profile:
 *                 $ref: "#/definitions/Profile"
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: The profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - profile
 *               properties:
 *                 profile:
 *                   $ref: "#/definitions/Profile"
 *       400:
 *         $ref: "#/responses/400"
 *       500:
 *         $ref: "#/responses/500"
 *
 */
