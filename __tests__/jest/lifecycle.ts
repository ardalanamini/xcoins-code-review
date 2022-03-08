import { connectDB, disconnectDB, resetDB } from "./database.js";

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await resetDB();
});

afterAll(async () => {
  await disconnectDB();
});
