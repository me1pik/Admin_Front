// src/pages/FAQList.tsx

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import FAQTable, { FAQItem } from '../../../components/Table/Setting/FAQTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';

/** FAQ 더미 데이터 */
const dummyFAQ: FAQItem[] = [
  {
    no: 13486,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    author: '홍길동 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13487,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    author: '홍길동 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13488,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    author: '홍길동 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13489,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    author: '김민수 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13490,
    type: '주문/결제',
    content: '주문 취소는 어떻게 하나요?',
    author: '김민수 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13491,
    type: '배송/반품',
    content: '반품 신청은 어디서 하나요?',
    author: '김민수 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13492,
    type: '이용권',
    content: '이용권 환불은 가능한가요?',
    author: '김민수 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13493,
    type: '이용권',
    content: '이용권 갱신은 어떻게 하나요?',
    author: '김민수 (등급)',
    createdAt: '2025.04.01',
  },
];

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '서비스', path: '서비스' },
  { label: '주문/결제', path: '주문/결제' },
  { label: '배송/반품', path: '배송/반품' },
  { label: '이용권', path: '이용권' },
];

// 상세페이지로 전달할 selectOptions
const faqSelectOptions: TabItem[] = [
  { label: '서비스', path: '서비스' },
  { label: '주문/결제', path: '주문/결제' },
  { label: '배송/반품', path: '배송/반품' },
  { label: '이용권', path: '이용권' },
];

const FAQList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  // URL 쿼리에서 현재 페이지 읽기
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [FAQData] = useState<FAQItem[]>(dummyFAQ);

  // 1차 탭 필터링
  const dataByTab = FAQData.filter((item) =>
    selectedTab.label === '전체보기' ? true : item.type === selectedTab.label
  );

  // 2차 검색어 필터링
  const filteredData = dataByTab.filter((item) =>
    [
      String(item.no),
      item.type,
      item.content,
      item.author,
      item.createdAt,
    ].some((field) => field.toLowerCase().includes(searchTerm))
  );

  // 페이지네이션 계산
  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 탭 변경 시 page=1으로 URL 리셋
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  const handleAuthorClick = (_: string, no: number) => {
    navigate(`/faqDetail/${no}`, {
      state: { selectOptions: faqSelectOptions },
    });
  };

  return (
    <Content>
      <HeaderTitle>자주 묻는 질문 (FAQ)</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <FAQTable
          filteredData={currentPageData}
          handleEdit={handleAuthorClick}
        />
      </TableContainer>

      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default FAQList;

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
