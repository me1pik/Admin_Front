import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TicketTable, { TicketItem } from '../../../components/Table/TicketTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import { FaSearch } from 'react-icons/fa';

/** 대여 더미 데이터 (이용권 내역) */
const dummyTicket: TicketItem[] = [
  {
    no: 100,
    paymentDate: '2025-05-01',
    nextPaymentDate: '2025-06-01',
    user: '안소천 (솔린)',
    type: '정기 구독권 (무제한)',
    usagePeriod: '2025.05.01 ~ 2025.05.31',
    usageCount: '∞ / 3',
    status: '결제완료',
  },
  {
    no: 99,
    paymentDate: '2025-05-01',
    nextPaymentDate: '2025-06-01',
    user: '장주연 (바르체자라디오)',
    type: '정기 구독권 (4회권)',
    usagePeriod: '2025.05.01 ~ 2025.05.31',
    usageCount: '4 / 2',
    status: '결제완료',
  },
  {
    no: 98,
    paymentDate: '2025-05-01',
    nextPaymentDate: '-',
    user: '노경미 (kkkkkk.mi)',
    type: '정기 구독권 (무제한)',
    usagePeriod: '-',
    usageCount: '-',
    status: '결제대기',
  },
  {
    no: 97,
    paymentDate: '2025-05-01',
    nextPaymentDate: '2025-06-01',
    user: '김채원 (고양이 발바닥)',
    type: '정기 구독권 (무제한)',
    usagePeriod: '2025.05.01 ~ 2025.05.31',
    usageCount: '∞ / 0',
    status: '결제완료',
  },
  {
    no: 96,
    paymentDate: '2025-05-01',
    nextPaymentDate: '-',
    user: '안소천 (솔린)',
    type: '1회 이용권',
    usagePeriod: '2025.05.01 ~ 2025.05.31',
    usageCount: '1 / 1',
    status: '결제완료',
  },
  {
    no: 95,
    paymentDate: '2025-05-01',
    nextPaymentDate: '2025-06-01',
    user: '안소천 (솔린)',
    type: '정기 구독권 (4회권)',
    usagePeriod: '2025.05.01 ~ 2025.05.31',
    usageCount: '∞ / 2',
    status: '결제완료',
  },
  {
    no: 94,
    paymentDate: '2025-05-01',
    nextPaymentDate: '-',
    user: '안소천 (솔린)',
    type: '정기 구독권 (4회권)',
    usagePeriod: '-',
    usageCount: '-',
    status: '결제대기',
  },
  {
    no: 93,
    paymentDate: '2025-05-01',
    nextPaymentDate: '-',
    user: '안소천 (솔린)',
    type: '1회 이용권',
    usagePeriod: '2025.05.01 ~ 2025.05.31',
    usageCount: '1 / 0',
    status: '결제완료',
  },
  {
    no: 92,
    paymentDate: '2025-05-01',
    nextPaymentDate: '-',
    user: '안소천 (솔린)',
    type: '1회 이용권',
    usagePeriod: '-',
    usageCount: '-',
    status: '취소완료',
  },
  {
    no: 91,
    paymentDate: '2025-05-01',
    nextPaymentDate: '2025-06-01',
    user: '안소천 (솔린)',
    type: '정기 구독권 (4회권)',
    usagePeriod: '2025.05.01 ~ 2025.05.31',
    usageCount: '4 / 1',
    status: '결제완료',
  },
];

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '결제완료', path: '결제완료' },
  { label: '결제대기', path: '결제대기' },
  { label: '이용완료', path: '이용완료' },
  { label: '취소내역', path: '취소완료' },
];

const TicketList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = React.useState<TabItem>(tabs[0]);

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const limit = 10;

  // 탭별 필터링
  const dataByTab = dummyTicket.filter((item) =>
    selectedTab.path === '' ? true : item.status === selectedTab.path
  );

  // 검색어 필터링
  const filteredData = dataByTab.filter((item) => {
    const t = searchTerm;
    return (
      String(item.no).includes(t) ||
      item.paymentDate.includes(t) ||
      item.nextPaymentDate.includes(t) ||
      item.user.toLowerCase().includes(t) ||
      item.type.toLowerCase().includes(t) ||
      item.usagePeriod.toLowerCase().includes(t) ||
      item.usageCount.toLowerCase().includes(t) ||
      item.status.toLowerCase().includes(t)
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = Object.fromEntries(searchParams.entries());
    params.search = e.target.value;
    params.page = '1';
    setSearchParams(params);
  };

  const handleEdit = (no: number) => {
    navigate(`/ticketDetail/${no}`);
  };

  return (
    <Content>
      <HeaderTitle>이용권 내역</HeaderTitle>
      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>총 {totalCount}건</TotalCountText>
      </InfoBar>

      <TableContainer>
        <TicketTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>

      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default TicketList;

/* ====================== Styled Components ====================== */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
`;

const HeaderTitle = styled.h1`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 4px 8px;
  gap: 6px;

  svg {
    color: #888888;
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    width: 200px;
  }
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const TotalCountText = styled.div`
  font-weight: 700;
  font-size: 12px;
`;

const TableContainer = styled.div`
  flex-grow: 1;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
