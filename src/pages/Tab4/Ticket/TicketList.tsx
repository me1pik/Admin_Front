// src/pages/Ticket/TicketList.tsx
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

  // 파라미터
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const limit = 10;

  // 전체 데이터
  const [allTickets, setAllTickets] = useState<AdminTicketItem[]>([]);

  const [loading, setLoading] = useState(false);

  // 1) 전체 데이터 한 번에 불러오기
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // 1-1. 전체 개수 얻기
        const first = await getAdminPaginatedTickets(1, 1);
        const total = first.total;

        // 1-2. 전체 데이터 한 번에 요청
        const { tickets } = await getAdminPaginatedTickets(1, total);
        setAllTickets(tickets);
      } catch (err) {
        console.error('관리자용 티켓 전체 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // 2) 탭 변경 핸들러 (status 필터 + 페이지 1로)
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setSearchParams({ status: tab.path });
  };

  // 3) 탭 필터링
  const dataByTab = allTickets.filter((t) =>
    selectedTab.path === '' ? true : t.ticket_status === selectedTab.path
  );

  // 4) 검색 필터링 (case-insensitive)
  const filteredData = dataByTab.filter((t) => {
    const txt = searchTerm;
    return (
      String(t.id).toLowerCase().includes(txt) ||
      t.purchaseDate.toLowerCase().includes(txt) ||
      (t.nextDate || '-').toLowerCase().includes(txt) ||
      t.user.toLowerCase().includes(txt) ||
      t.ticket_name.toLowerCase().includes(txt) ||
      t.이용기간.toLowerCase().includes(txt) ||
      t.ticket_count.toLowerCase().includes(txt) ||
      t.ticket_status.toLowerCase().includes(txt)
    );
  });

  // 5) 클라이언트 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filteredData.length / limit));
  const paginated = filteredData.slice((page - 1) * limit, page * limit);

  // 6) 테이블용 매핑
  const tableData: TicketItem[] = paginated.map((t) => ({
    no: t.id,
    paymentDate: t.purchaseDate,
    nextPaymentDate: t.nextDate || '-',
    user: t.user,
    type: t.ticket_name,
    usagePeriod: t.이용기간 === '-' ? '-' : t.이용기간.replace(/-/g, '.'),
    usageCount: t.ticket_count,
    status: t.ticket_status,
  }));

  const handleEdit = (no: number) => {
    navigate(`/ticketDetail/${no}`);
  };

  return (
    <Content>
      <HeaderTitle>이용권 내역</HeaderTitle>
      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>
          {loading ? '로딩 중...' : `총 ${filteredData.length}건`}
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

/* Styled Components */
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
