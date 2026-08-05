import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as adminService from './admin.service.js';


export const addAdminController = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.promoteToAdmin(req.body.userId);
  res.status(200).json({ success: true, data: result });
});


export const getAllTransactionsController = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllTransactions(req.validatedQuery as any);
  res.status(200).json({
    success: true,
    data: result.items,
    pagination: {
      nextCursor: result.nextCursor,
      hasMore: result.hasMore,
      limit: Number(req.query.limit || 20),
    },
  });
});

export const getAllUsersController = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllUsers(req.validatedQuery as any);
  res.status(200).json({
    success: true,
    data: result.items,
    pagination: {
      nextCursor: result.nextCursor,
      hasMore: result.hasMore,
      limit: Number(req.query.limit || 20),
    },
  });
});

export const resetDatabaseController = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.user!.userId;
  await adminService.resetDatabase(adminId);
  res.status(200).json({ success: true, message: 'Database reset successfully' });
});
