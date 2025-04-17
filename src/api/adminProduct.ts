// src/api/adminProduct.ts
import { Axios } from './Axios';

/**
 * 제품 목록 조회 파라미터 (관리자용)
 * GET /admin/products-management/list
 */
export interface ProductListParams {
  limit?: number; // 페이지당 항목 수
  page?: number; // 페이지 번호
  search?: string; // 검색 키워드
  status?: string; // 제품 상태값 (등록완료 / 등록대기 / 판매종료)
}

/**
 * 제품 목록 아이템 타입
 * Table 컴포넌트에 전달되는 필드들
 */
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

/**
 * 제품 목록 조회 응답 타입
 */
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
 * 제품 정보 수정 요청 타입
 * PATCH /admin/products-management/{id}
 * — 모든 필드를 부분 업데이트할 수 있도록 Partial<ProductDetailResponse> 사용
 */
export type UpdateProductRequest = Partial<ProductDetailResponse>;

/**
 * 제품 목록 조회
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
 * 제품 상세 조회
 */
export const getProductDetail = async (
  id: number
): Promise<ProductDetailResponse> => {
  const response = await Axios.get(`/admin/products-management/${id}`);
  return response.data;
};

/**
 * 제품 정보 수정
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
