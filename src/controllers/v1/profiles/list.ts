import { Joi } from "#src/lib/index.js";
import { Profile, ProfileI } from "#src/models/index.js";
import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";

/* ------------------------- Controller ------------------------- */

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

/* ------------------------- Swagger ------------------------- */

/**
 * @openapi
 *
 * /v1/profiles:
 *   get:
 *     tags:
 *       - Profile
 *     description: Get profiles
 *     parameters:
 *       - $ref: "#/parameters/skip_query"
 *       - $ref: "#/parameters/limit_query"
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: The profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - profiles
 *                 - meta
 *               properties:
 *                 profiles:
 *                   type: array
 *                   items:
 *                     $ref: "#/definitions/Profile"
 *                 meta:
 *                   $ref: "#/definitions/Meta"
 *       400:
 *         $ref: "#/responses/400"
 *       500:
 *         $ref: "#/responses/500"
 *
 */
