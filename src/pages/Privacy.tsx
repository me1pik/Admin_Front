// src/pages/PrivacyList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PrivacyTable, {
  PrivacyItem,
} from '../components/Table/Setting/PrivacyTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

/** 개인정보 더미 데이터 (이미지처럼 동일 정보 반복) */
const dummyPrivacy: PrivacyItem[] = [
  {
    no: 13486,
    type: '개인정보방침',
    content: '개인정보의 획득 및 수집방법',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '개인정보방침',
    content: '개인정보의 획득 및 수집방법',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '개인정보방침',
    content: '개인정보의 획득 및 수집방법',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '개인정보방침',
    content: '개인정보의 획득 및 수집방법',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '개인정보방침',
    content: '개인정보의 획득 및 수집방법',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '개인정보방침',
    content: '개인정보의 획득 및 수집방법',
    author: '김민수 (등급2)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '개인정보방침',
    content: '개인정보의 획득 및 수집방법',
    author: '김민수 (등급2)',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '개인정보방침',
    content: '개인정보의 획득 및 수집방법',
    author: '김민수 (등급2)',
    createdAt: '2025.04.01',
  },
];

/** 서브헤더 탭: 전체보기 / 개인정보방침 / 파기절차 / 기타 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '개인정보방침', path: '개인정보방침' },
  { label: '파기절차', path: '파기절차' },
  { label: '기타', path: '기타' },
];

const PrivacyList: React.FC = () => {
  const navigate = useNavigate(); // 작성자 클릭 시 라우팅

  // 검색 상태
  const [searchTerm, setSearchTerm] = useState('');

  // 현재 선택된 탭 상태
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 개인정보 목록 (더미 데이터)
  const [PrivacyData] = useState<PrivacyItem[]>(dummyPrivacy);

  // 탭 변경 시
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭 필터링 로직
  const dataByTab = PrivacyData.filter((item) => {
    // '전체보기' 탭이면 모든 데이터를 반환
    if (selectedTab.label === '전체보기') return true;
    // 선택된 탭의 label과 item.type이 일치하는 데이터만
    return item.type === selectedTab.label;
  });

  // 검색 로직 (No, 유형, 내용, 작성자, 등록일 포함)
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
    navigate(`/PrivacyDetail/${no}`);
  };

  return (
    <Content>
      <HeaderTitle>개인정보보호</HeaderTitle>
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
        {/* PrivacyTable에서 작성자 클릭 시 handleAuthorClick 실행 */}
        <PrivacyTable
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

export default PrivacyList;

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
