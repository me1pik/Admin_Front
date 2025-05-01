// src/pages/Settings/Terms/TermsList.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import TermsTable, {
  TermsItem,
} from '../../../components/Table/Setting/TermsTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import RegisterButton from '../../../components/RegisterButton';

/** 이용약관 더미 */
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
    content: '제3장 - 서비스 제공 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13489,
    type: '서비스 정책',
    content: '법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13490,
    type: '서비스 정책',
    content: '법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13491,
    type: '서비스 정책',
    content: '법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13492,
    type: '서비스 정책',
    content: '법적 서비스 사항',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13493,
    type: '서비스 정책',
    content: '법적 서비스 사항',
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

const termsSelectOptions: TabItem[] = [
  { label: '서비스 정책', path: '서비스 정책' },
  { label: '판매정책', path: '판매정책' },
  { label: '훼손정책', path: '훼손정책' },
];

const TermsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  const filtered = useMemo(() => {
    return dummyTerms
      .filter(
        (item) =>
          selectedTab.label === '전체보기' || item.type === selectedTab.label
      )
      .filter((item) =>
        [
          String(item.no),
          item.type,
          item.content,
          item.author,
          item.createdAt,
        ].some((f) => f.toLowerCase().includes(searchTerm))
      );
  }, [selectedTab, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const pageData = useMemo(
    () => filtered.slice((page - 1) * limit, (page - 1) * limit + limit),
    [filtered, page]
  );

  const onTabChange = useCallback(
    (tab: TabItem) => {
      setSelectedTab(tab);
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev.entries()),
        page: '1',
      }));
    },
    [setSearchParams]
  );

  const onRowClick = useCallback(
    (_a: string, no: number) => {
      navigate(`/termsDetail/${no}`, {
        state: { selectOptions: termsSelectOptions },
      });
    },
    [navigate]
  );

  return (
    <Content>
      <HeaderTitle>이용약관</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={onTabChange} />

      <InfoBar>
        <TotalCountText>Total: {filtered.length}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <TermsTable filteredData={pageData} handleEdit={onRowClick} />
      </TableContainer>

      <FooterRow>
        <Pagination
          totalPages={totalPages}
          leftComponent={
            <RegisterButton
              text='등록하기'
              onClick={() => navigate('/createTerms')}
            />
          }
        />
      </FooterRow>
    </Content>
  );
};

export default TermsList;

/* Styled Components */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  flex-grow: 1;
  padding: 10px;
`;
const HeaderTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF';
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
  font-family: 'NanumSquare Neo OTF';
  font-weight: 900;
  font-size: 12px;
`;
const TableContainer = styled.div`
  box-sizing: border-box;
`;
const FooterRow = styled.div`
  width: 100%;
  margin-top: 40px;
`;
