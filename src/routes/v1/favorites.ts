import { listFavoritesV1 } from "#src/controllers/index.js";
import { wrapController } from "#src/utils/index.js";
import { Router } from "express";

const router = Router();

router.route("/favorite")
  .get(wrapController(listFavoritesV1));

router.route("/favorite/:profile_id")
  .get(wrapController(listFavoritesV1));

export default router;
