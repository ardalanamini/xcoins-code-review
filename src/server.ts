import { CORS_ORIGINS } from "#src/config.js";
import { Sentry } from "#src/lib/index.js";
import routes from "#src/routes/index.js";
import bodyParser from "body-parser";
import { errors, isCelebrateError } from "celebrate";
import cors from "cors";
import express from "express";

const app = express();

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler({
  user: ["id"],
  ip: true,
}));
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(cors({ origin: CORS_ORIGINS }));

app.use(bodyParser.json());

app.use(routes);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler({
  shouldHandleError(error: Error): boolean {
    return !isCelebrateError(error);
  },
}));

app.use(errors());

export default app;
