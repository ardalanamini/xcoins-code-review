import { factory, http, serialize } from "#test";

it("should create a new profile", async () => {
  const profile = {
    email: "example@example.com",
    name: "John Due",
    nickname: "John",
  } as const;

  const { body } = await http()
    .post("/v1/profiles")
    .send({ profile })
    .expect(200);

  expect(body).toMatchObject({ profile });
});

it("should respond the already existing profile", async () => {
  const data = {
    email: "example@example.com",
    name: "John Due",
    nickname: "John",
  } as const;

  const profile = await factory.profile(data);

  await http()
    .post("/v1/profiles")
    .send({ profile: data })
    .expect(200)
    .expect({ profile: serialize(profile) });
});
