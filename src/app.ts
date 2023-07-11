import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

app.use(cors());
app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/', routes);

// //Testing route
app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    sucess: true,
    message: 'Welcome to university portal auth management',
  });
});

//global error handler
app.use(globalErrorHandler);

//not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    sucess: false,
    message: 'Route not Found',
    errorMessages: [
      {
        path: req.originalUrl + ' not found',
        message: 'Route not Found',
      },
    ],
  });
  next();
});

export default app;
