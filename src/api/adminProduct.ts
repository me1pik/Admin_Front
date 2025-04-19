// src/api/adminProduct.ts
import { Axios } from './Axios';

// 변경 후
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
  retailPrice: number;
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
  price: {
    originalPrice: number;
    discountRate: number;
    finalPrice: number;
  };
  rental?: number;
  registration: number;
  registration_date: string;
  product_url: string;
  product_img: string[];
  size_picture: string;
  season: string;
  manufacturer: string;
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

export type UpdateProductRequest = Partial<ProductDetailResponse>;
export type CreateProductRequest = Partial<
  Pick<ProductDetailResponse, 'fabricComposition'>
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
