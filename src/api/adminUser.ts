// src/api/adminUser.ts

import { Axios } from './Axios';

// 사용자 상세 정보 인터페이스 (GET /admin/user/{email})
export interface UserDetail {
  email: string;
  nickname: string;
  birthdate: string;
  address: string;
  phoneNumber: string;
  gender: string;
  instagramId: string;
}

// 사용자 삭제 응답 인터페이스 (DELETE /admin/user/{email})
export interface DeleteUserResponse {
  message: string;
}

// 모든 사용자 조회 시 개별 사용자 정보 인터페이스 (GET /admin/user)
export interface UserSummary {
  id: number;
  status: string;
  membershipLevel: string;
  name: string;
  nickname: string;
  instagramId: string;
  followersCount: number;
  followingCount: number;
  address: string;
  signupDate: string;
}

// 모든 사용자 조회 응답 인터페이스
export interface GetUsersResponse {
  users: UserSummary[];
  total: number;
}

// 차단된 사용자 조회 시 개별 사용자 정보 인터페이스 (GET /admin/user/blocked)
export interface BlockedUser {
  email: string;
  nickname: string;
  phoneNumber: string;
  gender: string;
  status: string;
}

// 차단된 사용자 조회 응답 인터페이스
export interface GetBlockedUsersResponse {
  users: BlockedUser[];
  total: number;
}

/**
 * 이메일을 이용하여 사용자 정보를 조회합니다.
 * GET /admin/user/{email}
 */
export const getUserByEmail = async (email: string): Promise<UserDetail> => {
  const response = await Axios.get(`/admin/user/${email}`);
  return response.data;
};

/**
 * 이메일을 이용하여 사용자를 삭제합니다. (관리자용)
 * DELETE /admin/user/{email}
 */
export const deleteUserByEmail = async (
  email: string
): Promise<DeleteUserResponse> => {
  const response = await Axios.delete(`/admin/user/${email}`);
  return response.data;
};

/**
 * 모든 사용자를 조회합니다. (관리자용)
 * GET /admin/user
 *
 * @param limit 페이지당 사용자 수 (기본값: 10)
 * @param page  페이지 번호 (기본값: 1)
 */
export const getAllUsers = async (
  limit = 10,
  page = 1
): Promise<GetUsersResponse> => {
  const response = await Axios.get(`/admin/user`, {
    params: { limit, page },
  });
  return response.data;
};

/**
 * 차단된 사용자를 조회합니다. (관리자용)
 * GET /admin/user/blocked
 *
 * @param limit 페이지당 사용자 수 (기본값: 10)
 * @param page  페이지 번호 (기본값: 1)
 */
export const getBlockedUsers = async (
  limit = 10,
  page = 1
): Promise<GetBlockedUsersResponse> => {
  const response = await Axios.get(`/admin/user/blocked`, {
    params: { limit, page },
  });
  return response.data;
};
