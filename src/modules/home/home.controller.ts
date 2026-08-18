import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import { attachIsLikedToExploreSections } from '../../utils/wishlist.js';
import * as homeService from './home.service.js';

export const getBannerController = catchAsync(async (req: Request, res: Response) => {
  const banner = await homeService.getBanners();
  res.status(200).json({ success: true, data: localize(banner, req.lang!) });
});

export const createBannerController = catchAsync(async (req: Request, res: Response) => {
  const banner = await homeService.createBanner(req.body);
  res.status(201).json({ success: true, data: localize(banner, req.lang!) });
});

export const updateBannerController = catchAsync(async (req: Request, res: Response) => {
  const banner = await homeService.updateBanner(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: localize(banner, req.lang!) });
});

export const deleteBannerController = catchAsync(async (req: Request, res: Response) => {
  const result = await homeService.deleteBanner(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});

export const getExploreController = catchAsync(async (req: Request, res: Response) => {
  const explore = await homeService.getExplore(req.user?.userId, req.lang, req.region);
  const withLiked = attachIsLikedToExploreSections(explore, req.user?.wishlist);
  res.status(200).json({ success: true, data: localize(withLiked, req.lang!) });
});