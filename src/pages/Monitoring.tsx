// src/pages/MonitoringList.tsx
import React, { useState } from 'react';
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
    shippingStatus: '배송취소중', // 검정 박스
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
    shippingStatus: '배송완료', // #4AA361
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
    shippingStatus: '배송중', // 초록
  },
];

/** 서브헤더 탭: 전체보기 / 진행내역 / 취소내역 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '진행내역', path: '진행내역' },
  { label: '취소내역', path: '취소' },
];

const Monitoring: React.FC = () => {
  // 검색 상태 (검색 분류 제거)
  const [searchTerm, setSearchTerm] = useState('');

  // 현재 선택된 탭 상태 (기본값: "전체보기")
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 모니터링 목록 (임시 데이터)
  const [monitoringData] = useState<MonitoringItem[]>(dummyMonitoring);

  // 탭 변경 시
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭 필터링:
  // "전체보기": 모든 데이터,
  // "진행내역": 배송상태가 "배송중", "배송완료", "배송 준비중", "배송취소중" 등 '취소' 이외,
  // "취소내역": 배송상태가 "취소" 인 항목만
  const dataByTab = monitoringData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    if (selectedTab.label === '진행내역') {
      return item.shippingStatus !== '취소';
    }
    if (selectedTab.label === '취소내역') {
      return item.shippingStatus === '취소';
    }
    return true;
  });

  // 검색 로직: 모든 문자열 필드 및 번호(no)도 문자열 변환 후 검색
  const filteredData = dataByTab.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      String(item.no).includes(lowerTerm) ||
      item.orderDate.toLowerCase().includes(lowerTerm) ||
      item.name.toLowerCase().includes(lowerTerm) ||
      item.buyerAccount.toLowerCase().includes(lowerTerm) ||
      item.brand.toLowerCase().includes(lowerTerm) ||
      item.styleCode.toLowerCase().includes(lowerTerm) ||
      item.size.toLowerCase().includes(lowerTerm) ||
      item.shippingMethod.toLowerCase().includes(lowerTerm) ||
      item.shippingStatus.toLowerCase().includes(lowerTerm)
    );
  });

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 주문자(계정) 클릭 시 이벤트
  const handleEdit = (account: string) => {
    alert(`주문자 계정(${account}) 클릭됨`);
  };

  return (
    <Content>
      <HeaderTitle>모니터링 내역</HeaderTitle>
      <SubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tabs={tabs}
        onTabChange={handleTabChange}
      />
      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>
      <TableContainer>
        <MonitoringTable
          filteredData={currentPageData}
          handleEdit={handleEdit}
        />
      </TableContainer>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </Content>
  );
};

export default Monitoring;

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
  line-height: 18px;
  color: #000000;
  margin-bottom: 18px;
`;

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TotalCountText = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
`;
