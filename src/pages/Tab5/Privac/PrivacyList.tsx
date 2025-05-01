// src/pages/Settings/Privac/PrivacyList.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import PrivacyTable, {
  PrivacyItem,
} from '../../../components/Table/Setting/PrivacyTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import RegisterButton from '../../../components/RegisterButton';

/** 개인정보 더미 */
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

const privacySelectOptions: TabItem[] = [
  { label: '개인정보방침', path: '개인정보방침' },
  { label: '파기절차', path: '파기절차' },
  { label: '기타', path: '기타' },
];

const PrivacyList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [data] = useState<PrivacyItem[]>(dummyPrivacy);

  const filtered = useMemo(() => {
    return data
      .filter(
        (item) =>
          selectedTab.label === '전체보기' || item.type === selectedTab.label
      )
      .filter((item) =>
        [
          String(item.no),
          item.type,
          item.content,
          item.author,
          item.createdAt,
        ].some((f) => f.toLowerCase().includes(searchTerm))
      );
  }, [data, selectedTab, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const pageData = useMemo(
    () => filtered.slice((page - 1) * limit, (page - 1) * limit + limit),
    [filtered, page]
  );

  const onTabChange = useCallback(
    (tab: TabItem) => {
      setSelectedTab(tab);
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev.entries()),
        page: '1',
      }));
    },
    [setSearchParams]
  );

  const onRowClick = useCallback(
    (_a: string, no: number) => {
      navigate(`/privacyDetail/${no}`, {
        state: { selectOptions: privacySelectOptions },
      });
    },
    [navigate]
  );

  return (
    <Content>
      <HeaderTitle>개인정보보호</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={onTabChange} />

      <InfoBar>
        <TotalCountText>Total: {filtered.length}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <PrivacyTable filteredData={pageData} handleEdit={onRowClick} />
      </TableContainer>

      <FooterRow>
        <Pagination
          totalPages={totalPages}
          leftComponent={
            <RegisterButton
              text='등록하기'
              onClick={() => navigate('/createPrivacy')}
            />
          }
        />
      </FooterRow>
    </Content>
  );
};

export default PrivacyList;

/* Styled Components */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  flex-grow: 1;
  padding: 10px;
`;
const HeaderTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF';
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
  font-family: 'NanumSquare Neo OTF';
  font-weight: 900;
  font-size: 12px;
`;
const TableContainer = styled.div`
  box-sizing: border-box;
`;
const FooterRow = styled.div`
  width: 100%;
  margin-top: 40px;
`;
