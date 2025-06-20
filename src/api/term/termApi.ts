// src/api/terms.ts

import { Axios } from '../Axios';

/**
 * 문서 항목 인터페이스
 */
export interface TermPolicyItem {
  id: number;
  title: string;
  type: '이용약관' | '개인정보보호' | 'FAQ';
  category: string;
  content: string;
  author: string;
  createdAt: string; // ISO 8601 문자열, 예: "2025-06-15T12:00:00.000Z"
}

/**
 * 생성 요청 바디 인터페이스
 */
export interface CreateTermPolicyRequest {
  title: string;
  type: '이용약관' | '개인정보보호' | 'FAQ';
  category: string;
  content: string;
  // author는 서버에서 설정되는 경우 생략 가능
}

/**
 * 수정 요청 바디 인터페이스
 * 필요에 따라 모든 필드를 optional로 처리할 수 있으나,
 * 보통 프론트에서는 전체 필드를 보내거나 변경된 필드만 보내도록 함.
 */
export interface UpdateTermPolicyRequest {
  title?: string;
  type?: '이용약관' | '개인정보보호' | 'FAQ';
  category?: string;
  content?: string;
  author?: string; // 필요 시 프론트에서 보내도록 서버에서 허용할 경우
}

/**
 * 문서 생성
 * POST /admin/terms-policy
 * @param data CreateTermPolicyRequest
 * @returns Promise<TermPolicyItem>
 */
export async function createTermPolicy(
  data: CreateTermPolicyRequest
): Promise<TermPolicyItem> {
  const response = await Axios.post<TermPolicyItem>(
    '/admin/terms-policy',
    data
  );
  return response.data;
}

/**
 * 문서 목록 조회 (필터 가능)
 * GET /admin/terms-policy?type=...&category=...
 * @param params 필터 객체: type 또는 category가 없으면 undefined로 전달
 * @returns Promise<TermPolicyItem[]>
 */
export interface FetchTermPoliciesParams {
  type?: '이용약관' | '개인정보보호' | 'FAQ';
  category?: string;
}
export async function fetchTermPolicies(
  params?: FetchTermPoliciesParams
): Promise<TermPolicyItem[]> {
  // params 객체 자체를 그대로 params로 전달하면, undefined인 프로퍼티는 Axios가 알아서 제외
  const response = await Axios.get<TermPolicyItem[]>('/admin/terms-policy', {
    params,
  });
  return response.data;
}

/**
 * 단일 문서 상세 조회
 * GET /admin/terms-policy/{id}
 * @param id 문서 ID
 * @returns Promise<TermPolicyItem>
 */
export async function fetchTermPolicyById(id: number): Promise<TermPolicyItem> {
  const response = await Axios.get<TermPolicyItem>(`/admin/terms-policy/${id}`);
  return response.data;
}

/**
 * 문서 수정
 * PUT /admin/terms-policy/{id}
 * @param id 문서 ID
 * @param data UpdateTermPolicyRequest
 * @returns Promise<TermPolicyItem>
 */
export async function updateTermPolicy(
  id: number,
  data: UpdateTermPolicyRequest
): Promise<TermPolicyItem> {
  const response = await Axios.put<TermPolicyItem>(
    `/admin/terms-policy/${id}`,
    data
  );
  return response.data;
}

/**
 * 문서 삭제
 * DELETE /admin/terms-policy/{id}
 * @param id 문서 ID
 * @returns Promise<{ message: string }>
 */
export async function deleteTermPolicy(
  id: number
): Promise<{ message: string }> {
  const response = await Axios.delete<{ message: string }>(
    `/admin/terms-policy/${id}`
  );
  return response.data;
}
