import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import * as foodService from './food.service.js';
import { incrementUserInterest } from '../home/home.service.js';



// ── Food Items ─────────────────────────────────────────────────────────

export const getFoodItemsController = catchAsync(async (req: Request, res: Response) => {
  const result = await foodService.getFoodItems(req.validatedQuery as any, req.lang, req.region);
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

export const getFoodItemByIdController = catchAsync(async (req: Request, res: Response) => {
  const item = await foodService.getFoodItemById(req.params.id as string, req.user?.userId, req.region);
  if (req.user) {
    void incrementUserInterest(req.user.userId, 'FOOD').catch(() => {});
  }
  res.status(200).json({ success: true, data: localize(item, req.lang!) });
});


export const createFoodItemController = catchAsync(async (req: Request, res: Response) => {
  const item = await foodService.createFoodItem(req.body);
  res.status(201).json({ success: true, data: localize(item, req.lang!) });
});

export const updateFoodItemController = catchAsync(async (req: Request, res: Response) => {
  const item = await foodService.updateFoodItem(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: localize(item, req.lang!) });
});

export const deleteFoodItemController = catchAsync(async (req: Request, res: Response) => {
  const result = await foodService.deleteFoodItem(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});
