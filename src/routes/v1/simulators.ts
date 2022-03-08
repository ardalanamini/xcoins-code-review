import { getSimulatorV1, listSimulatorsV1, postSimulatorV1 } from "#src/controllers/index.js";
import { wrapController } from "#src/utils/index.js";
import { Router } from "express";

const router = Router();

router.route("/simulator")
  .get(wrapController(listSimulatorsV1));

router.route("/simulator/:profile_id")
  .get(wrapController(getSimulatorV1))
  .post(wrapController(postSimulatorV1));

export default router;
