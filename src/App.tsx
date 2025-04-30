import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminList from './pages/Admins/AdminList';
import UserList from './pages/Users/UserList';
import Monitoring from './pages/List/Monitoring';
import OrderList from './pages/List/OrderList';
import Layout from './Layout';
import ProductList from './pages/List/ProductList';
// import ProductRegister from './pages/ProductRegister';
import ProductDetail from './pages/List/ProductDetail';
import UserDetail from './pages/Users/UserDetail';
import AdminDetail from './pages/Admins/AdminDetail';
import PageList from './pages/Users/PageList';
import ProductEvaluation from './pages/Users/ProductEvaluation';
import DetailsSales from './pages/Users/DetailsSales';
import CalculateList from './pages/Users/CalculateList';
import BrandList from './pages/List/BrandList';
import GeneralOrderDetail from './pages/GeneralOrderDetail';

import NoticeList from './pages/Settings/Notice/NoticeList';
import NoticeDetail from './pages/Settings/Notice/NoticeDetail';
import CreateNotice from './pages/Settings/Notice/CreateNotice';

import TermsList from './pages/Settings/Terms/TermsList';
import TermsDetail from './pages/Settings/Terms/TermsDetail';
import CreateTerms from './pages/Settings/Terms/CreateTerms';

import PrivacyList from './pages/Settings/Privac/PrivacyList';
import PrivacyDetail from './pages/Settings/Privac/PrivacyDetail';
import CreatePrivacy from './pages/Settings/Privac/CreatePrivacy';

import FAQList from './pages/Settings/FAQ/FAQList';
import FAQDetail from './pages/Settings/FAQ/FAQDetail';
import CreateFAQ from './pages/Settings/FAQ/CreateFAQ';

// import Dashboard from "./pages/Dashboard";
// import AnalysisInfo from "./pages/AnalysisInfo";
// import InventoryList from "./pages/InventoryList";
// import StatisticsList from "./pages/StatisticsList";
// import MarketOrderList from "./pages/MarketOrderList";

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
          {/* <Route path='/productregister' element={<ProductRegister />} /> */}
          <Route path='/productdetail/:no' element={<ProductDetail />} />
          <Route path='/brandlist' element={<BrandList />} />
          <Route path='/generalorderdetail' element={<GeneralOrderDetail />} />

          <Route path='/notice' element={<NoticeList />} />
          <Route path='/noticeDetail/:no' element={<NoticeDetail />} />
          <Route path='/createNotice' element={<CreateNotice />} />

          <Route path='/terms' element={<TermsList />} />
          <Route path='/termsDetail/:no' element={<TermsDetail />} />
          <Route path='/createTerms' element={<CreateTerms />} />

          <Route path='/privacy' element={<PrivacyList />} />
          <Route path='/privacyDetail/:no' element={<PrivacyDetail />} />
          <Route path='/createPrivacy' element={<CreatePrivacy />} />

          <Route path='/faq' element={<FAQList />} />
          <Route path='/faqDetail/:no' element={<FAQDetail />} />
          <Route path='/createFaq' element={<CreateFAQ />} />
          {/* <Route path="/analysisinfo" element={<AnalysisInfo />} />
          <Route path="/inventorylist" element={<InventoryList />} />
          <Route path="/statisticslist" element={<StatisticsList />} />
          <Route path="/calculatelist" element={<CalculateList />} />
          <Route path="/marketorderlist" element={<MarketOrderList />} />
          
          {/* <Route path="/dashboard" element={<DashBoard />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
