// src/pages/CalculateList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CalculateListTable, {
  User,
} from '../components/Table/CalculateListTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

/** 탭 목록 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '일반회원', path: '일반' },
  { label: '블럭회원', path: '블럭' },
];

/** 더미 데이터 (구매 횟수 제거) */
const dummyData: User[] = [
  {
    no: 13486,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'styleweex',
    season: '2025 / 1분기',
    sellCount: '8개', // 판매 제출수
    totalSum: 1840000, // 총 판매금액
    profit: 184000, // 정산 수익
    expectedProfit: 92000, // 정산 예정금액
  },
  {
    no: 13485,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'Cobrasin',
    season: '2025 / 1분기',
    sellCount: '8개',
    totalSum: 1840000,
    profit: 184000,
    expectedProfit: 92000,
  },
  {
    no: 13484,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mert__eunroae',
    season: '2025 / 1분기',
    sellCount: '8개',
    totalSum: 1840000,
    profit: 184000,
    expectedProfit: 92000,
  },
  {
    no: 13483,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'jimmy.stayagram',
    season: '2025 / 1분기',
    sellCount: '8개',
    totalSum: 1840000,
    profit: 184000,
    expectedProfit: 92000,
  },
  {
    no: 13482,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mikyong___k',
    season: '2025 / 1분기',
    sellCount: '8개',
    totalSum: 1840000,
    profit: 184000,
    expectedProfit: 92000,
  },
  {
    no: 13481,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'diva0629',
    season: '2025 / 1분기',
    sellCount: '8개',
    totalSum: 1840000,
    profit: 184000,
    expectedProfit: 92000,
  },
  {
    no: 13480,
    grade: '블럭',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'blossom520',
    season: '2025 / 1분기',
    sellCount: '8개',
    totalSum: 1840000,
    profit: 184000,
    expectedProfit: 92000,
  },
  {
    no: 13479,
    grade: '블럭',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'blossom520',
    season: '2025 / 1분기',
    sellCount: '8개',
    totalSum: 1840000,
    profit: 184000,
    expectedProfit: 92000,
  },
];

/** CalculateList 페이지 */
const CalculateList: React.FC = () => {
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
    // '일반회원' -> '일반', '블럭회원' -> '블럭'
    return item.grade === selectedTab.path.replace('회원', '');
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
      item.sellCount.toLowerCase().includes(lowerTerm) ||
      String(item.totalSum).includes(lowerTerm) ||
      String(item.profit).includes(lowerTerm) ||
      String(item.expectedProfit).includes(lowerTerm)
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
      <HeaderTitle>정산내역</HeaderTitle>
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
        <CalculateListTable
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

export default CalculateList;

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
