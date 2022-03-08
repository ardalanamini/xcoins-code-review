import { CORS_ORIGINS, DATABASE_URI, SERVER_PORT } from "#src/config.js";
import routes from "#src/routes/index.js";
import bodyParser from "body-parser";
import { errors } from "celebrate";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

mongoose
  .connect(DATABASE_URI)
  .then(() => {
    console.log("✅ Database connection established!");
  });

const app = express();
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.use(errors());

app.listen(SERVER_PORT, () =>
  console.log(`✅ Listening to requests on port ${SERVER_PORT}`),
);
