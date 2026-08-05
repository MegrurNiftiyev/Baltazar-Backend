import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as reviewsService from './reviews.service.js';


export const getReviewsController = catchAsync(async (req: Request, res: Response) => {
  const role = req.user?.role;
  const result = await reviewsService.getReviews(req.validatedQuery as any, role);
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

export const createReviewController = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewsService.createReview(req.user!.userId, req.body);
  res.status(201).json({ success: true, data: review });
});

export const getReviewByIdController = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewsService.getReviewById(req.params.id as string);
  res.status(200).json({ success: true, data: review });
});

export const updateReviewController = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewsService.updateReview(req.params.id as string, req.user!.userId, req.body);
  res.status(200).json({ success: true, data: review });
});

export const deleteReviewController = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewsService.deleteReview(req.params.id as string, req.user!.userId, req.user!.role);
  res.status(200).json({ success: true, data: result });
});

