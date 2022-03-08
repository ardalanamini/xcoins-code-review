import { Joi } from "#src/lib/index.js";
import { Favorite, FavoriteI } from "#src/models/index.js";
import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";
import { FilterQuery, Types } from "mongoose";

/* ------------------------- Controller ------------------------- */

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

/* ------------------------- Swagger ------------------------- */

/**
 * @openapi
 *
 * /v1/favorites/{profile_id}:
 *   get:
 *     tags:
 *       - Favorite
 *     description: Get favorites
 *     parameters:
 *       - $ref: "#/parameters/profile_id_parameter"
 *       - $ref: "#/parameters/skip_query"
 *       - $ref: "#/parameters/limit_query"
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: The favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - favorites
 *                 - meta
 *               properties:
 *                 favorites:
 *                   type: array
 *                   items:
 *                     $ref: "#/definitions/Favorite"
 *                 meta:
 *                   $ref: "#/definitions/Meta"
 *       400:
 *         $ref: "#/responses/400"
 *       500:
 *         $ref: "#/responses/500"
 *
 */
