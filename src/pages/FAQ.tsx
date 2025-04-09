// src/pages/FAQList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FAQTable, { FAQItem } from '../components/Table/Setting/FAQTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

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
    no: 13486,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    author: '홍길동 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    author: '홍길동 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    author: '김민수 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    author: '김민수 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    author: '김민수 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    author: '김민수 (등급)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '서비스',
    content: '멜픽서비스의 포인트는 어떻게 사용하나요?',
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

// FAQ용 selectOptions (TabItem 배열) – 각 목록 페이지마다 달라질 수 있음.
const faqSelectOptions: TabItem[] = [
  { label: '서비스', path: '서비스' },
  { label: '주문/결제', path: '주문/결제' },
  { label: '배송/반품', path: '배송/반품' },
  { label: '이용권', path: '이용권' },
];

const FAQList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [FAQData] = useState<FAQItem[]>(dummyFAQ);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  const dataByTab = FAQData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    return item.type === selectedTab.label;
  });

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

  const handleAuthorClick = (_author: string, no: number) => {
    // _author는 의도적으로 사용하지 않음
    navigate(`/settingsDetail/${no}`, {
      state: { selectOptions: faqSelectOptions },
    });
  };

  return (
    <Content>
      <HeaderTitle>자주묻는 질문 (FAQ)</HeaderTitle>
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
        <FAQTable
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
