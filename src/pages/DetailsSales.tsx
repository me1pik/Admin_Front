// src/pages/DetailsSales.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// 파일명에 맞춰 import 이름 변경
import DetailsSalesTable, { User } from '../components/Table/DetailsSalesTable';
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
    contentsCount: '8개', // 등록 제품수
    submitCount: '30', // 구매 횟수
    average: 12, // 구매 갯수
    totalSum: 1840000, // 총 판매금액
  },
  {
    no: 13485,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'Cobrasin',
    season: '2025 / 1분기',
    contentsCount: '8개',
    submitCount: '30',
    average: 12,
    totalSum: 1840000,
  },
  {
    no: 13484,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mert_eunroae',
    season: '2025 / 1분기',
    contentsCount: '8개',
    submitCount: '30',
    average: 12,
    totalSum: 1840000,
  },
  {
    no: 13483,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'jimmy.stayagam',
    season: '2025 / 1분기',
    contentsCount: '8개',
    submitCount: '30',
    average: 12,
    totalSum: 1840000,
  },
  {
    no: 13482,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mikyong___k',
    season: '2025 / 1분기',
    contentsCount: '8개',
    submitCount: '30',
    average: 12,
    totalSum: 1840000,
  },
  {
    no: 13481,
    grade: '블럭',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'blossom520',
    season: '2025 / 1분기',
    contentsCount: '8개',
    submitCount: '30',
    average: 12,
    totalSum: 1840000,
  },
];

const DetailsSales: React.FC = () => {
  const navigate = useNavigate();

  // 검색어
  const [searchTerm, setSearchTerm] = useState('');

  // 탭 상태
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10;

  // 탭 변경
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭에 따른 데이터 필터링
  const dataByTab = dummyData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    return item.grade === selectedTab.path.replace('회원', '');
    // '일반회원' -> '일반', '블럭회원' -> '블럭'
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
      item.contentsCount.toLowerCase().includes(lowerTerm) ||
      item.submitCount.toLowerCase().includes(lowerTerm) ||
      String(item.average).includes(lowerTerm) ||
      String(item.totalSum).includes(lowerTerm)
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
      <HeaderTitle>판매내역</HeaderTitle>
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
        <DetailsSalesTable
          filteredData={currentPageData}
          handleEdit={handleEdit}
        />
      </TableContainer>
      <FooterRow>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default DetailsSales;

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
