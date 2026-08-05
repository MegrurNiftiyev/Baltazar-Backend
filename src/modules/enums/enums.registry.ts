import { roleEnum } from '../admin/admin.schema.js';
import { serviceTypeEnum } from '../../shared/serviceType.js';
import { companyStatusEnum, regionEnum, currencyEnum, companyDetailSectionEnum } from '../../shared/enums.js';
import { foodItemStatusEnum } from '../food/food.schema.js';
import { carStatusEnum, transmissionEnum, fuelTypeEnum } from '../rentacar/rentacar.schema.js';
import { orderStatusEnum, orderScreenKeyEnum } from '../order/order.schema.js';
import { reviewTargetTypeEnum } from '../reviews/reviews.schema.js';
import { languageEnum } from '../../shared/language.js';

export const ENUM_REGISTRY: Record<string, readonly string[]> = {
  'roles': roleEnum.options,
  'service-types': serviceTypeEnum.options,
  'company-statuses': companyStatusEnum.options,
  'food-item-statuses': foodItemStatusEnum.options,
  'car-statuses': carStatusEnum.options,
  'transmissions': transmissionEnum.options,
  'fuel-types': fuelTypeEnum.options,
  'review-target-types': reviewTargetTypeEnum.options,
  'languages': languageEnum.options,
  'regions': regionEnum.options,
  'currencies': currencyEnum.options,
  'company-sections': companyDetailSectionEnum.options,
  'order-statuses': orderStatusEnum.options,
  'order-screens': orderScreenKeyEnum.options,
};

export type EnumKey = keyof typeof ENUM_REGISTRY;
