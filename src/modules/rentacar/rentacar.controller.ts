import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import * as rentacarService from './rentacar.service.js';

// ── Companies ──────────────────────────────────────────────────────────

export const getCompaniesController = catchAsync(async (req: Request, res: Response) => {
  const companies = await rentacarService.getCompanies();
  res.status(200).json({ success: true, data: localize(companies, req.lang!) });
});

export const getCompanyByIdController = catchAsync(async (req: Request, res: Response) => {
  const company = await rentacarService.getCompanyById(req.params.id as string);
  res.status(200).json({ success: true, data: localize(company, req.lang!) });
});

export const createCompanyController = catchAsync(async (req: Request, res: Response) => {
  const company = await rentacarService.createCompany(req.body);
  res.status(201).json({ success: true, data: company });
});

export const updateCompanyController = catchAsync(async (req: Request, res: Response) => {
  const company = await rentacarService.updateCompany(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: company });
});

export const deleteCompanyController = catchAsync(async (req: Request, res: Response) => {
  const result = await rentacarService.deleteCompany(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});

// ── Cars ───────────────────────────────────────────────────────────────

export const getCarsController = catchAsync(async (req: Request, res: Response) => {
  const cars = await rentacarService.getCars(req.validatedQuery as Record<string, string>);
  res.status(200).json({ success: true, data: cars });
});

export const getCarByIdController = catchAsync(async (req: Request, res: Response) => {
  const car = await rentacarService.getCarById(req.params.id as string);
  res.status(200).json({ success: true, data: localize(car, req.lang!) });
});

export const createCarController = catchAsync(async (req: Request, res: Response) => {
  const car = await rentacarService.createCar(req.body);
  res.status(201).json({ success: true, data: car });
});

export const updateCarController = catchAsync(async (req: Request, res: Response) => {
  const car = await rentacarService.updateCar(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: car });
});

export const deleteCarController = catchAsync(async (req: Request, res: Response) => {
  const result = await rentacarService.deleteCar(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});
