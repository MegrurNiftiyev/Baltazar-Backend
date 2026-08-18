import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import { attachIsLiked, attachIsLikedToItem } from '../../utils/wishlist.js';
import * as travelService from './travel.service.js';
import { incrementUserInterest } from '../home/home.service.js';

// ── Tours ──────────────────────────────────────────────────────────────

export const getToursController = catchAsync(async (req: Request, res: Response) => {
  const result = await travelService.getTours(req.validatedQuery as any, req.lang, req.region);
  const itemsWithLiked = attachIsLiked(result.items, req.user?.wishlist, 'TRAVEL');
  res.status(200).json({
    success: true,
    data: localize(itemsWithLiked, req.lang!),
    pagination: {
      nextCursor: result.nextCursor,
      hasMore: result.hasMore,
      limit: Number(req.query.limit || 20),
    },
  });
});

export const getTourByIdController = catchAsync(async (req: Request, res: Response) => {
  const tour = await travelService.getTourById(req.params.id as string, req.user?.userId, req.region, req.lang);
  if (req.user) {
    void incrementUserInterest(req.user.userId, 'TRAVEL').catch(() => {});
  }
  const tourWithLiked = attachIsLikedToItem(tour, req.user?.wishlist, 'TRAVEL');
  res.status(200).json({ success: true, data: localize(tourWithLiked, req.lang!) });
});


export const createTourController = catchAsync(async (req: Request, res: Response) => {
  const tour = await travelService.createTour(req.body);
  res.status(201).json({ success: true, data: localize(tour, req.lang!) });
});

export const updateTourController = catchAsync(async (req: Request, res: Response) => {
  const tour = await travelService.updateTour(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: localize(tour, req.lang!) });
});

export const deleteTourController = catchAsync(async (req: Request, res: Response) => {
  const result = await travelService.deleteTour(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});

// ── Included Services ──────────────────────────────────────────────────

export const getIncludedServicesController = catchAsync(async (req: Request, res: Response) => {
  const services = await travelService.getIncludedServices(req.params.serviceType as string);
  res.status(200).json({ success: true, data: localize(services, req.lang!) });
});

export const createIncludedServiceController = catchAsync(async (req: Request, res: Response) => {
  const service = await travelService.createIncludedService(req.body);
  res.status(201).json({ success: true, data: localize(service, req.lang!) });
});

export const updateIncludedServiceController = catchAsync(async (req: Request, res: Response) => {
  const service = await travelService.updateIncludedService(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: localize(service, req.lang!) });
});

export const deleteIncludedServiceController = catchAsync(async (req: Request, res: Response) => {
  const result = await travelService.deleteIncludedService(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});
