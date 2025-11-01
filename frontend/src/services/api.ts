import axios from 'axios';
import type { Product, Category, Inventory } from '../types';

// Use environment variable if set (for production), otherwise use relative path (for dev)
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL ? `${API_BASE_URL}/api` : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productApi = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: number) => api.get<Product>(`/products/${id}`),
  getBySku: (sku: string) => api.get<Product>(`/products/sku/${sku}`),
  create: (product: Product) => api.post<Product>('/products', product),
  update: (id: number, product: Product) => api.put<Product>(`/products/${id}`, product),
  delete: (id: number) => api.delete(`/products/${id}`),
  search: (params: {
    name?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
    color?: string;
  }) => api.get<Product[]>('/products/search', { params }),
  getByCategory: (categoryId: number) => api.get<Product[]>(`/products/category/${categoryId}`),
  getByPriceRange: (minPrice: number, maxPrice: number) =>
    api.get<Product[]>('/products/price-range', { params: { minPrice, maxPrice } }),
};

// Categories API
export const categoryApi = {
  getAll: () => api.get<Category[]>('/categories'),
  getById: (id: number) => api.get<Category>(`/categories/${id}`),
  create: (category: Category) => api.post<Category>('/categories', category),
  update: (id: number, category: Category) => api.put<Category>(`/categories/${id}`, category),
  delete: (id: number) => api.delete(`/categories/${id}`),
};

// Inventory API
export const inventoryApi = {
  getAll: () => api.get<Inventory[]>('/inventory'),
  getById: (id: number) => api.get<Inventory>(`/inventory/${id}`),
  getByProductId: (productId: number) => api.get<Inventory>(`/inventory/product/${productId}`),
  create: (productId: number, inventory: Partial<Inventory>) =>
    api.post<Inventory>(`/inventory/product/${productId}`, inventory),
  update: (id: number, inventory: Partial<Inventory>) =>
    api.put<Inventory>(`/inventory/${id}`, inventory),
  updateStockLevel: (id: number, stockLevel: number) =>
    api.put<Inventory>(`/inventory/${id}/stock`, { stockLevel }),
  updateStockByProductId: (productId: number, stockLevel: number) =>
    api.put<Inventory>(`/inventory/product/${productId}/stock`, { stockLevel }),
  addStock: (id: number, quantity: number) =>
    api.post<Inventory>(`/inventory/${id}/add-stock`, { quantity }),
  removeStock: (id: number, quantity: number) =>
    api.post<Inventory>(`/inventory/${id}/remove-stock`, { quantity }),
  delete: (id: number) => api.delete(`/inventory/${id}`),
  getLowStock: () => api.get<Inventory[]>('/inventory/low-stock'),
  getItemsBelowStock: (stockLevel: number) =>
    api.get<Inventory[]>(`/inventory/below/${stockLevel}`),
  getByLocation: (location: string) =>
    api.get<Inventory[]>(`/inventory/location/${location}`),
};

export default api;
