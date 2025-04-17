// src/pages/OrderList.tsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import OrderTable, { Order } from '../components/Table/OrderTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

/** 주문 더미 데이터 (paymentDate 제거) */
const dummyOrders: Order[] = [
  {
    no: 13486,
    orderDate: '2024-12-12',
    buyerAccount: 'style_hwan',
    brand: 'CC Collect',
    styleCode: 'CA234ES321',
    size: '55 (M)',
    productOption: 'BLACK',
    paymentMethod: '일시불',
    paymentStatus: '결제 완료',
  },
  {
    no: 13485,
    orderDate: '2024-12-12',
    buyerAccount: 'jmarr_sunwoo',
    brand: 'M.IO.DES.PHNE',
    styleCode: '20MEE090',
    size: '55 (M)',
    productOption: 'PINK',
    paymentMethod: '카드결제',
    paymentStatus: '취소일정',
  },
  {
    no: 13484,
    orderDate: '2024-12-12',
    buyerAccount: 'jimmyInstagram',
    brand: 'M.IO.DES.PHNE',
    styleCode: '20MEE090',
    size: '55 (M)',
    productOption: 'BLACK',
    paymentMethod: '계좌이체',
    paymentStatus: '환불 진행중',
  },
  {
    no: 13483,
    orderDate: '2024-12-12',
    buyerAccount: 'mkkyoons_k',
    brand: 'SATIN',
    styleCode: '24AGT609',
    size: '55 (M)',
    productOption: 'PINK',
    paymentMethod: '계좌이체',
    paymentStatus: '환불 완료',
  },
  {
    no: 13482,
    orderDate: '2024-12-12',
    buyerAccount: 'olive3625',
    brand: 'ZZOC',
    styleCode: '12MEE099',
    size: '55 (M)',
    productOption: 'BLACK',
    paymentMethod: '카드결제',
    paymentStatus: '결제실패',
  },
  {
    no: 13481,
    orderDate: '2024-12-12',
    buyerAccount: 'biscossiny520',
    brand: 'MOMOA',
    styleCode: '23APY010',
    size: '55 (M)',
    productOption: 'LIGHT BEIGE',
    paymentMethod: '일시불',
    paymentStatus: '결제 완료',
  },
  {
    no: 13480,
    orderDate: '2024-12-12',
    buyerAccount: 'biscossiny520',
    brand: 'MOMOA',
    styleCode: '23APY010',
    size: '55 (M)',
    productOption: 'GRAY',
    paymentMethod: '카드결제',
    paymentStatus: '취소일정',
  },
  {
    no: 13479,
    orderDate: '2024-12-12',
    buyerAccount: 'biscossiny520',
    brand: 'MOMOA',
    styleCode: '23APY010',
    size: '55 (M)',
    productOption: 'LIGHT BLUE',
    paymentMethod: '계좌이체',
    paymentStatus: '환불 진행중',
  },
];

/** 서브헤더 탭: 전체보기 / 주문내역 / 완료내역 / 취소내역 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '주문내역', path: '주문내역' },
  { label: '완료내역', path: '결제 완료' },
  { label: '취소내역', path: '취소일정' },
];

const OrderList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [page, setPage] = useState(1);
  const limit = 10;

  // 탭별 1차 필터링
  const dataByTab = dummyOrders.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    if (selectedTab.label === '주문내역') return true;
    return item.paymentStatus === selectedTab.path;
  });

  // URL 검색어로 2차 필터링
  const filteredData = dataByTab.filter((item) => {
    const t = searchTerm;
    return (
      String(item.no).includes(t) ||
      item.orderDate.toLowerCase().includes(t) ||
      item.buyerAccount.toLowerCase().includes(t) ||
      item.brand.toLowerCase().includes(t) ||
      item.styleCode.toLowerCase().includes(t) ||
      item.size.toLowerCase().includes(t) ||
      item.productOption.toLowerCase().includes(t) ||
      item.paymentMethod.toLowerCase().includes(t) ||
      item.paymentStatus.toLowerCase().includes(t)
    );
  });

  // 페이지네이션 계산
  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 예: 주문자 계정 클릭 시 이벤트
  const handleEdit = (account: string) => {
    alert(`주문자 계정(${account}) 클릭됨`);
  };

  return (
    <Content>
      <HeaderTitle>일반 주문내역</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
      </InfoBar>

      <TableContainer>
        <OrderTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>

      <FooterRow>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default OrderList;

/* ====================== Styled Components ====================== */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  flex-grow: 1;
  font-size: 14px;
  padding: 10px;
`;

const HeaderTitle = styled.h1`
  text-align: left;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 18px;
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TotalCount = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;
