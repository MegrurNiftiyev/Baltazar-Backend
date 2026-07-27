import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as flowboxService from './flowbox.service.js';

export const createFlowBoxController = catchAsync(async (req: Request, res: Response) => {
  const flowBox = await flowboxService.createFlowBox(req.user!.userId, req.body);
  res.status(201).json({ success: true, data: flowBox });
});

export const getUserFlowBoxesController = catchAsync(async (req: Request, res: Response) => {
  const flowBoxes = await flowboxService.getUserFlowBoxes(req.user!.userId);
  res.status(200).json({ success: true, data: flowBoxes });
});

export const getFlowBoxByIdController = catchAsync(async (req: Request, res: Response) => {
  const flowBox = await flowboxService.getFlowBoxById(req.params.id as string, req.user!.userId);
  res.status(200).json({ success: true, data: flowBox });
});

export const advanceStepController = catchAsync(async (req: Request, res: Response) => {
  const result = await flowboxService.advanceStep(req.params.id as string, req.user!.userId, req.body);
  res.status(200).json({ success: true, data: result });
});

export const cancelFlowBoxController = catchAsync(async (req: Request, res: Response) => {
  const result = await flowboxService.cancelFlowBox(req.params.id as string, req.user!.userId);
  res.status(200).json({ success: true, data: result });
});

export const getFlowScreenConfigController = catchAsync(async (req: Request, res: Response) => {
  const config = await flowboxService.getFlowScreenConfig(req.params.serviceType as string);
  res.status(200).json({ success: true, data: config });
});

export const updateFlowScreenConfigController = catchAsync(async (req: Request, res: Response) => {
  const config = await flowboxService.updateFlowScreenConfig(req.params.serviceType as string, req.body);
  res.status(200).json({ success: true, data: config });
});
