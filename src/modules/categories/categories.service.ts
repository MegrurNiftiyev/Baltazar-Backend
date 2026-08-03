import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import type { CreateCategoryInput, UpdateCategoryInput } from './categories.schema.js';

const categoriesCollection = db.collection(COLLECTIONS.CATEGORIES);

export async function getAllCategories(serviceType?: string) {
  let query: FirebaseFirestore.Query = categoriesCollection;
  if (serviceType) {
    query = query.where('serviceType', '==', serviceType);
  }
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getCategoryById(id: string) {
  const doc = await categoriesCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND', 'Category not found');
  return { id: doc.id, ...doc.data() };
}

export async function createCategory(data: CreateCategoryInput) {
  const ref = categoriesCollection.doc();
  const newCategory = { id: ref.id, ...data };
  await ref.set(data);
  return newCategory;
}

export async function updateCategory(id: string, data: UpdateCategoryInput) {
  const ref = categoriesCollection.doc(id);
  const doc = await ref.get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND', 'Category not found');
  
  await ref.update(data as Record<string, any>);
  return { id, ...doc.data(), ...data };
}

export async function deleteCategory(id: string) {
  const ref = categoriesCollection.doc(id);
  const doc = await ref.get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND', 'Category not found');
  
  await ref.delete();
  return { success: true };
}
