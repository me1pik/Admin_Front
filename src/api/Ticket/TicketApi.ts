import { Axios } from '../Axios';

/**
 * 관리자용 이용권 항목 스펙
 * 백엔드 예시 응답:
 * {
 *   "id": 17,
 *   "purchaseDate": "2025-05-01",
 *   "nextDate": "2025-06-01",
 *   "user": "홍길동 (gildong)",
 *   "ticket_name": "무제한 이용권",
 *   "이용기간": "2025-05-01 ~ 2025-08-01",
 *   "ticket_count": "∞ / 3",
 *   "ticket_status": "ACTIVE"
 * }
 */
export interface AdminTicketItem {
  id: number;
  purchaseDate: string; // 결제일, ISO 날짜 문자열
  nextDate: string; // 다음 결제일, ISO 날짜 문자열
  user: string; // 사용자 이름 혹은 식별자 (예: "홍길동 (gildong)")
  ticket_name: string; // 티켓 종류 이름 (예: "무제한 이용권")
  이용기간: string; // 예: "2025-05-01 ~ 2025-08-01"
  ticket_count: string; // 예: "∞ / 3"
  ticket_status: string; // 예: "ACTIVE", "PENDING", "CANCEL_REQUEST", "CANCELLED" 등 백엔드 정의 값
}

/**
 * 관리자용 페이징 응답 스펙
 */
export interface AdminPaginatedTicketsResponse {
  total: number;
  tickets: AdminTicketItem[];
}

/**
 * 관리자용: 이용권 목록(페이지네이션) 조회
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

/**
 * 관리자용: 단일 이용권 상세 조회
 * 명세에 따라 GET /ticket/user/{id}
 */
export const getAdminTicketById = async (
  id: number
): Promise<AdminTicketItem> => {
  const response = await Axios.get<AdminTicketItem>(`/ticket/user/${id}`);
  return response.data;
};

/**
 * 관리자용: 이용권 상태 변경
 * - body 예시: { status: "CANCELLED", isActive: false }
 * - 백엔드 스펙에 맞춰 status 값과 isActive 처리 로직 확인 후 전달
 */
export const changeTicketStatus = async (
  id: number,
  body: {
    status: string;
    isActive: boolean;
  }
): Promise<AdminTicketItem> => {
  const response = await Axios.patch<AdminTicketItem>(
    `/ticket/${id}/status`,
    body
  );
  return response.data;
};

/**
 * 관리자용: 무제한권 ↔ 제한권 전환 (4회권 ID = 2, 무제한권 ID = 3)
 */
export const convertTicketType = async (
  ticketId: number
): Promise<AdminTicketItem> => {
  const response = await Axios.patch<AdminTicketItem>(
    `/ticket/convert-ticket/${ticketId}`
  );
  return response.data;
};

/**
 * 관리자용: 이용권 삭제
 * - 예: DELETE /ticket/{id}
 * - 백엔드에 실제 삭제 엔드포인트가 다르면 수정 필요
 */
export const deleteAdminTicketById = async (id: number): Promise<void> => {
  await Axios.delete(`/ticket/${id}`);
};
