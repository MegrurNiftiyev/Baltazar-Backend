import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as adminService from './admin.service.js';
import * as authService from '../auth/auth.service.js';

export const addAdminController = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.promoteToAdmin(req.body.userId);
  res.status(200).json({ success: true, data: result });
});

export const getAllOrdersController = catchAsync(async (req: Request, res: Response) => {
  const orders = await adminService.getAllOrders(req.validatedQuery as Record<string, string>);
  res.status(200).json({ success: true, data: orders });
});

export const getOrderByIdController = catchAsync(async (req: Request, res: Response) => {
  const order = await adminService.getOrderById(req.params.id as string);
  res.status(200).json({ success: true, data: order });
});

export const updateOrderStatusController = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.updateOrderStatus(req.params.id as string, req.body.status);
  res.status(200).json({ success: true, data: result });
});

export const getAllTransactionsController = catchAsync(async (req: Request, res: Response) => {
  const transactions = await adminService.getAllTransactions(req.validatedQuery as Record<string, string>);
  res.status(200).json({ success: true, data: transactions });
});

export const getAllReviewsController = catchAsync(async (_req: Request, res: Response) => {
  const reviews = await adminService.getAllReviews();
  res.status(200).json({ success: true, data: reviews });
});

export const deleteReviewController = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.deleteReview(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});

export const disableUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.revokeUserSessions(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});
