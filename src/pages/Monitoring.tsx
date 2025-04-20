// src/pages/MonitoringList.tsx

import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import MonitoringTable, {
  MonitoringItem,
} from '../components/Table/MonitoringTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

/** 모니터링 더미 데이터 (배송일정 제거) */
const dummyMonitoring: MonitoringItem[] = [
  {
    no: 1,
    orderDate: '2024-11-01',
    name: '홍길동',
    buyerAccount: 'styleweex',
    brand: 'CC Collect',
    styleCode: 'CA234SE321',
    size: '55 (M)',
    shippingMethod: '택배',
    shippingStatus: '배송취소중',
  },
  {
    no: 2,
    orderDate: '2024-11-01',
    name: '홍홍홍',
    buyerAccount: 'jmerr_sunwoo',
    brand: 'M.IO.DES.PHNE',
    styleCode: '20MEE090',
    size: '55 (M)',
    shippingMethod: '택배',
    shippingStatus: '배송준비중',
  },
  {
    no: 3,
    orderDate: '2024-11-01',
    name: '홍민수',
    buyerAccount: 'jimmyInstagram',
    brand: 'M.IO.DES.PHNE',
    styleCode: '20MEE090',
    size: '55 (M)',
    shippingMethod: '퀵서비스',
    shippingStatus: '배송준비중',
  },
  {
    no: 4,
    orderDate: '2024-11-01',
    name: '이영희',
    buyerAccount: 'mkkyoons_k',
    brand: 'SATIN',
    styleCode: '24AGT603',
    size: '55 (M)',
    shippingMethod: '직접수령',
    shippingStatus: '배송완료',
  },
  {
    no: 5,
    orderDate: '2024-11-01',
    name: '홍길자',
    buyerAccount: 'olive3625',
    brand: 'ZZOC',
    styleCode: 'Z24AW5609',
    size: '55 (M)',
    shippingMethod: '택배',
    shippingStatus: '배송취소중',
  },
  {
    no: 6,
    orderDate: '2024-11-01',
    name: '홍길현',
    buyerAccount: 'biscossiny520',
    brand: 'MOMOA',
    styleCode: '23APY010',
    size: '55 (M)',
    shippingMethod: '택배',
    shippingStatus: '배송취소',
  },
  {
    no: 7,
    orderDate: '2024-11-01',
    name: '홍길민',
    buyerAccount: 'biscossiny520',
    brand: 'MOMOA',
    styleCode: '23APY010',
    size: '55 (M)',
    shippingMethod: '택배',
    shippingStatus: '배송완료',
  },
  {
    no: 8,
    orderDate: '2024-11-01',
    name: '홍길환',
    buyerAccount: 'biscossiny520',
    brand: 'MOMOA',
    styleCode: '23APY010',
    size: '55 (M)',
    shippingMethod: '직접수령',
    shippingStatus: '배송중',
  },
];

/** 서브헤더 탭: 전체보기 / 진행내역 / 취소내역 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '진행내역', path: '진행내역' },
  { label: '취소내역', path: '취소' },
];

const MonitoringList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  // URL 쿼리에서 현재 페이지 읽기
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = React.useState<TabItem>(tabs[0]);

  // 탭별 1차 필터링
  const dataByTab = dummyMonitoring.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    if (selectedTab.label === '진행내역') return item.shippingStatus !== '취소';
    if (selectedTab.label === '취소내역') return item.shippingStatus === '취소';
    return true;
  });

  // URL 검색어로 2차 필터링
  const filteredData = dataByTab.filter((item) => {
    const t = searchTerm;
    return (
      String(item.no).includes(t) ||
      item.orderDate.toLowerCase().includes(t) ||
      item.name.toLowerCase().includes(t) ||
      item.buyerAccount.toLowerCase().includes(t) ||
      item.brand.toLowerCase().includes(t) ||
      item.styleCode.toLowerCase().includes(t) ||
      item.size.toLowerCase().includes(t) ||
      item.shippingMethod.toLowerCase().includes(t) ||
      item.shippingStatus.toLowerCase().includes(t)
    );
  });

  // 페이지네이션 계산
  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 탭 변경 시 page=1으로 URL 리셋
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  const handleEdit = (account: string) => {
    alert(`주문자 계정(${account}) 클릭됨`);
  };

  return (
    <Content>
      <HeaderTitle>모니터링 내역</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <MonitoringTable
          filteredData={currentPageData}
          handleEdit={handleEdit}
        />
      </TableContainer>

      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default MonitoringList;

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

const TotalCountText = styled.div`
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
