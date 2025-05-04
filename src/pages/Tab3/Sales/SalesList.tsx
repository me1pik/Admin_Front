// src/pages/DetailsSales.tsx

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import DetailsSalesTable, {
  User,
} from '../../../components/Table/DetailsSalesTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';

/** 탭 목록 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '일반회원', path: '일반' },
  { label: '블럭회원', path: '블럭' },
];

/** 더미 데이터 */
const dummyData: User[] = [
  {
    no: 13486,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mivin',
    season: '2025 / 1분기',
    contentsCount: '8개',
    submitCount: '30',
    average: 12,
    totalSum: 1840000,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  // URL 쿼리에서 현재 페이지 읽기
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [data] = useState<User[]>(dummyData);

  // 탭 변경: selectedTab 업데이트 + page=1으로 URL 리셋
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  // 탭별 1차 필터링
  const dataByTab = data.filter((item) =>
    selectedTab.label === '전체보기' ? true : item.grade === selectedTab.path
  );

  // URL 검색어로 2차 필터링
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

  const handleEdit = (no: number) => {
    navigate(`/salesdetail/${no}`);
  };

  return (
    <Content>
      <HeaderTitle>판매내역</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

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
        <Pagination totalPages={totalPages} />
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
