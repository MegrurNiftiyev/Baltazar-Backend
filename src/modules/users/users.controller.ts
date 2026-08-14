import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as usersService from './users.service.js';
import * as authService from '../auth/auth.service.js';

export const getProfileController = catchAsync(async (req: Request, res: Response) => {
  const profile = await usersService.getProfile(req.user!.userId);
  res.status(200).json({ success: true, data: profile });
});

export const updateBasicProfileController = catchAsync(async (req: Request, res: Response) => {
  const profile = await usersService.updateBasicProfile(req.user!.userId, req.body);
  res.status(200).json({ success: true, data: profile });
});

export const updateProfilePhotoController = catchAsync(async (req: Request, res: Response) => {
  const avatarUrl = req.body.avatarUrl || req.body.avatar;
  const profile = await usersService.updateAvatar(req.user!.userId, avatarUrl);
  res.status(200).json({ success: true, data: profile });
});

export const updatePersonalInfoController = catchAsync(async (req: Request, res: Response) => {
  const profile = await usersService.updatePersonalInfo(req.user!.userId, req.body);
  res.status(200).json({ success: true, data: profile });
});

export const updatePassportInfoController = catchAsync(async (req: Request, res: Response) => {
  const profile = await usersService.updatePassportInfo(req.user!.userId, req.body);
  res.status(200).json({ success: true, data: profile });
});

export const updateDriverLicenseInfoController = catchAsync(async (req: Request, res: Response) => {
  const profile = await usersService.updateDriverLicenseInfo(req.user!.userId, req.body);
  res.status(200).json({ success: true, data: profile });
});

export const updateAvatarController = catchAsync(async (req: Request, res: Response) => {
  const avatarUrl = req.body.avatarUrl || req.body.avatar;
  const profile = await usersService.updateAvatar(req.user!.userId, avatarUrl);
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
