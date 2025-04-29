// src/pages/TermsList.tsx
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import TermsTable, {
  TermsItem,
} from '../../../components/Table/Setting/TermsTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';

/** 이용약관 더미 데이터 */
const dummyTerms: TermsItem[] = [
  {
    no: 13486,
    type: '서비스 정책',
    content: '제1장 - 총칙',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13487,
    type: '서비스 정책',
    content: '제2장 - 책임제한 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13488,
    type: '서비스 정책',
    content: '제3장 - 서비스 제공 사항 (무엇무엇)',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13489,
    type: '서비스 정책',
    content: '회사에서 제공하는 법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13490,
    type: '서비스 정책',
    content: '회사에서 제공하는 법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13491,
    type: '서비스 정책',
    content: '회사에서 제공하는 법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13492,
    type: '서비스 정책',
    content: '회사에서 제공하는 법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13493,
    type: '서비스 정책',
    content: '회사에서 제공하는 법적 서비스 사항',
    author: '김민수 (등급2)',
    createdAt: '2025.04.01',
  },
];

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '서비스 정책', path: '서비스 정책' },
  { label: '판매정책', path: '판매정책' },
  { label: '훼손정책', path: '훼손정책' },
];

// Terms용 selectOptions (상세페이지로 전달)
const termsSelectOptions: TabItem[] = [
  { label: '서비스 정책', path: '' },
  { label: '판매정책', path: '' },
  { label: '훼손정책', path: '' },
];

const TermsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  // URL 쿼리에서 페이지 읽기
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const limit = 10;

  // 1차 탭 필터링
  const dataByTab = dummyTerms.filter((item) =>
    selectedTab.label === '전체보기' ? true : item.type === selectedTab.label
  );

  // 2차 검색어 필터링
  const filteredData = dataByTab.filter((item) =>
    [
      String(item.no),
      item.type,
      item.content,
      item.author,
      item.createdAt,
    ].some((field) => field.toLowerCase().includes(searchTerm))
  );

  // 페이지네이션 로직
  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 탭 변경 시 page=1로 리셋
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  const handleEdit = (_: string, no: number) => {
    navigate(`/termsDetail/${no}`, {
      state: { selectOptions: termsSelectOptions },
    });
  };

  return (
    <Content>
      <HeaderTitle>이용약관</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>

      <TableContainer>
        {/* TermsTable이 요구하는 prop 이름은 filteredData 입니다 */}
        <TermsTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>

      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default TermsList;

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
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 18px;
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TotalCountText = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
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
