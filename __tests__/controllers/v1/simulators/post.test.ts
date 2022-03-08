import { factory, http, serialize } from "#test";

it("should create a new simulator", async () => {
  const profile = await factory.profile();

  const simulator = {
    recorded_at: new Date(),
    cryptocurrency: "BTC",
    euros: "123.456789",
    price: "234.567891",
    quantity: "345.678912",
  } as const;

  const { body } = await http()
    .post(`/v1/simulators/${profile._id}`)
    .send({ simulator })
    .expect(200);

  expect(body).toMatchObject({
    simulator: {
      ...serialize(simulator),
      euros: { $numberDecimal: simulator.euros },
      price: { $numberDecimal: simulator.price },
      quantity: { $numberDecimal: simulator.quantity },
    },
  });
});
