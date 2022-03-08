import { wrapRequestHandlers } from "#src/utils/index.js";

it("should not catch any errors (sync)", (done) => {
  expect.assertions(1);

  const [wrapped] = wrapRequestHandlers([(req, res, next) => {
    next();
  }]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapped(null as any, null as any, (error) => {
    expect(error).toBeUndefined();

    done();
  });
});

it("should catch error (sync)", (done) => {
  expect.assertions(1);

  const ERROR = new Error("test");

  const [wrapped] = wrapRequestHandlers([() => {
    throw ERROR;
  }]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapped(null as any, null as any, (error) => {
    expect(error).toEqual(ERROR);

    done();
  });
});

it("should not catch any errors (async)", (done) => {
  expect.assertions(1);

  const [wrapped] = wrapRequestHandlers([async (req, res, next) => {
    next();
  }]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapped(null as any, null as any, (error) => {
    expect(error).toBeUndefined();

    done();
  });
});

it("should catch error (async)", (done) => {
  expect.assertions(1);

  const ERROR = new Error("test");

  const [wrapped] = wrapRequestHandlers([async () => {
    throw ERROR;
  }]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapped(null as any, null as any, (error) => {
    expect(error).toEqual(ERROR);

    done();
  });
});
