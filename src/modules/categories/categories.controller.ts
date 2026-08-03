import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import * as categoriesService from './categories.service.js';
import type { CategoriesQuery, CreateCategoryInput, UpdateCategoryInput } from './categories.schema.js';

export const getAllCategoriesController = catchAsync(async (req: Request, res: Response) => {
  const query = req.validatedQuery as unknown as CategoriesQuery;
  const categories = await categoriesService.getAllCategories(query.serviceType);
  res.status(200).json({ success: true, data: categories });
});

export const getCategoryByIdController = catchAsync(async (req: Request, res: Response) => {
  const category = await categoriesService.getCategoryById(req.params.id as string);
  res.status(200).json({ success: true, data: category });
});

export const createCategoryController = catchAsync(async (req: Request, res: Response) => {
  const data = req.body as CreateCategoryInput;
  const category = await categoriesService.createCategory(data);
  res.status(201).json({ success: true, data: category });
});

export const updateCategoryController = catchAsync(async (req: Request, res: Response) => {
  const data = req.body as UpdateCategoryInput;
  const category = await categoriesService.updateCategory(req.params.id as string, data);
  res.status(200).json({ success: true, data: category });
});

export const deleteCategoryController = catchAsync(async (req: Request, res: Response) => {
  await categoriesService.deleteCategory(req.params.id as string);
  res.status(200).json({ success: true, message: 'Category deleted' });
});
