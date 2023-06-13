import { RequestHandler } from 'express'
import usersServices from './users.services'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await usersServices.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export default { createUser }
