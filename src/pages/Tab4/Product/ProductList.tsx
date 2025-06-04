// src/pages/ProductList.tsx

import React, { useState, useEffect } from 'react';
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
  ProductListParams,
  ProductListResponse,
} from '../../../api/adminProduct';

// API에서 내려주는 원시 아이템 타입 (retailPrice 포함)
interface RawProductItem extends ProductItem {
  retailPrice: number;
}

const tabs: TabItem[] = [
  { label: '전체보기', path: '전체보기' },
  { label: '등록완료', path: '등록완료' },
  { label: '등록대기', path: '등록대기' },
  { label: '판매종료', path: '판매종료' },
];

// **newStatus** 값을 숫자 형태의 문자열로 설정합니다.
// 예를 들어 '0': 등록대기, '1': 등록완료, '2': 판매종료 등으로 매핑
const statuses: Array<{ label: string; value: string }> = [
  { label: '등록완료', value: '1' },
  { label: '등록대기', value: '0' },
  { label: '판매종료', value: '2' },
];

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('search') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const statusParam = searchParams.get('status') ?? tabs[0].path;

  const matchedTab = tabs.find((t) => t.path === statusParam) || tabs[0];
  const [selectedTab, setSelectedTab] = useState<TabItem>(matchedTab);

  useEffect(() => {
    const updated = tabs.find((t) => t.path === statusParam);
    if (updated) setSelectedTab(updated);
  }, [statusParam]);

  const [productData, setProductData] = useState<ProductItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 10;

  // newStatus는 숫자 형태의 문자열('0', '1', '2')만을 받습니다.
  const [newStatus, setNewStatus] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const fetchProducts = async () => {
    const params: ProductListParams = {
      status: selectedTab.label !== '전체보기' ? selectedTab.label : undefined,
      search: searchTerm || undefined,
      page,
      limit,
    };
    try {
      const res: ProductListResponse = await getProducts(params);
      const uiItems: ProductItem[] = (res.items as RawProductItem[]).map(
        ({ retailPrice, ...rest }) => ({
          ...rest,
          price: retailPrice,
        })
      );
      setProductData(uiItems);
      setTotalCount(res.totalCount);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('제품 목록 로드 실패', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedTab, searchTerm, page]);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.status = tab.path;
    params.page = '1';
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = newPage.toString();
    setSearchParams(params);
  };

  const handleEdit = (_styleCode: string, no: number) => {
    navigate(`/productdetail/${no}${window.location.search}`);
  };

  const toggleRow = (no: number) => {
    const copy = new Set(selectedRows);
    if (copy.has(no)) copy.delete(no);
    else copy.add(no);
    setSelectedRows(copy);
  };

  const toggleAll = () => {
    if (selectedRows.size === productData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(productData.map((item) => item.no)));
    }
  };

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
      // 숫자로 변환된 newStatus 값을 registration 필드로 전달
      const idsArray = Array.from(selectedRows);
      await updateProductsStatus({
        ids: idsArray,
        registration: parseInt(newStatus, 10),
      });

      // UI에 반영: 선택된 상품들의 status를 label로 업데이트
      const statusLabel =
        statuses.find((s) => s.value === newStatus)?.label || '';
      setProductData((prev) =>
        prev.map((item) =>
          selectedRows.has(item.no)
            ? {
                ...item,
                status: statusLabel,
              }
            : item
        )
      );

      alert(
        `선택된 ${selectedRows.size}개 상품을 "${statusLabel}" 상태로 일괄 변경했습니다.`
      );
      setSelectedRows(new Set());
      setNewStatus('');
    } catch (err) {
      console.error('일괄 변경 실패', err);
      alert('일괄 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <Content>
      <HeaderTitle>제품 관리</HeaderTitle>
      <SubHeader tabs={tabs} onTabChange={handleTabChange} />
      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
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
          filteredData={productData}
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
          onPageChange={handlePageChange}
        />
      </FooterRow>
    </Content>
  );
};

export default ProductList;

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
