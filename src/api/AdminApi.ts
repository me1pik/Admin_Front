// src/api/AdminApi.ts
import { Axios } from "./Axios";

/** 관리자 타입 정의 */
export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  no: number; // 추가: 관리자의 순번 혹은 번호
  status: string; // 추가: 관리자의 상태 (예: 활성/비활성 등)
}

/** 관리자 목록 응답 타입 */
export interface AdminListResponse {
  admins: Admin[];
  total: number;
}

/** 에러 응답 타입 */
export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

/** 관리자 목록을 가져오는 API 함수 */
export const fetchAdminList = async (
  page: number = 1,
  limit: number = 10
): Promise<AdminListResponse> => {
  try {
    const response = await Axios.get("/admin", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin list:", error);
    throw error;
  }
};

/** 차단된 관리자 목록을 가져오는 API 함수 */
export const fetchBlockedAdminList = async (
  page: number = 1,
  limit: number = 10
): Promise<AdminListResponse> => {
  try {
    const response = await Axios.get("/admin/blocked", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blocked admin list:", error);
    throw error;
  }
};

/** 특정 관리자의 정보를 가져오는 API 함수 */
export const getAdminById = async (
  id: string
): Promise<Admin | ErrorResponse> => {
  try {
    const response = await Axios.get(`/admin/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error(`Admin not found with id ${id}`);
      return {
        statusCode: 404,
        message: "Admin not found",
        error: "Not Found",
      };
    } else {
      console.error(`Error fetching admin with id ${id}:`, error);
      throw error;
    }
  }
};

/** 어드민을 생성하는 API 함수 */
export const createAdmin = async (adminData: any): Promise<any> => {
  try {
    const response = await Axios.post("/admin", adminData);
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

/** 특정 관리자를 업데이트하는 API 함수 */
export const updateAdmin = async (
  id: string,
  updateData: any
): Promise<any> => {
  try {
    const response = await Axios.put(`/admin/${id}`, updateData);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error(`Admin not found with id ${id}`);
      throw new Error("관리자를 찾을 수 없습니다.");
    } else {
      console.error(`Error updating admin with id ${id}:`, error);
      throw error;
    }
  }
};

/** 어드민을 삭제하는 API 함수 */
export const deleteAdmin = async (id: string): Promise<any> => {
  try {
    const response = await Axios.delete(`/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};

/** 관리자 목록을 가져오는 API 함수 (동일 기능) */
export const AdminGet = async (
  page: number = 1,
  limit: number = 10
): Promise<AdminListResponse> => {
  try {
    const response = await Axios.get("/admin", {
      params: { page, limit },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin list:", error);
    throw error;
  }
};
