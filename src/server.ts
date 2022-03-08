import { CORS_ORIGINS } from "#src/config.js";
import routes from "#src/routes/index.js";
import bodyParser from "body-parser";
import { errors } from "celebrate";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors({ origin: CORS_ORIGINS }));

app.use(bodyParser.json());

app.use(routes);

app.use(errors());

export default app;
