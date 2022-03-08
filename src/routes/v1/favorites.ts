import { listFavoritesV1 } from "#src/controllers/index.js";
import { wrapRequestHandlers } from "#src/utils/index.js";
import { Router } from "express";

const router = Router();

router.route("/favorites")
  .get(...wrapRequestHandlers(listFavoritesV1));

router.route("/favorites/:profile_id")
  .get(...wrapRequestHandlers(listFavoritesV1));

export default router;
