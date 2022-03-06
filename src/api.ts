import express from "express";
import { PORT, DBURL, CORS_ORIGINS } from "#src/config.js";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { router as favoriteRouter } from "#src/routes/favorite.router.js";
import { router as profileRouter } from "#src/routes/profile.router.js";
import { router as simulatorRouter } from "#src/routes/simulator.router.js";

mongoose
  .connect(`${DBURL}`, { useNewUrlParser: true, useUnifiedTopology: true })
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
  console.log(`✅  Ready on port http://localhost:${PORT}`)
);
