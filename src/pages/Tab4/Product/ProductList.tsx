// src/pages/ProductList.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductTable, {
  ProductItem,
} from '../../../components/Table/ProductTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
// import RegisterButton from '../components/RegisterButton';
import {
  getProducts,
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

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 꺼내올 기본 값들
  const searchTerm = searchParams.get('search') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const statusParam = searchParams.get('status') ?? tabs[0].path;

  // URL에 맞춰 탭을 초기화 및 동기화
  const matchedTab = tabs.find((t) => t.path === statusParam) || tabs[0];
  const [selectedTab, setSelectedTab] = useState<TabItem>(matchedTab);

  // URL(status)가 바뀌면 selectedTab도 업데이트
  useEffect(() => {
    const updated = tabs.find((t) => t.path === statusParam);
    if (updated) setSelectedTab(updated);
  }, [statusParam]);

  const [productData, setProductData] = useState<ProductItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 10;

  // 검색어, 탭, 페이지가 바뀔 때마다 API 호출
  useEffect(() => {
    const fetchProducts = async () => {
      const params: ProductListParams = {
        status:
          selectedTab.label !== '전체보기' ? selectedTab.label : undefined,
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
    fetchProducts();
  }, [selectedTab, searchTerm, page]);

  // 탭 클릭 시: page=1, status 변경
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.status = tab.path;
    params.page = '1';
    setSearchParams(params);
  };

  // 페이지 변경 시: status, search 유지
  const handlePageChange = (newPage: number) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = newPage.toString();
    setSearchParams(params);
  };

  // 수정 페이지로 이동할 때도 쿼리 유지
  const handleEdit = (_styleCode: string, no: number) => {
    navigate(`/productdetail/${no}${window.location.search}`);
  };

  // const handleRegister = () => {
  //   navigate('/productregister');
  // };

  return (
    <Content>
      <HeaderTitle>제품관리</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
      </InfoBar>

      <TableContainer>
        <ProductTable
          filteredData={productData}
          handleEdit={handleEdit}
          startNo={(page - 1) * limit}
        />
      </TableContainer>

      <FooterRow>
        {/* <RegisterButton text='제품등록' onClick={handleRegister} /> */}
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
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
  margin-bottom: 18px;
`;

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TotalCount = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
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
