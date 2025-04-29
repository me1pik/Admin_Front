// src/pages/PrivacyList.tsx

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PrivacyTable, {
  PrivacyItem,
} from '../../../components/Table/Setting/PrivacyTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';

/** 개인정보 더미 데이터 */
const dummyPrivacy: PrivacyItem[] = [
  {
    no: 13486,
    type: '개인정보방침',
    content: '개인정보의 획득 및 수집방법',
    author: '홍길동 (등급1)',
    createdAt: '2025.04.01',
  },
];

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '개인정보방침', path: '개인정보방침' },
  { label: '파기절차', path: '파기절차' },
  { label: '기타', path: '기타' },
];

// Privacy용 selectOptions
const privacySelectOptions: TabItem[] = [
  { label: '개인정보방침', path: '' },
  { label: '파기절차', path: '' },
  { label: '기타', path: '' },
];

const PrivacyList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  // URL 쿼리에서 현재 페이지 읽기
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [privacyData] = useState<PrivacyItem[]>(dummyPrivacy);

  // 탭별 1차 필터링
  const dataByTab = privacyData.filter((item) =>
    selectedTab.label === '전체보기' ? true : item.type === selectedTab.label
  );

  // URL 검색어로 2차 필터링
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
    navigate(`/privacyDetail/${no}`, {
      state: { selectOptions: privacySelectOptions },
    });
  };

  return (
    <Content>
      <HeaderTitle>개인정보보호</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <PrivacyTable
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
