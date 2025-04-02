// src/pages/Pagelist.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // 검색어
  const [searchTerm, setSearchTerm] = useState('');

  // 탭 상태
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10;

  // 탭 변경 시
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭에 따른 데이터 필터링
  const dataByTab = dummyData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    return item.grade === selectedTab.path; // "일반" / "블럭"
  });

  // 검색어 필터링
  const filteredData = dataByTab.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      String(item.no).toLowerCase().includes(lowerTerm) ||
      item.grade.toLowerCase().includes(lowerTerm) ||
      item.name.toLowerCase().includes(lowerTerm) ||
      item.nickname.toLowerCase().includes(lowerTerm) ||
      item.instagram.toLowerCase().includes(lowerTerm) ||
      item.season.toLowerCase().includes(lowerTerm) ||
      String(item.contentsCount).includes(lowerTerm) ||
      String(item.submitCount).includes(lowerTerm) ||
      String(item.average).includes(lowerTerm) ||
      String(item.totalSum).includes(lowerTerm)
    );
  });

  // 페이지네이션 계산
  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 인스타 계정 클릭 시, 해당 no로 상세 페이지 이동
  const handleEdit = (no: number) => {
    // 예: 상세 페이지가 /userdetail/:no 라면
    navigate(`/userdetail/${no}`);
  };

  return (
    <Content>
      <HeaderTitle>페이지 목록</HeaderTitle>
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
        <PageTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>
      <FooterRow>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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
