import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as appConfigService from './appConfig.service.js';

export const getAppConfigController = catchAsync(async (_req: Request, res: Response) => {
  const config = await appConfigService.getAppConfig();
  res.status(200).json({ success: true, data: config });
});

export const updateAppConfigController = catchAsync(async (req: Request, res: Response) => {
  const config = await appConfigService.updateAppConfig(req.body);
  res.status(200).json({ success: true, data: config });
});
