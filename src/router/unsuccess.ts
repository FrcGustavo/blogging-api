import { Response } from 'express';

const unsuccess = (
  res: Response,
  message: string,
  data: object,
  status: number
): void => {
  res.status(status).json({
    error: true,
    status,
    message,
    body: data,
  });
};

export default unsuccess;
