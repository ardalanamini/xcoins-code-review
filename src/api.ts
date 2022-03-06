import { CORS_ORIGINS, DBURL, PORT } from "#src/config.js";
import { router as favoriteRouter } from "#src/routes/favorite.router.js";
import { router as profileRouter } from "#src/routes/profile.router.js";
import { router as simulatorRouter } from "#src/routes/simulator.router.js";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

mongoose
  .connect(`${DBURL}`)
  .then(() => {
    console.log(`Connected to DB ${DBURL}`);
  });

const app = express();
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favoriteRouter);
app.use(profileRouter);
app.use(simulatorRouter);

app.listen(PORT, () =>
  console.log(`✅  Ready on port http://localhost:${PORT}`),
);
