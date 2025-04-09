// src/pages/PrivacyList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PrivacyTable, {
  PrivacyItem,
} from '../components/Table/Setting/PrivacyTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [PrivacyData] = useState<PrivacyItem[]>(dummyPrivacy);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  const dataByTab = PrivacyData.filter((item) => {
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

  const [page, setPage] = useState(1);
  const limit = 10;
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  const handleAuthorClick = (author: string, no: number) => {
    navigate(`/settingsDetail/${no}`, {
      state: { selectOptions: privacySelectOptions },
    });
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
