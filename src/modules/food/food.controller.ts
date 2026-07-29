import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import * as foodService from './food.service.js';
import { incrementUserInterest } from '../home/home.service.js';

// ── Companies ──────────────────────────────────────────────────────────

export const getCompaniesController = catchAsync(async (req: Request, res: Response) => {
  const companies = await foodService.getCompanies();
  res.status(200).json({ success: true, data: localize(companies, req.lang!) });
});

export const getCompanyByIdController = catchAsync(async (req: Request, res: Response) => {
  const company = await foodService.getCompanyById(req.params.id as string);
  res.status(200).json({ success: true, data: localize(company, req.lang!) });
});

export const createCompanyController = catchAsync(async (req: Request, res: Response) => {
  const company = await foodService.createCompany(req.body);
  res.status(201).json({ success: true, data: localize(company, req.lang!) });
});

export const updateCompanyController = catchAsync(async (req: Request, res: Response) => {
  const company = await foodService.updateCompany(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: localize(company, req.lang!) });
});

export const deleteCompanyController = catchAsync(async (req: Request, res: Response) => {
  const result = await foodService.deleteCompany(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});

// ── Food Items ─────────────────────────────────────────────────────────

export const getFoodItemsController = catchAsync(async (req: Request, res: Response) => {
  const items = await foodService.getFoodItems(req.validatedQuery as Record<string, string>);
  res.status(200).json({ success: true, data: localize(items, req.lang!) });
});

export const getFoodItemByIdController = catchAsync(async (req: Request, res: Response) => {
  const item = await foodService.getFoodItemById(req.params.id as string);
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
