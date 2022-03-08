import express from "express";
import favorites from "./favorite.router.js";
import profiles from "./profile.router.js";
import simulators from "./simulator.router.js";

const router = express.Router();

router
  .use(favorites)
  .use(profiles)
  .use(simulators);

export default router;
