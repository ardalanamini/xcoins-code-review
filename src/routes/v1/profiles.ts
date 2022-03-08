import { listProfilesV1, postProfileV1 } from "#src/controllers/index.js";
import { wrapController } from "#src/utils/index.js";
import { Router } from "express";

const router = Router();

router.route("/profile")
  .get(wrapController(listProfilesV1))
  .post(wrapController(postProfileV1));

export default router;
