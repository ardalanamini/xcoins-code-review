import { factory, http, serialize } from "#test";
import { orderBy } from "lodash";
import { Types } from "mongoose";

it("should respond with empty favorites", async () => {
  await http()
    .get("/v1/favorites")
    .expect(200)
    .expect({
      favorites: [],
      meta: {
        skip: 0,
        limit: 50,
        page_count: 0,
        total_count: 0,
      },
    });
});

it("should respond with the favorites", async () => {
  const favorites = [
    await factory.favorite(),
    await factory.favorite(),
    await factory.favorite(),
  ];

  await http()
    .get("/v1/favorites")
    .expect(200)
    .expect({
      favorites: orderBy(serialize(favorites), ["created_at"], "desc"),
      meta: {
        skip: 0,
        limit: 50,
        page_count: favorites.length,
        total_count: favorites.length,
      },
    });
});

it("should respond with the favorites (filtered by profile_id)", async () => {
  const profile_id = new Types.ObjectId();

  const [, ...favorites] = [
    await factory.favorite(),
    await factory.favorite({ profile_id }),
    await factory.favorite({ profile_id }),
  ];

  await http()
    .get(`/v1/favorites/${profile_id}`)
    .expect(200)
    .expect({
      favorites: orderBy(serialize(favorites), ["created_at"], "desc"),
      meta: {
        skip: 0,
        limit: 50,
        page_count: favorites.length,
        total_count: favorites.length,
      },
    });
});

it("should respond with the favorites (while skipping 1 record)", async () => {
  const favorites = [
    await factory.favorite(),
    await factory.favorite(),
    await factory.favorite(),
  ];

  await http()
    .get("/v1/favorites")
    .query({
      skip: 1,
    })
    .expect(200)
    .expect({
      favorites: orderBy(serialize(favorites), ["created_at"], "desc").slice(1),
      meta: {
        skip: 1,
        limit: 50,
        page_count: favorites.length - 1,
        total_count: favorites.length,
      },
    });
});

it("should respond with the favorites (while limiting 1 record)", async () => {
  const favorites = [
    await factory.favorite(),
    await factory.favorite(),
    await factory.favorite(),
  ];

  await http()
    .get("/v1/favorites")
    .query({
      limit: 1,
    })
    .expect(200)
    .expect({
      favorites: orderBy(serialize(favorites), ["created_at"], "desc").slice(0, 1),
      meta: {
        skip: 0,
        limit: 1,
        page_count: 1,
        total_count: favorites.length,
      },
    });
});

it("should respond with the favorites (while skipping 1 & limiting 1 record)", async () => {
  const favorites = [
    await factory.favorite(),
    await factory.favorite(),
    await factory.favorite(),
  ];

  await http()
    .get("/v1/favorites")
    .query({
      skip: 1,
      limit: 1,
    })
    .expect(200)
    .expect({
      favorites: orderBy(serialize(favorites), ["created_at"], "desc").slice(1, 2),
      meta: {
        skip: 1,
        limit: 1,
        page_count: 1,
        total_count: favorites.length,
      },
    });
});
