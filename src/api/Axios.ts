// src/api/Axios.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const Axios = axios.create({
  baseURL: "https://api.stylewh.com", // API 서버 URL
  withCredentials: true, // 쿠키를 포함하여 요청
});

/** 토큰 갱신 함수 */
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      throw new Error("리프레시 토큰이 없습니다.");
    }
    const response = await axios.post(
      "https://api.stylewh.com/admin/auth/refresh",
      { refreshToken },
      { withCredentials: true }
    );
    const newAccessToken = response.data.accessToken;
    if (newAccessToken) {
      Cookies.set("accessToken", newAccessToken, { expires: 7, path: "/" });
      return newAccessToken;
    }
    return null;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    return null;
  }
};

/** 요청 인터셉터 설정 */
Axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/** 응답 인터셉터 설정 (토큰 만료 시 자동 갱신) */
Axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    if (window.location.pathname === "/auth/login") {
      return Promise.reject(error);
    }
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return Axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
