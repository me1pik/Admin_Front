// src/pages/Pagelist.tsx

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PageTable, { User } from '../components/Table/PageTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

/** 탭 목록 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '일반회원', path: '일반' },
  { label: '블럭회원', path: '블럭' },
];

/** 더미 데이터 (이미지 예시 기반) */
const dummyData: User[] = [
  {
    no: 13486,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mivin',
    season: '2025 / 1분기',
    contentsCount: '6개',
    submitCount: '6개',
    average: 150,
    totalSum: 2482,
  },
  {
    no: 13485,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'Cobrasin',
    season: '2025 / 1분기',
    contentsCount: '6개',
    submitCount: '6개',
    average: 140,
    totalSum: 980,
  },
  {
    no: 13484,
    grade: '블럭',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mert_eunse',
    season: '2025 / 1분기',
    contentsCount: '6개',
    submitCount: '6개',
    average: 120,
    totalSum: 720,
  },
  {
    no: 13483,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'jimmy.stayann',
    season: '2025 / 1분기',
    contentsCount: '6개',
    submitCount: '6개',
    average: 130,
    totalSum: 910,
  },
  {
    no: 13482,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mikyong___x',
    season: '2025 / 1분기',
    contentsCount: '6개',
    submitCount: '6개',
    average: 110,
    totalSum: 660,
  },
  {
    no: 13481,
    grade: '블럭',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'blossom520',
    season: '2025 / 1분기',
    contentsCount: '6개',
    submitCount: '6개',
    average: 180,
    totalSum: 1620,
  },
];

const Pagelist: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [page, setPage] = useState(1);
  const limit = 10;

  // 탭 변경
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭에 따른 필터링
  const dataByTab = dummyData.filter((item) =>
    selectedTab.label === '전체보기' ? true : item.grade === selectedTab.path
  );

  // URL 검색어로 필터링
  const filteredData = dataByTab.filter((item) => {
    const t = searchTerm;
    return (
      String(item.no).includes(t) ||
      item.grade.toLowerCase().includes(t) ||
      item.name.toLowerCase().includes(t) ||
      item.nickname.toLowerCase().includes(t) ||
      item.instagram.toLowerCase().includes(t) ||
      item.season.toLowerCase().includes(t) ||
      item.contentsCount.toLowerCase().includes(t) ||
      item.submitCount.toLowerCase().includes(t) ||
      String(item.average).includes(t) ||
      String(item.totalSum).includes(t)
    );
  });

  // 페이지네이션 계산
  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 인스타 계정 클릭 시 상세 페이지 이동
  const handleEdit = (no: number) => {
    navigate(`/userdetail/${no}`);
  };

  return (
    <Content>
      <HeaderTitle>페이지 목록</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>

      <TableContainer>
        {/* 여기서 prop 이름을 data로 변경 */}
        <PageTable data={currentPageData} handleEdit={handleEdit} />
      </TableContainer>

      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default Pagelist;

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
