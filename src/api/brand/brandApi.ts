// src/api/brand/brand.ts

import { Axios } from '../Axios';

/**
 * 관리자용 브랜드 정보 타입
 */
export interface AdminBrand {
  id: number;
  groupName: string;
  brandName: string;
  contactPerson: string;
  contactNumber: string;
  imageUrl: string;
  isPopular: boolean;
  isActive: boolean;
}

/**
 * 관리자용 브랜드 상세 정보 타입
 */
export interface AdminBrandDetail extends AdminBrand {
  discount_rate: number;
  location: string;
  status: string;
  productCount: number;
}

/**
 * 관리자용 전체 브랜드 목록 조회
 * GET /brand/admin
 */
export const getAdminBrandList = async (): Promise<AdminBrand[]> => {
  const response = await Axios.get<AdminBrand[]>('/brand/admin');
  return response.data;
};

/**
 * 관리자용 브랜드 상세 정보 조회
 * GET /brand/admin/{id}
 */
export const getAdminBrandDetail = async (
  id: number
): Promise<AdminBrandDetail> => {
  const response = await Axios.get<AdminBrandDetail>(`/brand/admin/${id}`);
  return response.data;
};

/**
 * 관리자용 브랜드 등록 요청 타입
 */
export interface CreateAdminBrandRequest {
  groupName: string;
  brandName: string;
  contactPerson: string;
  contactNumber: string;
  imageUrl: string;
  isPopular: boolean;
  isActive: boolean;
  discount_rate: number;
  location: string;
  status: string;
}

/**
 * 관리자용 브랜드 등록
 * POST /brand/admin
 */
export const createAdminBrand = async (
  body: CreateAdminBrandRequest
): Promise<AdminBrandDetail> => {
  const response = await Axios.post<AdminBrandDetail>('/brand/admin', body);
  return response.data;
};

/**
 * 관리자용 브랜드 수정 요청 타입
 */
export interface UpdateAdminBrandRequest {
  groupName?: string;
  brandName?: string;
  contactPerson?: string;
  contactNumber?: string;
  imageUrl?: string;
  isPopular?: boolean;
  isActive?: boolean;
  discount_rate?: number;
  location?: string;
  status?: string;
}

/**
 * 관리자용 브랜드 정보 수정
 * PATCH /brand/admin/{id}
 */
export const updateAdminBrand = async (
  id: number,
  body: UpdateAdminBrandRequest
): Promise<AdminBrandDetail> => {
  const response = await Axios.patch<AdminBrandDetail>(
    `/brand/admin/${id}`,
    body
  );
  return response.data;
};

/**
 * 브랜드 삭제
 * DELETE /brand/{id}
 */
export const deleteBrand = async (id: number): Promise<void> => {
  await Axios.delete(`/brand/${id}`);
};

/**
 * 관리자용 select 박스 옵션 타입
 */
export interface AdminBrandSelectOptions {
  discountRates: string[];
  statusOptions: string[];
}

/**
 * 관리자용 select 박스 옵션 조회
 * GET /brand/admin/select-options
 */
export const getAdminBrandSelectOptions =
  async (): Promise<AdminBrandSelectOptions> => {
    const response = await Axios.get<AdminBrandSelectOptions>(
      '/brand/admin/select-options'
    );
    return response.data;
  };

export default {
  getAdminBrandList,
  getAdminBrandDetail,
  createAdminBrand,
  updateAdminBrand,
  deleteBrand,
  getAdminBrandSelectOptions,
};
