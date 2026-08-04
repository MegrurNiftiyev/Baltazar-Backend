import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as companiesService from './companies.service.js';

export const getCompaniesController = catchAsync(async (req: Request, res: Response) => {
  const result = await companiesService.getCompanies(req.query as any);
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

export const getCompanyByIdController = catchAsync(async (req: Request, res: Response) => {
  const data = await companiesService.getCompanyById(req.params.id as string, req.user?.userId);
  res.status(200).json({ success: true, data });
});

export const createCompanyController = catchAsync(async (req: Request, res: Response) => {
  const data = await companiesService.createCompany(req.body);
  res.status(201).json({ success: true, data });
});

export const updateCompanyController = catchAsync(async (req: Request, res: Response) => {
  const data = await companiesService.updateCompany(req.params.id as string, req.body);
  res.status(200).json({ success: true, data });
});

export const deleteCompanyController = catchAsync(async (req: Request, res: Response) => {
  const data = await companiesService.deleteCompany(req.params.id as string);
  res.status(200).json({ success: true, data });
});
