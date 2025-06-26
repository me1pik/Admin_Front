// src/pages/Tab4/Product/ProductList.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductTable, {
  ProductItem,
} from '../../../components/Table/ProductTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import {
  getProducts,
  updateProductsStatus,
  ProductListResponse,
} from '../../../api/adminProduct';

const tabs: TabItem[] = [
  { label: '전체보기', path: '전체보기' },
  { label: '등록완료', path: '등록완료' },
  { label: '등록대기', path: '등록대기' },
  { label: '판매종료', path: '판매종료' },
];

const statuses: Array<{ label: string; value: string }> = [
  { label: '등록완료', value: '1' },
  { label: '등록대기', value: '0' },
  { label: '판매종료', value: '2' },
];

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 파라미터
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const statusParam = searchParams.get('status') ?? tabs[0].path;

  const matchedTab = tabs.find((t) => t.path === statusParam) || tabs[0];
  const [selectedTab, setSelectedTab] = useState<TabItem>(matchedTab);

  // 전체 데이터
  const [allData, setAllData] = useState<ProductItem[]>([]);
  const [newStatus, setNewStatus] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const limit = 10;

  // 1) 전체 개수 → 전체 데이터 한 번에 불러오기
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const first: ProductListResponse = await getProducts({
          status: undefined,
          search: undefined,
          page: 1,
          limit: 1,
        });
        const total = first.totalCount;

        const res: ProductListResponse = await getProducts({
          status: undefined,
          search: undefined,
          page: 1,
          limit: total,
        });

        // any[]로 취급해서 color가 null일 경우 ''로 대체
        const uiItems: ProductItem[] = (res.items as any[]).map((item) => ({
          no: item.no,
          styleCode: item.styleCode,
          brand: item.brand,
          category: item.category,
          color: item.color ?? '',
          size: item.size,
          price: item.retailPrice,
          registerDate: item.registerDate,
          status: item.status,
        }));

        setAllData(uiItems);
      } catch (err) {
        console.error('제품 전체 조회 실패', err);
      }
    };
    fetchAll();
  }, []);

  // 탭 URL 동기화
  useEffect(() => {
    setSelectedTab(matchedTab);
  }, [matchedTab]);

  // 탭 변경
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.status = tab.path;
    params.page = '1';
    delete params.search;
    setSearchParams(params);
  };

  // 2) 탭 필터링
  const dataByTab = allData.filter((item) =>
    selectedTab.path === '전체보기' ? true : item.status === selectedTab.path
  );

  // 3) 검색 필터링 (case-insensitive)
  const filtered = dataByTab.filter((item) => {
    const txt = searchTerm;
    return (
      String(item.no).toLowerCase().includes(txt) ||
      (item.styleCode ?? '').toLowerCase().includes(txt) ||
      (item.brand ?? '').toLowerCase().includes(txt) ||
      (item.category ?? '').toLowerCase().includes(txt) ||
      (item.color ?? '').toLowerCase().includes(txt) ||
      String(item.price).toLowerCase().includes(txt) ||
      (item.status ?? '').toLowerCase().includes(txt)
    );
  });

  // 4) 클라이언트 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  // 5) 일괄 상태 변경
  const handleBulkChange = async () => {
    if (!newStatus) {
      alert('변경할 상태를 선택해주세요.');
      return;
    }
    if (selectedRows.size === 0) {
      alert('변경할 상품을 선택해주세요.');
      return;
    }
    try {
      await updateProductsStatus({
        ids: Array.from(selectedRows),
        registration: parseInt(newStatus, 10),
      });

      const label = statuses.find((s) => s.value === newStatus)?.label || '';
      setAllData((prev) =>
        prev.map((item) =>
          selectedRows.has(item.no) ? { ...item, status: label } : item
        )
      );
      alert(
        `선택된 ${selectedRows.size}개 상품을 "${label}" 상태로 변경했습니다.`
      );
      setSelectedRows(new Set());
      setNewStatus('');
    } catch (err) {
      console.error('일괄 변경 실패', err);
      alert('일괄 변경 중 오류가 발생했습니다.');
    }
  };

  // 체크박스 토글
  const toggleRow = (no: number) => {
    const copy = new Set(selectedRows);
    copy.has(no) ? copy.delete(no) : copy.add(no);
    setSelectedRows(copy);
  };
  const toggleAll = () => {
    if (selectedRows.size === paginated.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginated.map((i) => i.no)));
    }
  };

  // 편집 이동
  const handleEdit = (_styleCode: string, no: number) => {
    navigate(`/productdetail/${no}${window.location.search}`);
  };

  return (
    <Content>
      <HeaderTitle>제품 관리</HeaderTitle>
      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCount>Total: {filtered.length}건</TotalCount>
        <FilterGroup>
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value=''>변경할 상태</option>
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
          <BulkButton onClick={handleBulkChange}>일괄변경</BulkButton>
        </FilterGroup>
      </InfoBar>

      <TableContainer>
        <ProductTable
          filteredData={paginated}
          handleEdit={handleEdit}
          startNo={(page - 1) * limit}
          selectedRows={selectedRows}
          toggleRow={toggleRow}
          toggleAll={toggleAll}
        />
      </TableContainer>

      <FooterRow>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => {
            const params = Object.fromEntries(searchParams.entries());
            params.page = p.toString();
            setSearchParams(params);
          }}
        />
      </FooterRow>
    </Content>
  );
};

export default ProductList;

/* Styled Components */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const TotalCount = styled.div`
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
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;
