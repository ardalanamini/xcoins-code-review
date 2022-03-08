import { listFavoritesV1 } from "#src/controllers/index.js";
import { wrapRequestHandlers } from "#src/utils/index.js";
import { Router } from "express";

const router = Router();

router.route("/favorite")
  .get(...wrapRequestHandlers(listFavoritesV1));

router.route("/favorite/:profile_id")
  .get(...wrapRequestHandlers(listFavoritesV1));

export default router;
