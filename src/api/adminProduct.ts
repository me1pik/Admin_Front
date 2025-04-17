// src/api/adminProduct.ts
import { Axios } from './Axios';

/**
 * “열 이름”을 키로, “셀 값”을 값으로 갖는 한 행(Row) 타입
 */
export type SizeRow = {
  size: string;
  [column: string]: string | number;
};

export interface ProductListParams {
  limit?: number; // 페이지당 항목 수
  page?: number; // 페이지 번호
  search?: string; // 검색 키워드
  status?: string; // 제품 상태값 (등록완료 / 등록대기 / 판매종료)
}

export interface ProductItem {
  no: number; // 고유 ID
  styleCode: string; // 스타일 코드
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

/**
 * 제품 상세 조회 타입
 * GET /admin/products-management/{id}
 */
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
    겉감: string;
    안감: string;
    배색?: string;
    부속?: string;
  };
  elasticity: string;
  transparency: string;
  thickness: string;
  lining: string;
  touch: string;
  fit: string;
  /**
   * 동적 행·열 모두 허용되는 사이즈 가이드
   */
  sizes: SizeRow[];
}

export type UpdateProductRequest = Partial<ProductDetailResponse>;

/** 제품 목록 조회 */
export const getProducts = async (
  params?: ProductListParams
): Promise<ProductListResponse> => {
  const response = await Axios.get('/admin/products-management/list', {
    params,
  });
  return response.data;
};

/** 제품 상세 조회 */
export const getProductDetail = async (
  id: number
): Promise<ProductDetailResponse> => {
  const response = await Axios.get(`/admin/products-management/${id}`);
  return response.data;
};

/** 제품 정보 수정 */
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

export default {
  getProducts,
  getProductDetail,
  updateProduct,
};
