import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminList from './pages/AdminList';
import UserList from './pages/UserList';
import Monitoring from './pages/Monitoring';
import OrderList from './pages/OrderList';
import Layout from './Layout';
import ProductList from './pages/ProductList';
import ProductRegister from './pages/ProductRegister';
import ProductDetail from './pages/ProductDetail';
import UserDetail from './pages/UserDetail';
import AdminDetail from './pages/AdminDetail';
import PageList from './pages/PageList';
import ProductEvaluation from './pages/ProductEvaluation';
import DetailsSales from './pages/DetailsSales';
import CalculateList from './pages/CalculateList';
import BrandList from './pages/BrandList';

// import AnalysisInfo from "./pages/AnalysisInfo";
// import InventoryList from "./pages/InventoryList";
// import StatisticsList from "./pages/StatisticsList";
// import MarketOrderList from "./pages/MarketOrderList";
// import Notice from "./pages/Notice";
// import Terms from "./pages/Terms";
// import Privacy from "./pages/Privacy";
// import FAQ from "./pages/FAQ";
// import Dashboard from "./pages/Dashboard";

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
          <Route path='/admindetail/:no' element={<AdminDetail />} />
          <Route path='/userlist' element={<UserList />} />
          <Route path='/Pagelist' element={<PageList />} />
          <Route path='/product-evaluation' element={<ProductEvaluation />} />
          <Route path='/details-sales' element={<DetailsSales />} />
          <Route path='/calculatelist' element={<CalculateList />} />

          <Route path='/userdetail/:no' element={<UserDetail />} />
          <Route path='/orderlist' element={<OrderList />} />
          <Route path='/monitoring' element={<Monitoring />} />
          <Route path='/productlist' element={<ProductList />} />

          <Route path='/productregister' element={<ProductRegister />} />
          <Route path='/productdetail/:no' element={<ProductDetail />} />
          <Route path='/brandlist' element={<BrandList />} />
          {/* <Route path="/analysisinfo" element={<AnalysisInfo />} />
          <Route path="/inventorylist" element={<InventoryList />} />
          <Route path="/statisticslist" element={<StatisticsList />} />
          <Route path="/calculatelist" element={<CalculateList />} />
          <Route path="/marketorderlist" element={<MarketOrderList />} />
          
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
