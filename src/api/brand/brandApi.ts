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
 * 관리자용 전체 브랜드 목록 조회
 * GET /brand/admin
 */
export const getAdminBrandList = async (): Promise<AdminBrand[]> => {
  const response = await Axios.get<AdminBrand[]>('/brand/admin');
  return response.data;
};

export default {
  getAdminBrandList,
};
