import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TicketTable, { TicketItem } from '../../../components/Table/TicketTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import {
  getAdminPaginatedTickets,
  AdminTicketItem,
} from '../../../api/Ticket/TicketApi';

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
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const limit = 10;

  const [adminTickets, setAdminTickets] = useState<AdminTicketItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // 1) API 호출
  useEffect(() => {
    setLoading(true);
    getAdminPaginatedTickets(page, limit)
      .then(({ total, tickets }) => {
        setTotalCount(total);
        setAdminTickets(tickets);
      })
      .catch((err) => {
        console.error('관리자용 티켓 조회 실패:', err);
      })
      .finally(() => setLoading(false));
  }, [page]);

  // 2) 탭 필터링
  const dataByTab = adminTickets.filter((t) =>
    selectedTab.path === '' ? true : t.ticket_status === selectedTab.path
  );

  // 3) 검색 필터링
  const filteredData = dataByTab.filter((t) => {
    const txt = searchTerm;
    return (
      String(t.id).includes(txt) ||
      t.purchaseDate.includes(txt) ||
      t.nextDate.includes(txt) ||
      t.user.toLowerCase().includes(txt) ||
      t.ticket_name.toLowerCase().includes(txt) ||
      t.이용기간.toLowerCase().includes(txt) ||
      t.ticket_count.toLowerCase().includes(txt) ||
      t.ticket_status.toLowerCase().includes(txt)
    );
  });

  // 4) 서버 페이징에 맞춰 slice 제거
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const currentPageData = filteredData;

  // 5) AdminTicketItem → TicketItem 매핑
  const tableData: TicketItem[] = currentPageData.map((t) => ({
    no: t.id,
    paymentDate: t.purchaseDate,
    nextPaymentDate: t.nextDate || '-',
    user: t.user,
    type: t.ticket_name,
    usagePeriod: t.이용기간 === '-' ? '-' : t.이용기간.replace(/-/g, '.'),
    usageCount: t.ticket_count,
    status: t.ticket_status,
  }));

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
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
        <TotalCountText>
          {loading ? '로딩 중...' : `총 ${totalCount}건`}
        </TotalCountText>
      </InfoBar>

      <TableContainer>
        <TicketTable filteredData={tableData} handleEdit={handleEdit} />
      </TableContainer>

      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default TicketList;

/* Styled Components 이하 생략(변경 없음) */

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
