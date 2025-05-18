// src/api/rentalScheduleAdminApi.ts

import { Axios } from '../Axios';

export interface RentalScheduleAdminItem {
  id: number;
  userName: string;
  rentalPeriod: string; // "YYYY-MM-DD ~ YYYY-MM-DD"
  brand: string;
  category: string;
  productNum: string;
  color: string;
  size: string;
  ticketName: string;
  deliveryStatus: string;
}

export interface RentalScheduleAdminListResponse {
  count: number;
  rentals: RentalScheduleAdminItem[];
}

export interface DeliveryInfo {
  shipping: {
    address: string;
    detailAddress: string;
    phone: string;
    receiver: string;
    deliveryMethod: string;
    message: string;
  };
  return: {
    address: string;
    detailAddress: string;
    phone: string;
  };
}

export interface RentalScheduleAdminDetailResponse
  extends RentalScheduleAdminItem {
  deliveryInfo: DeliveryInfo;
}

export interface UpdateRentalStatusRequest {
  paymentStatus?: '결제대기' | '결제완료' | '환불완료';
  deliveryStatus?: '배송준비중' | '배송중' | '배송완료';
  isCleaned?: boolean;
  isRepaired?: boolean;
}

export interface UpdateRentalStatusResponse {
  id: number;
  payment_status: string;
  delivery_status: string;
  is_cleaned: boolean;
  is_repaired: boolean;
}

/**
 * 관리자: 전체 대여 내역 조회 (페이징 지원)
 * @param limit 페이지당 항목 수 (기본값 10)
 * @param page 페이지 번호 (기본값 1)
 */
export const getRentalSchedules = async (
  limit: number = 10,
  page: number = 1
): Promise<RentalScheduleAdminListResponse> => {
  const response = await Axios.get<RentalScheduleAdminListResponse>(
    '/rental-schedule',
    {
      params: { limit, page },
    }
  );
  return response.data;
};

/**
 * 관리자: 특정 대여 내역 상세 조회
 * @param id 대여 내역 ID
 */
export const getRentalScheduleDetail = async (
  id: number
): Promise<RentalScheduleAdminDetailResponse> => {
  const response = await Axios.get<RentalScheduleAdminDetailResponse>(
    `/rental-schedule/${id}`
  );
  return response.data;
};

/**
 * 관리자: 대여 상태 수정
 * @param id 대여 내역 ID
 * @param payload 수정할 상태 값
 */
export const updateRentalScheduleStatus = async (
  id: number,
  payload: UpdateRentalStatusRequest
): Promise<UpdateRentalStatusResponse> => {
  const response = await Axios.patch<UpdateRentalStatusResponse>(
    `/rental-schedule/${id}/status`,
    payload
  );
  return response.data;
};
