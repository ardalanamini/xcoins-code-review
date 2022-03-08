import { Router } from "express";
import favorites from "./favorites.js";
import profiles from "./profiles.js";
import simulators from "./simulators.js";

const router = Router();

router
  .use(favorites)
  .use(profiles)
  .use(simulators);

export default Router().use("/v1", router);
