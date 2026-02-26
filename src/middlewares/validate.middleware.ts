import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';

export const validate =
  (schema: ZodType, source: 'body' | 'params' | 'query' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.issues.map((e) => ({
            path: e.path[0],
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };
