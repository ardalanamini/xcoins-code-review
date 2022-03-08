export * from "./v1/index.js";

/* ------------------------- Swagger ------------------------- */

/**
 * @openapi
 *
 * definitions:
 *
 *   Meta:
 *     type: object
 *     required:
 *       - skip
 *       - limit
 *       - page_count
 *       - total_count
 *     properties:
 *       skip:
 *         type: integer
 *         format: int64
 *         minimum: 0
 *         default: 0
 *         example: 10
 *       limit:
 *         type: integer
 *         format: int64
 *         minimum: 1
 *         maximum: 100
 *         default: 50
 *         example: 10
 *       page_count:
 *         type: integer
 *         format: int64
 *         minimum: 0
 *         example: 10
 *       total_count:
 *         type: integer
 *         format: int64
 *         minimum: 0
 *         example: 1000
 *
 * parameters:
 *
 *   skip_query:
 *     description: "Pagination skip parameter"
 *     in: query
 *     name: skip
 *     schema:
 *       type: integer
 *       format: int64
 *       minimum: 0
 *       default: 0
 *       example: 10
 *
 *   limit_query:
 *     description: "Pagination limit parameter"
 *     in: query
 *     name: limit
 *     schema:
 *       type: integer
 *       format: int64
 *       minimum: 1
 *       maximum: 100
 *       default: 50
 *       example: 25
 *
 * responses:
 *
 *   400:
 *     description: "Bad Request"
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             - statusCode
 *             - error
 *             - message
 *             - validation
 *           properties:
 *             statusCode:
 *               type: integer
 *               format: int32
 *               example: 400
 *             error:
 *               type: string
 *               example: Bad Request
 *             message:
 *               type: string
 *               example: Validation failed
 *             validation:
 *               type: object
 *
 *   500:
 *     description: "Internal Server Error"
 *
 */
