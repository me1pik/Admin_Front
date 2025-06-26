// src/pages/Tab4/Monitoring/MonitoringList.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MonitoringTable, {
  MonitoringItem,
} from '../../../components/Table/MonitoringTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import {
  getRentalSchedules,
  updateRentalScheduleStatus,
  RentalScheduleAdminItem,
} from '../../../api/RentalSchedule/RentalScheduleApi';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '진행내역', path: '진행내역' },
  { label: '취소내역', path: '취소' },
];
// '신청완료'를 맨 앞에 추가
const statuses = [
  '신청완료',
  '배송준비',
  '배송중',
  '배송완료',
  '배송취소',
  '반납중',
  '반납완료',
];

const MonitoringList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [newStatus, setNewStatus] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const [allData, setAllData] = useState<MonitoringItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const first = await getRentalSchedules(1, 1);
        const total = first.count;
        const { rentals } = await getRentalSchedules(total, 1);
        const mapped: MonitoringItem[] = rentals.map(
          (item: RentalScheduleAdminItem) => ({
            no: item.id,
            신청일: item.createAt.split(' ')[0],
            주문자: `${item.userName}(${item.nickname})`,
            대여기간: item.rentalPeriod,
            브랜드: item.brand,
            종류: item.category,
            스타일: item.productNum,
            색상: item.color,
            사이즈: item.size,
            이용권: item.ticketName,
            배송상태: item.deliveryStatus,
          })
        );
        setAllData(mapped);
        setTotalCount(total);
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setSearchParams({ status: tab.path });
    setSelectedRows(new Set());
  };

  const reloadAll = async () => {
    setLoading(true);
    try {
      const first = await getRentalSchedules(1, 1);
      const total = first.count;
      const { rentals } = await getRentalSchedules(total, 1);
      const mapped = rentals.map((item: RentalScheduleAdminItem) => ({
        no: item.id,
        신청일: item.createAt.split(' ')[0],
        주문자: `${item.userName}(${item.nickname})`,
        대여기간: item.rentalPeriod,
        브랜드: item.brand,
        종류: item.category,
        스타일: item.productNum,
        색상: item.color,
        사이즈: item.size,
        이용권: item.ticketName,
        배송상태: item.deliveryStatus,
      }));
      setAllData(mapped);
      setTotalCount(total);
      setSelectedRows(new Set());
      setNewStatus('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkChange = async () => {
    if (!newStatus) return alert('변경할 배송상태를 선택해주세요.');
    if (!selectedRows.size) return alert('선택된 항목이 없습니다.');
    setLoading(true);
    try {
      await Promise.all(
        Array.from(selectedRows).map((id) =>
          updateRentalScheduleStatus(id, { deliveryStatus: newStatus as any })
        )
      );
      alert('배송상태가 일괄 변경되었습니다.');
      await reloadAll();
    } catch {
      alert('일괄 변경 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  const handleRowSave = async (id: number, status: string) => {
    setLoading(true);
    try {
      await updateRentalScheduleStatus(id, { deliveryStatus: status as any });
      alert('상태가 변경되었습니다.');
      await reloadAll();
    } catch {
      alert('변경 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  const dataByTab = allData.filter((i) =>
    selectedTab.label === '전체보기'
      ? true
      : selectedTab.label === '진행내역'
        ? i.배송상태 !== '배송취소'
        : i.배송상태 === '배송취소'
  );
  const filtered = dataByTab.filter((i) => {
    const t = searchTerm;
    return [
      String(i.no),
      i.신청일,
      i.주문자,
      i.대여기간,
      i.브랜드,
      i.종류,
      i.스타일,
      i.색상,
      i.사이즈,
      i.배송상태,
    ]
      .join(' ')
      .toLowerCase()
      .includes(t);
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const paged = filtered.slice((page - 1) * limit, page * limit);

  const toggleAll = () =>
    setSelectedRows((prev) =>
      prev.size === paged.length ? new Set() : new Set(paged.map((i) => i.no))
    );
  const toggleRow = (no: number) =>
    setSelectedRows((prev) => {
      const s = new Set(prev);
      s.has(no) ? s.delete(no) : s.add(no);
      return s;
    });
  const handleEdit = (no: number) =>
    navigate(`/monitoringdetail/${no}?page=${page}`);

  return (
    <Content>
      <HeaderTitle>대여 내역</HeaderTitle>
      <SubHeader tabs={tabs} onTabChange={handleTabChange} />
      <InfoBar>
        <TotalCountText>총 {totalCount}건</TotalCountText>
        <FilterGroup>
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value=''>변경할 상태</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <BulkButton onClick={handleBulkChange}>일괄변경</BulkButton>
        </FilterGroup>
      </InfoBar>
      {loading ? (
        <LoadingText>로딩 중…</LoadingText>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <TableContainer>
          <MonitoringTable
            filteredData={paged}
            handleEdit={handleEdit}
            selectedRows={selectedRows}
            toggleRow={toggleRow}
            toggleAll={toggleAll}
            statuses={statuses}
            onSave={handleRowSave}
          />
        </TableContainer>
      )}
      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};
export default MonitoringList;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 10px;
  font-size: 14px;
`;
const HeaderTitle = styled.h1`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 18px;
`;
const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
const TotalCountText = styled.div`
  font-weight: 900;
  font-size: 12px;
`;
const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
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
`;
const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
`;
const ErrorText = styled.div`
  text-align: center;
  color: red;
  padding: 20px;
`;
const TableContainer = styled.div`
  box-sizing: border-box;
`;
const FooterRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
