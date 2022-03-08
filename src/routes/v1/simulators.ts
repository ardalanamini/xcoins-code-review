import { listSimulatorsV1, postSimulatorV1 } from "#src/controllers/index.js";
import { wrapRequestHandlers } from "#src/utils/index.js";
import { Router } from "express";

const router = Router();

router.route("/simulators")
  .get(...wrapRequestHandlers(listSimulatorsV1));

router.route("/simulators/:profile_id")
  .get(...wrapRequestHandlers(listSimulatorsV1))
  .post(...wrapRequestHandlers(postSimulatorV1));

export default router;
