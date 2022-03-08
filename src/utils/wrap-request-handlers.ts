import { Handler } from "express";

export function wrapRequestHandlers(handlers: Handler[]): Handler[] {
  return handlers.map(handler => (req, res, next) => {
    try {
      const result: unknown = handler(req, res, next);

      if (result instanceof Promise) result.catch(error => next(error));
    } catch (error) {
      next(error);
    }
  });
}
