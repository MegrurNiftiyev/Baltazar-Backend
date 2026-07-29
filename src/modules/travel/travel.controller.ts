import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import * as travelService from './travel.service.js';
import { incrementUserInterest } from '../home/home.service.js';

// ── Companies ──────────────────────────────────────────────────────────

export const getCompaniesController = catchAsync(async (req: Request, res: Response) => {
  const companies = await travelService.getCompanies();
  res.status(200).json({ success: true, data: localize(companies, req.lang!) });
});

export const getCompanyByIdController = catchAsync(async (req: Request, res: Response) => {
  const company = await travelService.getCompanyById(req.params.id as string);
  res.status(200).json({ success: true, data: localize(company, req.lang!) });
});

export const createCompanyController = catchAsync(async (req: Request, res: Response) => {
  const company = await travelService.createCompany(req.body);
  res.status(201).json({ success: true, data: localize(company, req.lang!) });
});

export const updateCompanyController = catchAsync(async (req: Request, res: Response) => {
  const company = await travelService.updateCompany(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: localize(company, req.lang!) });
});

export const deleteCompanyController = catchAsync(async (req: Request, res: Response) => {
  const result = await travelService.deleteCompany(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});

// ── Tours ──────────────────────────────────────────────────────────────

export const getToursController = catchAsync(async (req: Request, res: Response) => {
  const tours = await travelService.getTours(req.validatedQuery as Record<string, string>);
  res.status(200).json({ success: true, data: localize(tours, req.lang!) });
});

export const getTourByIdController = catchAsync(async (req: Request, res: Response) => {
  const tour = await travelService.getTourById(req.params.id as string);
  if (req.user) {
    void incrementUserInterest(req.user.userId, 'TRAVEL').catch(() => {});
  }
  res.status(200).json({ success: true, data: localize(tour, req.lang!) });
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
