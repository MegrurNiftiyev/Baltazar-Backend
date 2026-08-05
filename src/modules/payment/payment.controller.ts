import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as paymentService from './payment.service.js';

export const getAllCardsController = catchAsync(async (req: Request, res: Response) => {
  const cards = await paymentService.getAllCards(req.user!.userId);
  res.status(200).json({ success: true, data: cards });
});

export const addCardController = catchAsync(async (req: Request, res: Response) => {
  const card = await paymentService.addCard(req.user!.userId, req.body);
  res.status(201).json({ success: true, data: card });
});

export const payController = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.processPayment(req.user!.userId, req.params.orderId as string, req.body);
  res.status(200).json({ success: true, data: result });
});
