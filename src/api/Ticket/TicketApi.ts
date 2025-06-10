import { Axios } from '../Axios';

/**
 * 관리자용 이용권 항목 스펙
 */
export interface AdminTicketItem {
  id: number;
  purchaseDate: string;
  nextDate: string;
  user: string;
  ticket_name: string;
  이용기간: string;
  ticket_count: string;
  ticket_status: string;
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
 */
export const getAdminTicketById = async (
  id: number
): Promise<AdminTicketItem> => {
  const response = await Axios.get<AdminTicketItem>(`/ticket/user/${id}`);
  return response.data;
};

/**
 * 관리자용: 이용권 상태 변경
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
