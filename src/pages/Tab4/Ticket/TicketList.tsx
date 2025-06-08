import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TicketTable, { TicketItem } from '../../../components/Table/TicketTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import {
  getAdminPaginatedTickets,
  changeTicketStatus,
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

  // 체크박스 상태
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  // 일괄변경용 상태
  const [newStatus, setNewStatus] = useState<string>('');
  const [bulkLoading, setBulkLoading] = useState(false);

  // 파라미터
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const limit = 10;

  // 전체 데이터
  const [allTickets, setAllTickets] = useState<AdminTicketItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 조회 함수
  const fetchAll = async () => {
    setLoading(true);
    try {
      const first = await getAdminPaginatedTickets(1, 1);
      const total = first.total;
      const { tickets } = await getAdminPaginatedTickets(1, total);
      setAllTickets(tickets);
      setSelectedRows(new Set());
    } catch (err) {
      console.error('전체 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setSearchParams({ status: tab.path });
    setSelectedRows(new Set());
  };

  const dataByTab = allTickets.filter((t) =>
    selectedTab.path === '' ? true : t.ticket_status === selectedTab.path
  );

  const filteredData = dataByTab.filter((t) => {
    const txt = searchTerm;
    return (
      String(t.id).includes(txt) ||
      t.purchaseDate.toLowerCase().includes(txt) ||
      (t.nextDate || '-').toLowerCase().includes(txt) ||
      t.user.toLowerCase().includes(txt) ||
      t.ticket_name.toLowerCase().includes(txt) ||
      t.이용기간.toLowerCase().includes(txt) ||
      t.ticket_count.toLowerCase().includes(txt) ||
      t.ticket_status.toLowerCase().includes(txt)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / limit));
  const paginated = filteredData.slice((page - 1) * limit, page * limit);

  const tableData: TicketItem[] = paginated.map((t) => ({
    no: t.id,
    paymentDate: t.purchaseDate,
    nextPaymentDate: t.nextDate || '-',
    user: t.user,
    type: t.ticket_name,
    usagePeriod: t.이용기간.replace(/-/g, '.') || '-',
    usageCount: t.ticket_count,
    status: t.ticket_status,
  }));

  const handleEdit = (no: number) => {
    navigate(`/ticketDetail/${no}`);
  };

  // 일괄변경 핸들러
  const handleBulkChange = async () => {
    if (!newStatus || selectedRows.size === 0) return;
    if (
      !window.confirm(
        `선택된 ${selectedRows.size}건 상태를 "${newStatus}"로 변경하시겠습니까?`
      )
    )
      return;
    setBulkLoading(true);
    try {
      await Promise.all(
        Array.from(selectedRows).map((id) =>
          changeTicketStatus(id, {
            status: newStatus,
            isActive: newStatus !== '취소완료',
          })
        )
      );
      alert('상태가 변경되었습니다.');
      setNewStatus('');
      fetchAll();
    } catch (err) {
      console.error('일괄 상태 변경 실패:', err);
      alert('일괄 변경 중 오류가 발생했습니다.');
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <Content>
      <HeaderTitle>이용권 내역</HeaderTitle>
      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>
          {loading ? '로딩 중...' : `총 ${filteredData.length}건`}
        </TotalCountText>
        <FilterGroup>
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value=''>변경할 상태 선택</option>
            {tabs.slice(1).map((tab) => (
              <option key={tab.path} value={tab.path}>
                {tab.label}
              </option>
            ))}
          </Select>
          <BulkButton
            onClick={handleBulkChange}
            disabled={!newStatus || bulkLoading}
          >
            {bulkLoading ? '변경중...' : '일괄변경'}
          </BulkButton>
        </FilterGroup>
      </InfoBar>

      <TableContainer>
        <TicketTable
          filteredData={tableData}
          handleEdit={handleEdit}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
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
  align-items: center;
  margin-bottom: 8px;
`;
const TotalCountText = styled.div`
  font-weight: 700;
  font-size: 12px;
`;
const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;
const Select = styled.select`
  height: 32px;
  padding: 0 8px;
  font-size: 12px;
  border: 1px solid #ccc;
`;
const BulkButton = styled.button`
  height: 32px;
  padding: 0 12px;
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
const TableContainer = styled.div`
  flex-grow: 1;
`;
const FooterRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
