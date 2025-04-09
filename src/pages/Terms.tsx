// src/pages/TermsList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TermsTable, { TermsItem } from '../components/Table/Setting/TermsTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

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
    no: 13486,
    type: '서비스 정책',
    content: '제2장 - 책임제한 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스 정책',
    content: '제3장 - 서비스 제공 사항 (무엇무엇)',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스 정책',
    content: '회사에서 제공하는 법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스 정책',
    content: '회사에서 제공하는 법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스 정책',
    content: '회사에서 제공하는 법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스 정책',
    content: '회사에서 제공하는 법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
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

// Terms용 selectOptions
const termsSelectOptions: TabItem[] = [
  { label: '서비스 정책', path: '' },
  { label: '판매정책', path: '' },
  { label: '훼손정책', path: '' },
];

const TermsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [TermsData] = useState<TermsItem[]>(dummyTerms);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  const dataByTab = TermsData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    return item.type === selectedTab.label;
  });

  const filteredData = dataByTab.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      String(item.no).includes(lowerTerm) ||
      item.type.toLowerCase().includes(lowerTerm) ||
      item.content.toLowerCase().includes(lowerTerm) ||
      item.author.toLowerCase().includes(lowerTerm) ||
      item.createdAt.toLowerCase().includes(lowerTerm)
    );
  });

  const [page, setPage] = useState(1);
  const limit = 10;
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  const handleAuthorClick = (_author: string, no: number) => {
    navigate(`/settingsDetail/${no}`, {
      state: { selectOptions: termsSelectOptions },
    });
  };

  return (
    <Content>
      <HeaderTitle>이용약관</HeaderTitle>
      <SubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tabs={tabs}
        onTabChange={handleTabChange}
      />
      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>
      <TableContainer>
        <TermsTable
          filteredData={currentPageData}
          handleEdit={handleAuthorClick}
        />
      </TableContainer>
      <FooterRow>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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

const TotalCountText = styled.div`
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
