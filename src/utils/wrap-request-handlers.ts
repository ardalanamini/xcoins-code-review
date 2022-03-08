import { RequestHandler } from "express";

export function wrapRequestHandlers(handlers: RequestHandlerT[]): RequestHandlerT[] {
  return handlers.map(handler => (req, res, next) => {
    try {
      const result: unknown = handler(req, res, next);

      if (result instanceof Promise) result.catch(error => next(error));
    } catch (error) {
      next(error);
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestHandlerT = RequestHandler<any, any, any, any>;
