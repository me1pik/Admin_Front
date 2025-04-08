// src/pages/TermsList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 작성자 클릭 시 상세이동
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
  // 6번, 7번도 홍길동으로 변경
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
  // 8번만 김민수
  {
    no: 13486,
    type: '서비스 정책',
    content: '회사에서 제공하는 법적 서비스 사항',
    author: '김민수 (등급2)',
    createdAt: '2025.04.01',
  },
];

/** 서브헤더 탭: 전체보기 / 공지 / 안내 (프로젝트 특성에 따라 변경 가능) */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '서비스 정책', path: '서비스 정책' },
  { label: '판매정책', path: '판매정책' },
  { label: '훼손정책', path: '훼손정책' },
];

const TermsList: React.FC = () => {
  const navigate = useNavigate(); // 작성자 클릭 시 라우팅

  // 검색 상태
  const [searchTerm, setSearchTerm] = useState('');

  // 현재 선택된 탭 상태
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 이용약관 목록
  const [TermsData] = useState<TermsItem[]>(dummyTerms);

  // 탭 변경 시
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭 필터링 로직
  const dataByTab = TermsData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    // 공지 or 안내 등으로 필터링
    return item.type === selectedTab.label;
  });

  // 검색 로직 (No, 구분, 내용, 작성자, 등록일 포함)
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

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  /** 작성자 클릭 시 상세 페이지로 이동 */
  const handleAuthorClick = (author: string, no: number) => {
    navigate(`/TermsDetail/${no}`);
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
        {/* TermsTable에서 작성자 클릭 시 handleAuthorClick 실행 */}
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
