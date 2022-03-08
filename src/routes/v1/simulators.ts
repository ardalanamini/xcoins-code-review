import { getSimulatorV1, listSimulatorsV1, postSimulatorV1 } from "#src/controllers/index.js";
import { Router } from "express";

const router = Router();

router.route("/simulator")
  .get(listSimulatorsV1);

router.route("/simulator/:profile_id")
  .get(getSimulatorV1)
  .post(postSimulatorV1);

export default router;
