import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminList from './pages/AdminList';
import UserList from './pages/UserList';
import Monitoring from './pages/Monitoring';
import OrderList from './pages/OrderList';
import Layout from './Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로를 로그인 페이지로 리다이렉트 */}
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        {/* Layout 내부에 Outlet을 사용하여 공통 UI를 구성 */}
        <Route element={<Layout />}>
          <Route path='/adminlist' element={<AdminList />} />
          <Route path='/userlist' element={<UserList />} />
          <Route path='/orderlist' element={<OrderList />} />
          <Route path='/monitoring' element={<Monitoring />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
