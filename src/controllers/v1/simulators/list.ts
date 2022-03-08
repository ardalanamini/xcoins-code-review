import { Joi } from "#src/lib/index.js";
import { Simulator, SimulatorI } from "#src/models/index.js";
import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";
import { FilterQuery, Types } from "mongoose";

/* ------------------------- Controller ------------------------- */

export const listSimulatorsV1 = [
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

    const query: FilterQuery<SimulatorI> = {};

    if (profile_id != null) query.profile_id = profile_id;

    const total_count = await Simulator.countDocuments(query);

    let simulators: SimulatorI[] = [];

    if (total_count > skip) {
      simulators = await Simulator.find(query)
        .sort("-created_at")
        .skip(skip)
        .limit(limit)
        .lean();
    }

    res.json({
      simulators,
      meta: {
        skip,
        limit,
        page_count: simulators.length,
        total_count,
      },
    });
  },
] as RequestHandler<{ profile_id?: Types.ObjectId }, unknown, unknown, { skip: number, limit: number }>[];

/* ------------------------- Swagger ------------------------- */

/**
 * @openapi
 *
 * /v1/simulators/{profile_id}:
 *   get:
 *     tags:
 *       - Simulator
 *     description: Get simulators
 *     parameters:
 *       - $ref: "#/parameters/simulator_id_parameter"
 *       - $ref: "#/parameters/skip_query"
 *       - $ref: "#/parameters/limit_query"
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: The simulators
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - simulators
 *                 - meta
 *               properties:
 *                 simulators:
 *                   type: array
 *                   items:
 *                     $ref: "#/definitions/Simulator"
 *                 meta:
 *                   $ref: "#/definitions/Meta"
 *       400:
 *         $ref: "#/responses/400"
 *       500:
 *         $ref: "#/responses/500"
 *
 */
