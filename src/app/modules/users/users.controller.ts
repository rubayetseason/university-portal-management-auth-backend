import { RequestHandler } from 'express'
import { z } from 'zod'
import { UserService } from './users.services'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // request validation by zod
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'Role is required',
        }),
        password: z.string().optional(),
      }),
    })
    // zod request async await handler and parser
    await createUserZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = { createUser }
