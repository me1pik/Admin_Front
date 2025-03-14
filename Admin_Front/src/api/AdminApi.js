// src/api/AdminApi.js
import { Axios } from '../api/Axios';

/**
 * 관리자 목록을 가져오는 API 함수
 * @param {number} page - 페이지 번호
 * @param {number} limit - 페이지당 항목 수
 * @returns {Promise<Object>} - 관리자 목록 데이터와 전체 항목 수를 반환하는 Promise
 */
export const fetchAdminList = async (page = 1, limit = 10) => {
  try {
    const response = await Axios.get('/admin', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin list:', error);
    throw error;
  }
};

/**
 * 차단된 관리자 목록을 가져오는 API 함수
 * @param {number} page - 페이지 번호
 * @param {number} limit - 페이지당 항목 수
 * @returns {Promise<Object>} - 차단된 관리자 목록 데이터와 전체 항목 수를 반환하는 Promise
 */
export const fetchBlockedAdminList = async (page = 1, limit = 10) => {
  try {
    const response = await Axios.get('/admin/blocked', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blocked admin list:', error);
    throw error;
  }
};

/**
 * 특정 관리자의 정보를 가져오는 API 함수
 * @param {string} id - 조회할 관리자 ID
 * @returns {Promise<Object>} - 관리자 정보를 반환하는 Promise
 */
export const getAdminById = async (id) => {
  try {
    const response = await Axios.get(`/admin/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error(`Admin not found with id ${id}`);
      return {
        statusCode: 404,
        message: 'Admin not found',
        error: 'Not Found',
      };
    } else {
      console.error(`Error fetching admin with id ${id}:`, error);
      throw error;
    }
  }
};

/**
 * 어드민을 생성하는 API 함수
 * @param {Object} adminData - 생성할 어드민 정보
 * @returns {Promise<Object>} - 생성된 어드민 정보를 반환하는 Promise
 */
export const createAdmin = async (adminData) => {
  try {
    const response = await Axios.post('/admin', adminData);
    return response.data;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
};

/**
 * 특정 관리자를 업데이트하는 API 함수
 * @param {string} id - 업데이트할 관리자 ID
 * @param {Object} updateData - 업데이트할 데이터 (이메일, 권한 등급, 상태)
 * @returns {Promise<Object>} - 업데이트된 관리자 정보를 반환하는 Promise
 */
export const updateAdmin = async (id, updateData) => {
  try {
    const response = await Axios.put(`/admin/${id}`, updateData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error(`Admin not found with id ${id}`);
      throw new Error('관리자를 찾을 수 없습니다.');
    } else {
      console.error(`Error updating admin with id ${id}:`, error);
      throw error;
    }
  }
};

/**
 * 어드민을 삭제하는 API 함수
 * @param {string} id - 삭제할 어드민 ID
 * @returns {Promise<Object>} - 삭제 결과를 반환하는 Promise
 */
export const deleteAdmin = async (id) => {
  try {
    const response = await Axios.delete(`/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting admin:', error);
    throw error;
  }
};

/**
 * 관리자 목록을 가져오는 API 함수
 * @param {number} page - 페이지 번호
 * @param {number} limit - 페이지당 항목 수
 * @returns {Promise<Object>} - 관리자 목록 데이터와 전체 항목 수를 반환하는 Promise
 */
export const AdminGet = async (page = 1, limit = 10) => {
  try {
    const response = await Axios.get('/admin', {
      params: {
        page,
        limit,
      },
    });
    // 응답 데이터 확인 (디버깅)
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin list:', error);
    throw error;
  }
};
