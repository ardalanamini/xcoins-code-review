import { DATABASE_URI } from "#src/config.js";
import mongoose from "mongoose";

mongoose
  .connect(DATABASE_URI)
  .then(() => console.log("✅ Database connection established!"))
  .catch((error) => {
    console.log("❌ Failed to establish database connection!");

    console.error(error);

    process.exit(1);
  });
