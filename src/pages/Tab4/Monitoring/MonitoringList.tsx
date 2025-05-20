// src/pages/MonitoringList.tsx
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

// 상태 변경용 옵션
const statuses = [
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
  const [newStatus, setNewStatus] = useState<string>(''); // 변경할 상태
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const [allData, setAllData] = useState<MonitoringItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const { count, rentals } = await getRentalSchedules(limit, page);
        const mapped = rentals.map((item: RentalScheduleAdminItem) => ({
          no: item.id,
          신청일: item.rentalPeriod.split(' ~ ')[0],
          주문자: item.userName,
          대여기간: item.rentalPeriod,
          브랜드: item.brand,
          종류: item.category,
          스타일: item.productNum,
          색상: item.color,
          사이즈: item.size,
          배송상태: item.deliveryStatus,
        }));
        setAllData(mapped);
        setTotalCount(count);
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  // 탭 변경
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: '1',
    });
  };

  // 선택 행 토글
  const toggleRow = (no: number) => {
    const copy = new Set(selectedRows);
    copy.has(no) ? copy.delete(no) : copy.add(no);
    setSelectedRows(copy);
  };

  // 전체 선택/해제
  const toggleAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map((i) => i.no)));
    }
  };

  // 일괄 변경
  const handleBulkChange = async () => {
    if (!newStatus) {
      alert('변경할 배송상태를 선택해주세요.');
      return;
    }
    if (selectedRows.size === 0) {
      alert('변경할 항목을 선택해주세요.');
      return;
    }

    setLoading(true);
    try {
      await Promise.all(
        Array.from(selectedRows).map((id) =>
          updateRentalScheduleStatus(id, {
            deliveryStatus: newStatus as any,
          })
        )
      );
      alert('배송상태가 일괄 변경되었습니다.');

      // 데이터 재로딩
      const { count, rentals } = await getRentalSchedules(limit, page);
      const remapped = rentals.map((item: RentalScheduleAdminItem) => ({
        no: item.id,
        신청일: item.rentalPeriod.split(' ~ ')[0],
        주문자: item.userName,
        대여기간: item.rentalPeriod,
        브랜드: item.brand,
        종류: item.category,
        스타일: item.productNum,
        색상: item.color,
        사이즈: item.size,
        배송상태: item.deliveryStatus,
      }));
      setAllData(remapped);
      setTotalCount(count);
      setSelectedRows(new Set());
      setNewStatus('');
    } catch (err) {
      console.error(err);
      alert('일괄 변경 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 단건 저장
  const handleRowSave = async (id: number, status: string) => {
    try {
      await updateRentalScheduleStatus(id, {
        deliveryStatus: status as any,
      });
      alert(`#${id} 건이 "${status}" 로 변경 저장되었습니다.`);
      // 다시 불러오기
      const { count, rentals } = await getRentalSchedules(limit, page);
      setTotalCount(count);
      setAllData(
        rentals.map((item: RentalScheduleAdminItem) => ({
          no: item.id,
          신청일: item.rentalPeriod.split(' ~ ')[0],
          주문자: item.userName,
          대여기간: item.rentalPeriod,
          브랜드: item.brand,
          종류: item.category,
          스타일: item.productNum,
          색상: item.color,
          사이즈: item.size,
          배송상태: item.deliveryStatus,
        }))
      );
    } catch (err) {
      console.error(err);
      alert(`#${id} 건 저장 중 오류가 발생했습니다.`);
    }
  };

  // 탭 + 검색 필터 적용
  const dataByTab = allData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    if (selectedTab.label === '진행내역') return item.배송상태 !== '배송취소';
    if (selectedTab.label === '취소내역') return item.배송상태 === '배송취소';
    return true;
  });

  const filteredData = dataByTab.filter((item) => {
    const t = searchTerm;
    return (
      String(item.no).includes(t) ||
      item.신청일.includes(t) ||
      item.주문자.includes(t) ||
      item.대여기간.includes(t) ||
      item.브랜드.includes(t) ||
      item.종류.includes(t) ||
      item.스타일.toLowerCase().includes(t) ||
      item.색상.toLowerCase().includes(t) ||
      item.사이즈.toLowerCase().includes(t) ||
      item.배송상태.includes(t)
    );
  });

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const handleEdit = (no: number) => navigate(`/monitoringdetail/${no}`);

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
            <option value=''>변경할 상태 선택</option>
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
        <LoadingText>로딩 중...</LoadingText>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <TableContainer>
          <MonitoringTable
            filteredData={filteredData}
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

/* Styled */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  flex-grow: 1;
  padding: 10px;
  font-size: 14px;
`;
const HeaderTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
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
