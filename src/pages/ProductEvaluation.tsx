// src/pages/ProductEvaluation.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductEvaluationTable, {
  User,
} from '../components/Table/ProductEvaluationTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

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
    productStatus: '5',
    serviceQuality: '5',
    productReview: '이번에 이용한 제품은 정말 맘에 들었어...',
    registeredAt: '2024-11-15',
  },
  {
    no: 13485,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'Cobrasin',
    productStatus: '5',
    serviceQuality: '5',
    productReview: '이번에 이용한 제품은 정말 맘에 들었어...',
    registeredAt: '2024-11-15',
  },
  {
    no: 13484,
    grade: '블럭',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mert_eunse',
    productStatus: '5',
    serviceQuality: '5',
    productReview: '이번에 이용한 제품은 정말 맘에 들었어...',
    registeredAt: '2024-11-15',
  },
  {
    no: 13483,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'jimmy.stayann',
    productStatus: '5',
    serviceQuality: '5',
    productReview: '이번에 이용한 제품은 정말 맘에 들었어...',
    registeredAt: '2024-11-15',
  },
  {
    no: 13482,
    grade: '일반',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mikyong___x',
    productStatus: '5',
    serviceQuality: '5',
    productReview: '이번에 이용한 제품은 정말 맘에 들었어...',
    registeredAt: '2024-11-15',
  },
  {
    no: 13481,
    grade: '블럭',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'blossom520',
    productStatus: '5',
    serviceQuality: '5',
    productReview: '이번에 이용한 제품은 정말 맘에 들었어...',
    registeredAt: '2024-11-15',
  },
];

const ProductEvaluation: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭에 따른 데이터 필터링
  const dataByTab = dummyData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    return item.grade === selectedTab.path;
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
      item.productStatus.toLowerCase().includes(lowerTerm) ||
      item.serviceQuality.toLowerCase().includes(lowerTerm) ||
      item.productReview.toLowerCase().includes(lowerTerm) ||
      item.registeredAt.toLowerCase().includes(lowerTerm)
    );
  });

  // 페이지네이션 계산
  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 인스타 계정 클릭 시
  const handleEdit = (no: number) => {
    navigate(`/userdetail/${no}`);
  };

  return (
    <Content>
      <HeaderTitle>제품평가</HeaderTitle>
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
        <ProductEvaluationTable
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

export default ProductEvaluation;

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
