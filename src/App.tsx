import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminList from "./pages/ManagerList";
// 분리한 Layout 컴포넌트를 임포트합니다.
import Layout from "./Layout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로를 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* 로그인 페이지 외의 모든 경로는 Layout을 통해 사이드바가 항상 보이도록 설정 */}
        <Route element={<Layout />}>
          {/* 관리자 목록 경로를 "/admin"으로 설정 */}
          <Route path="/adminlist" element={<AdminList />} />
          {/* 필요에 따라 추가 라우트를 작성 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
