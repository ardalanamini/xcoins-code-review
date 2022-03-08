import server from "#src/server.js";
import supertest, { SuperTest, Test } from "supertest";

export function http(): SuperTest<Test> {
  return supertest(server);
}
