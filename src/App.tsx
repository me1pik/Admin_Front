import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminList from "./pages/AdminList";

import UserList from "./pages/UserList";

import Monitoring from "./pages/Monitoring";
import OrderList from "./pages/OrderList";

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
          <Route path="/adminlist" element={<AdminList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/monitoring" element={<Monitoring />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
