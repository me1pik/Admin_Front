// src/api/ticket/admin.ts

import { Axios } from '../Axios';

/**
 * 관리자용 이용권 항목 스펙
 */
export interface AdminTicketItem {
  id: number;
  purchaseDate: string; // 구매일자, YYYY-MM-DD
  nextDate: string; // 다음 결제일자, YYYY-MM-DD
  user: string; // 사용자 이름 (ex: "안소현 (솔린)")
  ticket_name: string; // 이용권 이름
  이용기간: string; // 이용기간 문자열, ex: "2025-05-01 ~ 2025-05-31"
  ticket_count: string; // 남은 횟수, ex: "∞ / 3"
  ticket_status: string; // 상태, ex: "결제완료"
}

/**
 * 관리자용 페이징 응답 스펙
 */
export interface AdminPaginatedTicketsResponse {
  total: number; // 전체 이용권 개수
  tickets: AdminTicketItem[]; // 조회된 페이지 항목들
}

/**
 * 관리자용: 이용권 목록(페이지네이션) 조회
 *
 * GET /ticket/admin/paginated?page={page}&limit={limit}
 */
export const getAdminPaginatedTickets = async (
  page: number,
  limit: number
): Promise<AdminPaginatedTicketsResponse> => {
  const response = await Axios.get<AdminPaginatedTicketsResponse>(
    '/ticket/admin/paginated',
    {
      params: { page, limit },
    }
  );
  return response.data;
};
