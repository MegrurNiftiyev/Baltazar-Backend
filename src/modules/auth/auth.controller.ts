import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as authService from './auth.service.js';

export const registerController = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  res.status(201).json({ success: true, data: result });
});

export const loginController = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  res.status(200).json({ success: true, data: result });
});

export const refreshController = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.refresh(req.body.refreshToken);
  res.status(200).json({ success: true, data: result });
});

export const googleLoginController = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.googleLogin(req.body);
  res.status(200).json({ success: true, data: result });
});
