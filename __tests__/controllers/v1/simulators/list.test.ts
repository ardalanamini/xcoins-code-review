import { factory, http, serialize } from "#test";
import { orderBy } from "lodash";
import { Types } from "mongoose";

it("should respond with empty simulators", async () => {
  await http()
    .get("/v1/simulators")
    .expect(200)
    .expect({
      simulators: [],
      meta: {
        skip: 0,
        limit: 50,
        page_count: 0,
        total_count: 0,
      },
    });
});

it("should respond with the simulators", async () => {
  const simulators = [
    await factory.simulator(),
    await factory.simulator(),
    await factory.simulator(),
  ];

  await http()
    .get("/v1/simulators")
    .expect(200)
    .expect({
      simulators: orderBy(serialize(simulators), ["created_at"], "desc"),
      meta: {
        skip: 0,
        limit: 50,
        page_count: simulators.length,
        total_count: simulators.length,
      },
    });
});

it("should respond with the simulators (filtered by profile_id)", async () => {
  const profile_id = new Types.ObjectId();

  const [, ...simulators] = [
    await factory.simulator(),
    await factory.simulator({ profile_id }),
    await factory.simulator({ profile_id }),
  ];

  await http()
    .get(`/v1/simulators/${profile_id}`)
    .expect(200)
    .expect({
      simulators: orderBy(serialize(simulators), ["created_at"], "desc"),
      meta: {
        skip: 0,
        limit: 50,
        page_count: simulators.length,
        total_count: simulators.length,
      },
    });
});

it("should respond with the simulators (while skipping 1 record)", async () => {
  const simulators = [
    await factory.simulator(),
    await factory.simulator(),
    await factory.simulator(),
  ];

  await http()
    .get("/v1/simulators")
    .query({
      skip: 1,
    })
    .expect(200)
    .expect({
      simulators: orderBy(serialize(simulators), ["created_at"], "desc").slice(1),
      meta: {
        skip: 1,
        limit: 50,
        page_count: simulators.length - 1,
        total_count: simulators.length,
      },
    });
});

it("should respond with the simulators (while limiting 1 record)", async () => {
  const simulators = [
    await factory.simulator(),
    await factory.simulator(),
    await factory.simulator(),
  ];

  await http()
    .get("/v1/simulators")
    .query({
      limit: 1,
    })
    .expect(200)
    .expect({
      simulators: orderBy(serialize(simulators), ["created_at"], "desc").slice(0, 1),
      meta: {
        skip: 0,
        limit: 1,
        page_count: 1,
        total_count: simulators.length,
      },
    });
});

it("should respond with the simulators (while skipping 1 & limiting 1 record)", async () => {
  const simulators = [
    await factory.simulator(),
    await factory.simulator(),
    await factory.simulator(),
  ];

  await http()
    .get("/v1/simulators")
    .query({
      skip: 1,
      limit: 1,
    })
    .expect(200)
    .expect({
      simulators: orderBy(serialize(simulators), ["created_at"], "desc").slice(1, 2),
      meta: {
        skip: 1,
        limit: 1,
        page_count: 1,
        total_count: simulators.length,
      },
    });
});
