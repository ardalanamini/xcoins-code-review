import { Handler } from "express";

export function wrapController(controller: Handler): Handler {
  return (req, res, next) => {
    try {
      const result: unknown = controller(req, res, next);

      if (result instanceof Promise) result.catch(error => next(error));
    } catch (error) {
      next(error);
    }
  };
}
