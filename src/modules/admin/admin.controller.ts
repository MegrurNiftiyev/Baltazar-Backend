import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as adminService from './admin.service.js';

export const addAdminController = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.promoteToAdmin(req.body.userId);
  res.status(200).json({ success: true, data: result });
});

export const getAllFlowboxesController = catchAsync(async (req: Request, res: Response) => {
  const flowboxes = await adminService.getAllFlowboxes(req.validatedQuery as Record<string, string>);
  res.status(200).json({ success: true, data: flowboxes });
});

export const getFlowboxByIdController = catchAsync(async (req: Request, res: Response) => {
  const flowbox = await adminService.getFlowboxById(req.params.id as string);
  res.status(200).json({ success: true, data: flowbox });
});

export const updateFlowboxStatusController = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.updateFlowboxStatus(req.params.id as string, req.body.status);
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
