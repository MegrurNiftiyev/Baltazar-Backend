import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as homeService from './home.service.js';
import { uploadImage } from '../../utils/uploadImage.js';
import { AppError } from '../../errors/AppError.js';

export const getBannerController = catchAsync(async (_req: Request, res: Response) => {
  const banner = await homeService.getBanners();
  res.status(200).json({ success: true, data: banner });
});

export const createBannerController = catchAsync(async (req: Request, res: Response) => {
  if (!req.file && !req.body.image) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Banner must have an image');
  }
  const imageUrl = req.file ? await uploadImage(req.file, 'banners') : req.body.image;
  const banner = await homeService.createBanner({ ...req.body, image: imageUrl });
  res.status(201).json({ success: true, data: banner });
});

export const updateBannerController = catchAsync(async (req: Request, res: Response) => {
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = await uploadImage(req.file, 'banners');
  }
  const banner = await homeService.updateBanner(req.params.id as string, { ...req.body, image: imageUrl });
  res.status(200).json({ success: true, data: banner });
});

export const deleteBannerController = catchAsync(async (req: Request, res: Response) => {
  const result = await homeService.deleteBanner(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});

export const getExploreController = catchAsync(async (req: Request, res: Response) => {
  const explore = await homeService.getExplore(req.user?.userId);
  res.status(200).json({ success: true, data: explore });
});
