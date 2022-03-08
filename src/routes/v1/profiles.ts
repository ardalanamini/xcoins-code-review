import { listProfilesV1, postProfileV1 } from "#src/controllers/index.js";
import { Router } from "express";

const router = Router();

router.route("/profile")
  .get(listProfilesV1)
  .post(postProfileV1);

export default router;
