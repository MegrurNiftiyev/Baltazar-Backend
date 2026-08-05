import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import * as wishlistService from './wishlist.service.js';

export const getWishlistController = catchAsync(async (req: Request, res: Response) => {
  const result = await wishlistService.getWishlist(req.user!.userId, req.query as any);
  res.status(200).json({
    success: true,
    data: localize(result.items, req.lang!),
    pagination: {
      nextCursor: result.nextCursor,
      hasMore: result.hasMore,
      limit: Number(req.query.limit || 20),
    },
  });
});

export const addToWishlistController = catchAsync(async (req: Request, res: Response) => {
  const result = await wishlistService.addToWishlist(req.user!.userId, req.body);
  res.status(201).json({ success: true, data: result });
});

export const removeFromWishlistController = catchAsync(async (req: Request, res: Response) => {
  const result = await wishlistService.removeFromWishlist(req.user!.userId, req.params.id as string);
  res.status(200).json({ success: true, data: result });
});
