import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { AppError } from '../../errors/AppError.js';
import { ENUM_REGISTRY, NAMESPACED_ENUM_REGISTRY } from './enums.registry.js';

export const getEnumController = catchAsync(async (req: Request, res: Response) => {
  const key = req.params.key as string;
  const values = ENUM_REGISTRY[key];
  if (!values) {
    throw new AppError(404, 'NOT_FOUND', `Unknown enum key: ${key}`);
  }
  res.status(200).json({ success: true, data: values });
});

export const getNamespacedEnumController = catchAsync(async (req: Request, res: Response) => {
  const { namespace, key } = req.params;
  const group = NAMESPACED_ENUM_REGISTRY[namespace as string];
  const values = group?.[key as string];
  if (!values) {
    throw new AppError(404, 'NOT_FOUND', `Unknown enum: ${namespace}/${key}`);
  }
  res.status(200).json({ success: true, data: values });
});
