import { Request, Response, NextFunction } from 'express';
import AppError from '../lib/AppError';
import { NODE_ENV } from '../config';

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDevelopment = NODE_ENV === 'development';

  //Handle Custom App Errors
  if (err instanceof AppError) {
    console.error(
      `Status: ${err.status} | ${
        isDevelopment
          ? `Stack: ${err.stack}`
          : `[AppError] Message: ${err.message}`
      }`
    );
    res.status(err.status).json({ message: err.message });
    return;
  }

  //Handle Standar Errors
  if (err instanceof Error) {
    console.error(
      isDevelopment ? `Stack: ${err.stack}` : `[Error] Message: ${err.message}`
    );
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  //Fallback
  console.error('[Unexpected Error]', err);
  res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
