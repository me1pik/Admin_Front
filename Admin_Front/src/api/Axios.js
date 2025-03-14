import axios from 'axios';
import Cookies from 'js-cookie';

export const Axios = axios.create({
  baseURL: 'https://api.stylewh.com', // API 서버 URL
  withCredentials: true, // 쿠키를 포함하여 요청을 보냄
});

// 토큰 갱신 함수
const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    const response = await axios.post(
      'https://api.stylewh.com/admin/auth/refresh',
      { refreshToken: refreshToken }, // 리프레시 토큰을 바디에 포함
      { withCredentials: true }
    );

    const newAccessToken = response.data.accessToken;
    if (newAccessToken) {
      Cookies.set('accessToken', newAccessToken, { expires: 7, path: '/' });
      return newAccessToken;
    }
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    return null;
  }
};

// 요청 인터셉터 설정
Axios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // 요청 헤더에 accessToken 포함
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정 (토큰 만료 시 자동 갱신)
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 로그인 경로에서 발생한 오류는 건너뜀
    if (window.location.pathname === '/auth/login') {
      return Promise.reject(error);
    }

    // accessToken이 만료된 경우 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return Axios(originalRequest); // 갱신된 토큰으로 재시도
      }
    }

    return Promise.reject(error);
  }
);
