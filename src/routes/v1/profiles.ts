import { listProfilesV1, postProfileV1 } from "#src/controllers/index.js";
import { wrapRequestHandlers } from "#src/utils/index.js";
import { Router } from "express";

const router = Router();

router.route("/profile")
  .get(...wrapRequestHandlers(listProfilesV1))
  .post(...wrapRequestHandlers(postProfileV1));

export default router;
