import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as adminService from './admin.service.js';
import type { ListUsersQuery } from './admin.schema.js';

export const addAdminController = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.promoteToAdmin(req.body.userId);
  res.status(200).json({ success: true, data: result });
});


export const getAllTransactionsController = catchAsync(async (req: Request, res: Response) => {
  const transactions = await adminService.getAllTransactions(req.validatedQuery as Record<string, string>);
  res.status(200).json({ success: true, data: transactions });
});

export const getAllUsersController = catchAsync(async (req: Request, res: Response) => {
  const query = req.validatedQuery as unknown as ListUsersQuery;
  const { users, nextCursor } = await adminService.getAllUsers({
    limit: query.limit,
    startAfterId: query.cursor,
    role: query.role,
  });
  res.status(200).json({ success: true, data: users, meta: { nextCursor } });
});

export const resetDatabaseController = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.user!.userId;
  await adminService.resetDatabase(adminId);
  res.status(200).json({ success: true, message: 'Database reset successfully' });
});
