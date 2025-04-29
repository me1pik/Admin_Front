// src/api/Notice/noticeApi.ts
import { Axios } from '../Axios';

export interface ApiNotice {
  id: number;
  title: string;
  type: string;
  content: string;
  author: string;
  createdAt: string;
}

export function getNotices(): Promise<ApiNotice[]> {
  return Axios.get('/admin/notice').then((res) => res.data);
}

// 상세 조회 엔드포인트 추가
export function getNotice(id: number): Promise<ApiNotice> {
  return Axios.get(`/admin/notice/${id}`).then((res) => res.data);
}

export function createNotice(body: {
  title: string;
  type: string;
  content: string;
  author: string;
}): Promise<ApiNotice> {
  return Axios.post('/admin/notice', body).then((res) => res.data);
}

export function updateNotice(
  id: number,
  body: {
    title?: string;
    type?: string;
    content?: string;
    author?: string;
  }
): Promise<ApiNotice> {
  return Axios.put(`/admin/notice/${id}`, body).then((res) => res.data);
}

export function deleteNotice(id: number): Promise<{ message: string }> {
  return Axios.delete(`/admin/notice/${id}`).then((res) => res.data);
}
