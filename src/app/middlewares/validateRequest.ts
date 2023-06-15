import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // zod request async await handler and parser
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      })
      return next()
    } catch (error) {
      next(error)
    }
  }

export default validateRequest
