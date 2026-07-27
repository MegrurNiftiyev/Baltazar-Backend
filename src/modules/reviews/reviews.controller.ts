import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as reviewsService from './reviews.service.js';
import type { ReviewQuery } from './reviews.schema.js';

export const getReviewsController = catchAsync(async (req: Request, res: Response) => {
  const reviews = await reviewsService.getReviews(req.validatedQuery as ReviewQuery);
  res.status(200).json({ success: true, data: reviews });
});

export const createReviewController = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewsService.createReview(req.user!.userId, req.body);
  res.status(201).json({ success: true, data: review });
});

export const deleteReviewController = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewsService.deleteReview(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});
