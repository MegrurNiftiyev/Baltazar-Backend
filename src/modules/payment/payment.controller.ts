import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as paymentService from './payment.service.js';

export const payController = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.processPayment(req.user!.userId, req.params.orderId as string, req.body);
  res.status(200).json({ success: true, data: result });
});
