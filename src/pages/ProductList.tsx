// src/pages/ProductList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductTable, { ProductItem } from '../components/Table/ProductTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';
import RegisterButton from '../components/RegisterButton';
import {
  getProducts,
  ProductListParams,
  ProductListResponse,
} from '../api/adminProduct';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '등록완료', path: '등록완료' },
  { label: '등록대기', path: '등록대기' },
  { label: '판매종료', path: '판매종료' },
];

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') ?? '';

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [productData, setProductData] = useState<ProductItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  // 탭 변경 시 페이지 초기화
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

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
        setProductData(res.items);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error('제품 목록 로드 실패', err);
      }
    };
    fetchProducts();
  }, [selectedTab, searchTerm, page]);

  const handleEdit = (_: string, no: number) => {
    navigate(`/productdetail/${no}`);
  };

  const handleRegister = () => {
    navigate('/productregister');
  };

  return (
    <Content>
      <HeaderTitle>제품관리</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
      </InfoBar>

      <TableContainer>
        <ProductTable filteredData={productData} handleEdit={handleEdit} />
      </TableContainer>

      <FooterRow>
        <RegisterButton text='제품등록' onClick={handleRegister} />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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
