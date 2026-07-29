import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as usersService from './users.service.js';
import * as authService from '../auth/auth.service.js';

export const getProfileController = catchAsync(async (req: Request, res: Response) => {
  const profile = await usersService.getProfile(req.user!.userId);
  res.status(200).json({ success: true, data: profile });
});

export const updateProfileController = catchAsync(async (req: Request, res: Response) => {
  const profile = await usersService.updateProfile(req.user!.userId, req.body);
  res.status(200).json({ success: true, data: profile });
});

export const disableUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.revokeUserSessions(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});
