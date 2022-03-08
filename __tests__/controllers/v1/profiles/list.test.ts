import { factory, http, serialize } from "#test";
import { orderBy } from "lodash";

it("should respond with empty profiles", async () => {
  await http()
    .get("/v1/profiles")
    .expect(200)
    .expect({
      profiles: [],
      meta: {
        skip: 0,
        limit: 50,
        page_count: 0,
        total_count: 0,
      },
    });
});

it("should respond with the profiles", async () => {
  const profiles = [
    await factory.profile(),
    await factory.profile(),
    await factory.profile(),
  ];

  await http()
    .get("/v1/profiles")
    .expect(200)
    .expect({
      profiles: orderBy(serialize(profiles), ["created_at"], "desc"),
      meta: {
        skip: 0,
        limit: 50,
        page_count: profiles.length,
        total_count: profiles.length,
      },
    });
});

it("should respond with the profiles (while skipping 1 record)", async () => {
  const profiles = [
    await factory.profile(),
    await factory.profile(),
    await factory.profile(),
  ];

  await http()
    .get("/v1/profiles")
    .query({
      skip: 1,
    })
    .expect(200)
    .expect({
      profiles: orderBy(serialize(profiles), ["created_at"], "desc").slice(1),
      meta: {
        skip: 1,
        limit: 50,
        page_count: profiles.length - 1,
        total_count: profiles.length,
      },
    });
});

it("should respond with the profiles (while limiting 1 record)", async () => {
  const profiles = [
    await factory.profile(),
    await factory.profile(),
    await factory.profile(),
  ];

  await http()
    .get("/v1/profiles")
    .query({
      limit: 1,
    })
    .expect(200)
    .expect({
      profiles: orderBy(serialize(profiles), ["created_at"], "desc").slice(0, 1),
      meta: {
        skip: 0,
        limit: 1,
        page_count: 1,
        total_count: profiles.length,
      },
    });
});

it("should respond with the profiles (while skipping 1 & limiting 1 record)", async () => {
  const profiles = [
    await factory.profile(),
    await factory.profile(),
    await factory.profile(),
  ];

  await http()
    .get("/v1/profiles")
    .query({
      skip: 1,
      limit: 1,
    })
    .expect(200)
    .expect({
      profiles: orderBy(serialize(profiles), ["created_at"], "desc").slice(1, 2),
      meta: {
        skip: 1,
        limit: 1,
        page_count: 1,
        total_count: profiles.length,
      },
    });
});
