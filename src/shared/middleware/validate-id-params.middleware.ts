
import { Request, Response, NextFunction } from 'express';
import { isUUID } from 'validator';

export const validateIdParams = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { id } = req.params;

  if (!isUUID(id)) {
    return res.status(400).json({ message: 'Invalid ID parameter.' });
  }

  next();
};