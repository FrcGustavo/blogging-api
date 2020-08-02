import { Response } from 'express';

const success = (res: Response, message: string, data: object, status: number): void => {
  res
    .status(status)
    .json({
      error: false,
      status,
      message,
      body: data,
    });
};

export default success;
