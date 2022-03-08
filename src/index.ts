import { SERVER_PORT } from "#src/config.js";
import { Sentry } from "#src/lib/index.js";
import { promisify } from "node:util";
import database from "./database.js";
import server from "./server.js";

const httpServer = server.listen(SERVER_PORT, () => console.log(`✅ Listening to requests on port ${SERVER_PORT}`));

/* ------------------------- Graceful Shutdown ------------------------- */

process
  .on("SIGTERM", shutdown)
  .on("SIGINT", shutdown);

async function shutdown() {
  console.log("\nGraceful shutdown initiated!");

  try {
    // Stop receiving new requests!
    await promisify(httpServer.close.bind(httpServer))();

    // Close the DB connection, now that there is no ongoing operations!
    await database.disconnect();

    console.log("Shutdown complete!");

    process.exit(0);
  } catch (error) {
    Sentry.captureException(error);

    console.log("Graceful shutdown failed! shutting down forcefully!");

    console.error(error);

    process.exit(1);
  }
}
