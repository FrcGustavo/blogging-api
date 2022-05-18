import { Response } from 'express';

type SuccessParamas = {
  res: Response;
  message?: string;
  data?: any;
  status?: number;
};

export const success = ({
  res,
  message = 'request was successfully',
  data = false,
  status = 200,
}: SuccessParamas): void => {
  res.status(status).json({
    error: false,
    status,
    message,
    body: data,
  });
};

export default success;
