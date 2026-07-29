import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as homeService from './home.service.js';

export const getBannerController = catchAsync(async (_req: Request, res: Response) => {
  const banner = await homeService.getBanner();
  res.status(200).json({ success: true, data: banner });
});

export const getExploreController = catchAsync(async (req: Request, res: Response) => {
  const explore = await homeService.getExplore(req.user?.userId);
  res.status(200).json({ success: true, data: explore });
});
