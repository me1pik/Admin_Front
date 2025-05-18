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
  RentalScheduleAdminItem,
} from '../../../api/RentalSchedule/RentalScheduleApi';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '진행내역', path: '진행내역' },
  { label: '취소내역', path: '취소' },
];

const statuses = ['배송완료', '배송준비중', '대기중', '배송중', '배송취소'];

const MonitoringList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [shippingFilter, setShippingFilter] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const [allData, setAllData] = useState<MonitoringItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // API 호출 및 데이터 매핑
  useEffect(() => {
    setLoading(true);
    setError('');
    getRentalSchedules(limit, page)
      .then(({ count, rentals }) => {
        // API에서 받은 데이터를 MonitoringTable이 기대하는 형식으로 매핑
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
      })
      .catch((err) => {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      })
      .finally(() => setLoading(false));
  }, [page]);

  // 탭별 필터링
  const dataByTab = allData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    if (selectedTab.label === '진행내역') return item.배송상태 !== '배송취소';
    if (selectedTab.label === '취소내역') return item.배송상태 === '배송취소';
    return true;
  });

  // 검색 + 상태 필터 적용
  const filteredData = dataByTab.filter((item) => {
    const t = searchTerm;
    const matchSearch =
      String(item.no).includes(t) ||
      item.신청일.includes(t) ||
      item.주문자.includes(t) ||
      item.대여기간.includes(t) ||
      item.브랜드.includes(t) ||
      item.종류.includes(t) ||
      item.스타일.toLowerCase().includes(t) ||
      item.색상.toLowerCase().includes(t) ||
      item.사이즈.toLowerCase().includes(t) ||
      item.배송상태.includes(t);
    const matchStatus = shippingFilter
      ? item.배송상태 === shippingFilter
      : true;
    return matchSearch && matchStatus;
  });

  // 페이지네이션은 API 페이징 + 클라이언트 내 필터 이후
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: '1',
    });
  };

  const handleEdit = (no: number) => {
    navigate(`/monitoringdetail/${no}`);
  };

  const toggleRow = (no: number) => {
    const copy = new Set(selectedRows);
    copy.has(no) ? copy.delete(no) : copy.add(no);
    setSelectedRows(copy);
  };

  const toggleAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map((i) => i.no)));
    }
  };

  const handleBulkChange = () => {
    // TODO: 업데이트 API 호출
    console.log('bulk update', Array.from(selectedRows), shippingFilter);
  };

  return (
    <Content>
      <HeaderTitle>대여 내역</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>총 {totalCount}건</TotalCountText>
        <FilterGroup>
          <Select
            value={shippingFilter}
            onChange={(e) => setShippingFilter(e.target.value)}
          >
            <option value=''>배송상태 (선택)</option>
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
        <div>로딩 중...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <TableContainer>
          <MonitoringTable
            filteredData={filteredData}
            handleEdit={handleEdit}
            selectedRows={selectedRows}
            toggleRow={toggleRow}
            toggleAll={toggleAll}
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
const TableContainer = styled.div`
  box-sizing: border-box;
`;
const FooterRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
