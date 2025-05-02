// src/pages/ProductEvaluation.tsx

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductEvaluationTable, {
  User,
} from '../../../components/Table/ProductEvaluationTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';

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
    productReview: '가성비 최고였어요!',
    registeredAt: '2024-11-10',
  },
  {
    no: 13484,
    grade: '블럭',
    name: '홍길동',
    nickname: '홍길동',
    instagram: 'mert_eunse',
    productStatus: '4',
    serviceQuality: '4',
    productReview: '배송이 조금 늦었네요.',
    registeredAt: '2024-11-12',
  },
  // ... 그 외 데이터 생략
];

const ProductEvaluation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  // URL 쿼리에서 현재 페이지 읽기
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const limit = 10;

  // 탭별 1차 필터링
  const dataByTab = dummyData.filter((item) =>
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
      item.productStatus.toLowerCase().includes(t) ||
      item.serviceQuality.toLowerCase().includes(t) ||
      item.productReview.toLowerCase().includes(t) ||
      item.registeredAt.toLowerCase().includes(t)
    );
  });

  // 페이지네이션 계산
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

  const handleEdit = (no: number) => {
    navigate(`/evaluationdetail/${no}`);
  };

  return (
    <Content>
      <HeaderTitle>제품평가</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

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
        <Pagination totalPages={totalPages} />
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
