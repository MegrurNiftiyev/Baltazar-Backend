import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import * as servicesService from './services.service.js';

export const getAllServicesController = catchAsync(async (req: Request, res: Response) => {
  const services = await servicesService.getAllServices();
  res.status(200).json({ success: true, data: localize(services, req.lang!) });
});

export const getServiceByIdController = catchAsync(async (req: Request, res: Response) => {
  const service = await servicesService.getServiceById(req.params.id as string);
  res.status(200).json({ success: true, data: localize(service, req.lang!) });
});

export const createServiceController = catchAsync(async (req: Request, res: Response) => {
  const service = await servicesService.createService(req.body);
  res.status(201).json({ success: true, data: localize(service, req.lang!) });
});

export const updateServiceController = catchAsync(async (req: Request, res: Response) => {
  const service = await servicesService.updateService(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: localize(service, req.lang!) });
});

export const deleteServiceController = catchAsync(async (req: Request, res: Response) => {
  const result = await servicesService.deleteService(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});
