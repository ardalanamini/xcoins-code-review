import { Joi } from "#src/lib/index.js";
import { Simulator } from "#src/models/index.js";
import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";

/* ------------------------- Controller ------------------------- */

export const postSimulatorV1: RequestHandler[] = [
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        profile_id: Joi.string().objectId().required(),
      })
      .required(),
    [Segments.BODY]: Joi.object()
      .keys({
        simulator: Joi.object()
          .keys({
            recorded_at: Joi.date().required(),
            cryptocurrency: Joi.string().required(), // TODO: Use only accepted values. needs information.
            euros: Joi.string().decimal128().required(),
            price: Joi.string().decimal128().required(),
            quantity: Joi.string().decimal128().required(),
          })
          .required(),
      })
      .required(),
  }),
  async (req, res) => {
    const { profile_id } = req.params;

    const simulator = await Simulator.create({
      ...req.body,
      profile_id,
    });

    res.json({ simulator });
  },
];

/* ------------------------- Swagger ------------------------- */

/**
 * @openapi
 *
 * /v1/simulators/{profile_id}:
 *   post:
 *     tags:
 *       - Simulator
 *     description: Create a simulator
 *     parameters:
 *       - $ref: "#/parameters/profile_id_parameter"
 *     consumes:
 *      - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - simulator
 *             properties:
 *               simulator:
 *                 $ref: "#/definitions/Simulator"
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: The simulator
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - simulator
 *               properties:
 *                 simulator:
 *                   $ref: "#/definitions/Simulator"
 *       400:
 *         $ref: "#/responses/400"
 *       500:
 *         $ref: "#/responses/500"
 *
 */
