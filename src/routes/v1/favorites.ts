import { getFavoriteV1, listFavoritesV1 } from "#src/controllers/index.js";
import { Router } from "express";

const router = Router();

router.route("/favorite")
  .get(listFavoritesV1);

router.route("/favorite/:profile_id")
  .get(getFavoriteV1);

export default router;
