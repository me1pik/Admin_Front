// src/api/adminProduct.ts

import { Axios } from './Axios';

export interface SizeRow {
  size: string;
  measurements: Record<string, number>;
}

export interface ProductListParams {
  limit?: number;
  page?: number;
  search?: string;
  status?: string;
}

export interface ProductItem {
  no: number;
  styleCode: string;
  brand: string;
  category: string;
  color: string;
  size: string;
  price: number; // retailPrice → price
  registerDate: string;
  status: string;
}

export interface ProductListResponse {
  items: ProductItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  product_num: string;
  brand: string;
  category: string;
  color: string;
  price: number; // 리테일 가격
  discountRate: number; // 할인율
  sale_price?: number; // 판매가
  rental_price?: number; // 대여가
  registration: number;
  registration_date: string;
  product_url: string;
  product_img: string[];
  size_picture: string;
  season: string;
  manufacturer: string | null;
  description: string;
  fabricComposition: {
    겉감?: string;
    안감?: string;
    배색?: string;
    부속?: string;
  };
  elasticity: string;
  transparency: string;
  thickness: string;
  lining: string;
  touch: string;
  fit: string;
  sizes: SizeRow[];
}

// PATCH 시 price/sale_price/rental_price 부분 업데이트 가능
export type UpdateProductRequest = Partial<
  Omit<ProductDetailResponse, 'price' | 'sale_price' | 'rental_price'>
> & {
  price?: number;
  sale_price?: number;
  rental_price?: number;
};

export type CreateProductRequest = Partial<
  Pick<
    ProductDetailResponse,
    'fabricComposition' | 'price' | 'sale_price' | 'rental_price'
  >
>;

export const getProducts = async (
  params?: ProductListParams
): Promise<ProductListResponse> => {
  const response = await Axios.get('/admin/products-management/list', {
    params,
  });
  return response.data;
};

export const getProductDetail = async (
  id: number
): Promise<ProductDetailResponse> => {
  const response = await Axios.get(`/admin/products-management/${id}`);
  return response.data;
};

export const updateProduct = async (
  id: number,
  updateData: UpdateProductRequest
): Promise<ProductDetailResponse> => {
  const response = await Axios.patch(
    `/admin/products-management/${id}`,
    updateData
  );
  return response.data;
};

export const createProduct = async (
  productData: CreateProductRequest
): Promise<ProductDetailResponse> => {
  const response = await Axios.post('/admin/products-management', productData);
  return response.data;
};

export default {
  getProducts,
  getProductDetail,
  updateProduct,
  createProduct,
};
