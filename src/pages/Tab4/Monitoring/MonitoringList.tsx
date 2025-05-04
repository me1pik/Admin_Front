import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MonitoringTable, {
  MonitoringItem,
} from '../../../components/Table/MonitoringTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';

/** 모니터링 더미 데이터 */
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
    shippingRegion: '서울 / 금천구', // ← 추가
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
    shippingRegion: '부산 / 해운대구', // ← 추가
    shippingStatus: '배송준비중',
  },
  // ... 나머지 항목들도 동일하게 shippingRegion 추가
];

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '진행내역', path: '진행내역' },
  { label: '취소내역', path: '취소' },
];

const MonitoringList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;
  const [selectedTab, setSelectedTab] = React.useState<TabItem>(tabs[0]);

  const dataByTab = dummyMonitoring.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    if (selectedTab.label === '진행내역')
      return item.shippingStatus !== '배송취소';
    if (selectedTab.label === '취소내역')
      return item.shippingStatus === '배송취소';
    return true;
  });

  const filteredData = dataByTab.filter((item) => {
    const t = searchTerm;
    return (
      String(item.no).includes(t) ||
      item.orderDate.includes(t) ||
      item.name.toLowerCase().includes(t) ||
      item.buyerAccount.toLowerCase().includes(t) ||
      item.brand.toLowerCase().includes(t) ||
      item.styleCode.toLowerCase().includes(t) ||
      item.size.toLowerCase().includes(t) ||
      item.shippingMethod.toLowerCase().includes(t) ||
      item.shippingRegion.toLowerCase().includes(t) || // ← 검색에도 포함
      item.shippingStatus.toLowerCase().includes(t)
    );
  });

  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  const handleEdit = (no: number) => {
    navigate(`/monitoringdetail/${no}`);
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
