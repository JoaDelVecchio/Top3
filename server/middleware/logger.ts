import colors from 'colors';
import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const methodColors: Record<string, (text: string) => string> = {
    GET: colors.green,
    POST: colors.blue,
    PUT: colors.yellow,
    DELETE: colors.red,
  };

  const colorize = methodColors[req.method] || colors.white;

  console.log(
    colorize(
      `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    )
  );
  next();
};

export default logger;
