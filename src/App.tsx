import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminList from './pages/Tab2/Admins/AdminList';
import UserList from './pages/Tab3/Users/UserList';
import TicketList from './pages/Tab4/Ticket/TicketList';
import TicketDetail from './pages/Tab4/Ticket/TicketDetail';
import MonitoringList from './pages/Tab4/Monitoring/MonitoringList';
import MonitoringDetail from './pages/Tab4/Monitoring/MonitoringDetail';
import Layout from './Layout';
import ProductList from './pages/Tab4/Product/ProductList';
import ProductDetail from './pages/Tab4/Product/ProductDetail';
import UserDetail from './pages/Tab3/Users/UserDetail';
import AdminDetail from './pages/Tab2/Admins/AdminDetail';
import PageList from './pages/Tab3/Page/PageList';
import PageDetail from './pages/Tab3/Page/PageDetail';
import ProductEvaluation from './pages/Tab3/Evaluation/ProductEvaluation';
import EvaluationDetail from './pages/Tab3/Evaluation/EvaluationDetail';
import SalesList from './pages/Tab3/Sales/SalesList';
import SalesDetail from './pages/Tab3/Sales/SalesDetail';
import CalculateList from './pages/Tab3/Calculate/CalculateList';
import CalculateDetail from './pages/Tab3/Calculate/CalculateDetail';
import BrandList from './pages/Tab4/Brand/BrandList';
import BrandDetail from './pages/Tab4/Brand/BrandDetail';
import GeneralOrderList from './pages/Tab4/Order/GeneralOrderList';
import GeneralOrderDetail from './pages/Tab4/Order/GeneralOrderDetail';
import MarketOrderList from './pages/Tab4/Market/MarketOrderList';
import MarketOrderDetail from './pages/Tab4/Market/MarketOrderDetail';
import NoticeList from './pages/Tab5/Notice/NoticeList';
import NoticeDetail from './pages/Tab5/Notice/NoticeDetail';
import CreateNotice from './pages/Tab5/Notice/CreateNotice';
import TermsList from './pages/Tab5/Terms/TermsList';
import TermsDetail from './pages/Tab5/Terms/TermsDetail';
import CreateTerms from './pages/Tab5/Terms/CreateTerms';
import PrivacyList from './pages/Tab5/Privac/PrivacyList';
import PrivacyDetail from './pages/Tab5/Privac/PrivacyDetail';
import CreatePrivacy from './pages/Tab5/Privac/CreatePrivacy';
import FAQList from './pages/Tab5/FAQ/FAQList';
import FAQDetail from './pages/Tab5/FAQ/FAQDetail';
import CreateFAQ from './pages/Tab5/FAQ/CreateFAQ';
import Dashboard from './pages/Tab1/Dashboard';
import AnalysisInfo from './pages/Tab2/Analysis/AnalysisInfo';

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
          <Route path='/pagedetail/:no' element={<PageDetail />} />
          <Route path='/product-evaluation' element={<ProductEvaluation />} />
          <Route path='/evaluationdetail/:no' element={<EvaluationDetail />} />
          <Route path='/saleslist' element={<SalesList />} />
          <Route path='/salesdetail/:no' element={<SalesDetail />} />
          <Route path='/calculatelist' element={<CalculateList />} />
          <Route path='/calculatedetail/:no' element={<CalculateDetail />} />

          {/* 여기를 email 파라미터로 변경 */}
          <Route path='/userdetail/:email' element={<UserDetail />} />

          <Route path='/ticketlist' element={<TicketList />} />
          <Route path='/ticketDetail/:no' element={<TicketDetail />} />
          <Route path='/monitoringlist' element={<MonitoringList />} />
          <Route path='/monitoringdetail/:no' element={<MonitoringDetail />} />
          <Route path='/productlist' element={<ProductList />} />
          <Route path='/productdetail/:no' element={<ProductDetail />} />
          <Route path='/brandlist' element={<BrandList />} />
          <Route path='/branddetail/:no' element={<BrandDetail />} />
          <Route path='/generalorderList' element={<GeneralOrderList />} />
          <Route
            path='/generalorderdetail/:no'
            element={<GeneralOrderDetail />}
          />
          <Route path='/marketorderList' element={<MarketOrderList />} />
          <Route
            path='/marketorderdetail/:no'
            element={<MarketOrderDetail />}
          />
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
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analysisInfo' element={<AnalysisInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
