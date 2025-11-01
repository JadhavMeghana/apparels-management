export interface Category {
  id?: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  sku: string;
  size?: string;
  color?: string;
  category: Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface Inventory {
  id?: number;
  product: Product;
  stockLevel: number;
  location?: string;
  reorderLevel: number;
  lastUpdated?: string;
}
