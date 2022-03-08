import { SERVER_PORT } from "#src/config.js";
import "./database.js";
import server from "./server.js";

server.listen(SERVER_PORT, () => console.log(`✅ Listening to requests on port ${SERVER_PORT}`));
