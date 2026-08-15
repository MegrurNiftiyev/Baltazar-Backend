import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import * as rentacarService from './rentacar.service.js';
import { incrementUserInterest } from '../home/home.service.js';



// ── Cars ───────────────────────────────────────────────────────────────

export const getCarsController = catchAsync(async (req: Request, res: Response) => {
  const result = await rentacarService.getCars(req.validatedQuery as any, req.lang, req.region);
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

export const getCarByIdController = catchAsync(async (req: Request, res: Response) => {
  const car = await rentacarService.getCarById(req.params.id as string, req.user?.userId, req.region);
  if (req.user) {
    void incrementUserInterest(req.user.userId, 'RENT_A_CAR').catch(() => {});
  }
  res.status(200).json({ success: true, data: localize(car, req.lang!) });
});


export const createCarController = catchAsync(async (req: Request, res: Response) => {
  const car = await rentacarService.createCar(req.body);
  res.status(201).json({ success: true, data: localize(car, req.lang!) });
});

export const updateCarController = catchAsync(async (req: Request, res: Response) => {
  const car = await rentacarService.updateCar(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: localize(car, req.lang!) });
});

export const deleteCarController = catchAsync(async (req: Request, res: Response) => {
  const result = await rentacarService.deleteCar(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});
