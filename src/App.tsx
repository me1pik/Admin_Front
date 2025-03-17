import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminList from "./pages/AdminList";
// import AnalysisInfo from "./pages/AnalysisInfo";
// import UserList from "./pages/UserList";
// import InventoryList from "./pages/InventoryList";
// import StatisticsList from "./pages/StatisticsList";
// import CalculateList from "./pages/CalculateList";
// import ProductList from "./pages/ProductList";
// import BrandList from "./pages/BrandList";
// import MarketOrderList from "./pages/MarketOrderList";
// import OrderList from "./pages/OrderList";
// import Notice from "./pages/Notice";
// import Terms from "./pages/Terms";
// import Privacy from "./pages/Privacy";
// import FAQ from "./pages/FAQ";
// import Dashboard from "./pages/Dashboard";

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
          {/* <Route path="/analysisinfo" element={<AnalysisInfo />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/inventorylist" element={<InventoryList />} />
          <Route path="/statisticslist" element={<StatisticsList />} />
          <Route path="/calculatelist" element={<CalculateList />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/brandlist" element={<BrandList />} />
          <Route path="/marketorderlist" element={<MarketOrderList />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} /> */}
          {/* <Route path="/dashboard" element={<DashBoard />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
