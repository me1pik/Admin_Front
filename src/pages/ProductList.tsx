// src/pages/ProductList.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import ProductTable, { ProductItem } from '../components/ProductTable';
import SubHeader, { TabItem } from '../components/SubHeader';
import Pagination from '../components/Pagination';
import RegisterButton from '../components/RegisterButton'; // 새 버튼 컴포넌트 임포트

/** 더미 제품 데이터 */
const dummyProducts: ProductItem[] = [
  {
    no: 13486,
    styleCode: '24AWSE231',
    brand: 'CC Collect',
    category: '원피스',
    color: 'BLACK',
    size: '44(S) / 55(M) / 66(L)',
    retailPrice: 540000,
    registerDate: '2024-11-15',
    status: '등록완료',
  },
  {
    no: 23499,
    styleCode: '24AWSO509',
    brand: 'MOMOSA.PHINE',
    category: '원피스',
    color: 'PINK',
    size: '44(S)',
    retailPrice: 540000,
    registerDate: '2024-11-15',
    status: '등록대기',
  },
  {
    no: 13487,
    styleCode: '20MEE090',
    brand: 'SATIN',
    category: '블라우스',
    color: 'BLACK',
    size: '66(L) / 77(XL)',
    retailPrice: 540000,
    registerDate: '2024-11-15',
    status: '등록완료',
  },
  {
    no: 55120,
    styleCode: 'Z24AW5609',
    brand: 'ZZOC',
    category: '원피스',
    color: 'PINK',
    size: '44(S) / 55(M) / 66(L) / 77(XL)',
    retailPrice: 540000,
    registerDate: '2024-11-15',
    status: '판매종료',
  },
  {
    no: 33580,
    styleCode: 'MOAWPD010',
    brand: 'MICHAA',
    category: '팬츠',
    color: 'LIGHT BEIGE',
    size: '44(S) / 55(M) / 66(L) / 77(XL)',
    retailPrice: 540000,
    registerDate: '2024-11-15',
    status: '등록완료',
  },
  {
    no: 33581,
    styleCode: 'MOAWPD110',
    brand: 'MICHAA',
    category: '스커트',
    color: 'GRAY',
    size: '44(S) / 55(M) / 66(L) / 77(XL)',
    retailPrice: 540000,
    registerDate: '2024-11-15',
    status: '등록완료',
  },
  {
    no: 33582,
    styleCode: 'MOAWPD210',
    brand: 'MICHAA',
    category: '원피스',
    color: 'LIGHT BLUE',
    size: '44(S) / 55(M) / 66(L) / 77(XL)',
    retailPrice: 540000,
    registerDate: '2024-11-15',
    status: '등록완료',
  },
];

/** 서브헤더 탭: 전체보기 / 등록완료 / 등록대기 / 판매종료 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '등록완료', path: '등록완료' },
  { label: '등록대기', path: '등록대기' },
  { label: '판매종료', path: '판매종료' },
];

const ProductList: React.FC = () => {
  // 검색 상태 (오직 searchTerm만 사용)
  const [searchTerm, setSearchTerm] = useState('');

  // 현재 선택된 탭 상태 (기본값: "전체보기")
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 제품 목록 (임시 데이터)
  const [productData] = useState<ProductItem[]>(dummyProducts);

  // 탭 변경 시
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭 필터링: 탭이 "전체보기"인 경우 모두 표시, 그 외에는 status 필터링
  const dataByTab = productData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    return item.status === selectedTab.label;
  });

  // 검색 로직: 더미 제품의 모든 필드를 대상으로 검색 (숫자 필드는 문자열 변환)
  const filteredData = dataByTab.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      String(item.no).toLowerCase().includes(lowerTerm) ||
      item.styleCode.toLowerCase().includes(lowerTerm) ||
      item.brand.toLowerCase().includes(lowerTerm) ||
      item.category.toLowerCase().includes(lowerTerm) ||
      item.color.toLowerCase().includes(lowerTerm) ||
      item.size.toLowerCase().includes(lowerTerm) ||
      item.retailPrice.toString().includes(lowerTerm) ||
      item.registerDate.toLowerCase().includes(lowerTerm) ||
      item.status.toLowerCase().includes(lowerTerm)
    );
  });

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 편집(또는 등록/상세보기 등) 버튼 클릭 시 이벤트
  const handleEdit = (styleCode: string) => {
    alert(`스타일 코드(${styleCode}) 클릭됨`);
  };

  // 제품 등록 버튼 클릭 시 이벤트
  const handleRegisterClick = () => {
    alert('제품 등록 버튼 클릭됨');
  };

  return (
    <Content>
      <HeaderTitle>제품관리</HeaderTitle>
      <SubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tabs={tabs}
        onTabChange={handleTabChange}
      />
      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
      </InfoBar>
      <TableContainer>
        <ProductTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>
      {/* 하단에 버튼과 페이지네이션을 한 줄(row)로 정렬 */}
      <FooterRow>
        <RegisterButton text='제품등록' onClick={handleRegisterClick} />
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

/* FooterRow: 버튼과 페이지네이션을 한 줄(row)로 정렬 */
const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
