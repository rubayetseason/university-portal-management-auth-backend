import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', UserRoutes)

// //Testing route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   //error throw type -1
//   throw new ApiError(400, 'Working successfully')
//   //error throw type -2
//   next('Next er Error')
// })

//global error handler
app.use(globalErrorHandler)

export default app
