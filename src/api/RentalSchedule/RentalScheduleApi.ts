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
  createAt: string;
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

export interface RentalScheduleAdminDetailResponse {
  id: number;
  userName: string;
  rentalPeriod: string;
  brand: string;
  category: string;
  productNum: string;
  color: string;
  size: string;
  ticketName: string;
  deliveryInfo: DeliveryInfo;
  paymentStatus?: '결제완료' | '취소요청' | '취소완료';
  deliveryStatus?:
    | '배송준비'
    | '배송중'
    | '배송완료'
    | '배송취소'
    | '반납중'
    | '반납완료';
  isCleaned: boolean;
  isRepaired: boolean;
}

export interface UpdateRentalStatusRequest {
  paymentStatus?: '결제완료' | '취소요청' | '취소완료';
  deliveryStatus?:
    | '배송준비'
    | '배송중'
    | '배송완료'
    | '배송취소'
    | '반납중'
    | '반납완료';
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
 * GET /rental-schedule?limit={limit}&page={page}
 */
export const getRentalSchedules = async (
  limit: number = 10,
  page: number = 1
): Promise<RentalScheduleAdminListResponse> => {
  const response = await Axios.get<RentalScheduleAdminListResponse>(
    '/rental-schedule',
    { params: { limit, page } }
  );
  return response.data;
};

/**
 * 관리자: 특정 대여 내역 상세 조회
 * GET /rental-schedule/detail/{id}
 */
export const getRentalScheduleDetail = async (
  id: number
): Promise<RentalScheduleAdminDetailResponse> => {
  const response = await Axios.get<RentalScheduleAdminDetailResponse>(
    `/rental-schedule/detail/${id}`
  );
  return response.data;
};

/**
 * 관리자: 대여 상태 수정
 * PATCH /rental-schedule/{id}/status
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

/**
 * 관리자: 대여 기간 변경
 * PATCH /admin/rental/{id}/change-period
 *
 * Request body:
 * {
 *   startDate: "YYYY-MM-DD",
 *   endDate: "YYYY-MM-DD"
 * }
 *
 * Response example:
 * {
 *   "message": "대여 기간이 성공적으로 수정되었습니다.",
 *   "rentalId": 123,
 *   "newStartDate": "2025-07-01",
 *   "newEndDate": "2025-07-07"
 * }
 */
export interface ChangeRentalPeriodRequest {
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
}

export interface ChangeRentalPeriodResponse {
  message: string;
  rentalId: number;
  newStartDate: string; // "YYYY-MM-DD"
  newEndDate: string; // "YYYY-MM-DD"
}

export const changeRentalSchedulePeriod = async (
  id: number,
  payload: ChangeRentalPeriodRequest
): Promise<ChangeRentalPeriodResponse> => {
  const response = await Axios.patch<ChangeRentalPeriodResponse>(
    `/admin/rental/${id}/change-period`,
    payload
  );
  return response.data;
};
