import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import * as orderService from './order.service.js';

export const createOrderController = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req.user!.userId, req.body);
  res.status(201).json({ success: true, data: localize(order, req.lang!) });
});

export const getOrdersController = catchAsync(async (req: Request, res: Response) => {
  const role = req.user!.role;
  const orders = await orderService.getOrders(req.user!.userId, role, req.query);
  res.status(200).json({ success: true, data: localize(orders, req.lang!) });
});

export const getOrderByIdController = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.getOrderById(req.params.id as string, req.user!.userId, req.user!.role);
  res.status(200).json({ success: true, data: localize(order, req.lang!) });
});

export const advanceStepController = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.advanceStep(req.params.id as string, req.user!.userId, req.body);
  res.status(200).json({ success: true, data: localize(result, req.lang!) });
});

export const cancelOrderController = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.cancelOrder(req.params.id as string, req.user!.userId);
  res.status(200).json({ success: true, data: result });
});

export const getPaymentSummaryController = catchAsync(async (req: Request, res: Response) => {
  const summary = await orderService.getPaymentSummary(req.params.id as string, req.user!.userId);
  res.status(200).json({ success: true, data: summary });
});

export const updateOrderStatusController = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.updateOrderStatus(req.params.id as string, req.body.status);
  res.status(200).json({ success: true, data: result });
});
