// src/api/adminProduct.ts
import { Axios } from './Axios';

/**
 * 제품 목록 조회 (List)
 * GET /admin/products-management/list
 */
export interface ProductListParams {
  status?: string; // 등록대기 / 등록완료 / 판매종료 (default: all)
  search?: string; // 제품명, 브랜드명, 카테고리 등 키워드 검색
  category?: string; // 예: 원피스, 블라우스 등
  page?: number; // 기본: 1
  limit?: number; // 기본: 10
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

/**
 * 제품 상세 조회 (Detail)
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
    배색?: string; // optional 처리
    부속?: string;
  };
  elasticity: string;
  transparency: string;
  thickness: string;
  lining: string;
  fit: string;
  sizes: Array<{
    size: string;
    measurements: {
      어깨: number;
      가슴: number;
      총장: number;
    };
  }>;
}

/**
 * 제품 정보 수정 (Update)
 * PATCH /admin/products-management/{id}
 */
export interface UpdateProductRequest {
  name?: string;
  product_url?: string;
  product_img?: string[];
  registration?: number;
  discount_rate?: number;
}

/**
 * 제품 목록 조회 API 호출 함수
 * @param params - 제품 목록 필터링 파라미터
 * @returns 제품 목록 데이터를 반환
 */
export const getProducts = async (
  params?: ProductListParams
): Promise<ProductListResponse> => {
  const response = await Axios.get('/admin/products-management/list', {
    params,
  });
  return response.data;
};

/**
 * 제품 상세 조회 API 호출 함수
 * @param id - 제품 고유 ID
 * @returns 제품 상세 정보를 반환
 */
export const getProductDetail = async (
  id: number
): Promise<ProductDetailResponse> => {
  const response = await Axios.get(`/admin/products-management/${id}`);
  return response.data;
};

/**
 * 제품 정보 수정 API 호출 함수
 * @param id - 제품 고유 ID
 * @param updateData - 수정할 정보 (전송하지 않은 필드는 유지됨)
 * @returns 수정 후의 제품 상세 정보를 반환
 */
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
