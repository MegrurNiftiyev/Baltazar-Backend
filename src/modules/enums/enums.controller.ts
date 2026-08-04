import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { ENUM_REGISTRY, type EnumKey } from './enums.registry.js';

function makeEnumController(key: EnumKey) {
  return catchAsync(async (_req: Request, res: Response) => {
    res.status(200).json({ success: true, data: ENUM_REGISTRY[key] });
  });
}

export const getRolesController              = makeEnumController('roles');
export const getServiceTypesController        = makeEnumController('service-types');
export const getCompanyStatusesController     = makeEnumController('company-statuses');
export const getFoodItemStatusesController    = makeEnumController('food-item-statuses');
export const getCarStatusesController         = makeEnumController('car-statuses');
export const getTransmissionsController       = makeEnumController('transmissions');
export const getFuelTypesController           = makeEnumController('fuel-types');
export const getReviewTargetTypesController   = makeEnumController('review-target-types');
export const getLanguagesController           = makeEnumController('languages');
export const getRegionsController             = makeEnumController('regions');
export const getCurrenciesController          = makeEnumController('currencies');
export const getCompanySectionsController     = makeEnumController('company-sections');
export const getOrderStatusesController       = makeEnumController('order-statuses');
export const getOrderScreensController        = makeEnumController('order-screens');
