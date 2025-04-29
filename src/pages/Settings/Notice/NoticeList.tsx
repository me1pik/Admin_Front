// src/pages/Settings/Notice/NoticeList.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import NoticeTable, {
  NoticeItem,
} from '../../../components/Table/Setting/NoticeTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import RegisterButton from '../../../components/RegisterButton';

// 더미 데이터
const dummyNotice: NoticeItem[] = [
  {
    no: 13485,
    type: '공지',
    content: '[공지] 새로운 시즌 신상품 할인안내 (2025 봄)',
    author: '홍길동 매니저',
    createdAt: '2025.04.01',
  },
  {
    no: 13485,
    type: '공지',
    content: '[공지] 새로운 시즌 신상품 할인안내 (2025 봄)',
    author: '홍길동 매니저',
    createdAt: '2025.04.01',
  },
  {
    no: 13485,
    type: '공지',
    content: '[공지] 새로운 시즌 신상품 할인안내 (2025 봄)',
    author: '홍길동 매니저',
    createdAt: '2025.04.01',
  },
  {
    no: 13485,
    type: '공지',
    content: '[공지] 새로운 시즌 신상품 할인안내 (2025 봄)',
    author: '홍길동 매니저',
    createdAt: '2025.04.01',
  },
];

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '공지', path: '공지' },
  { label: '안내', path: '안내' },
];

const noticeSelectOptions: TabItem[] = [
  { label: '공지', path: '' },
  { label: '안내', path: '' },
];

const NoticeList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [noticeData] = useState<NoticeItem[]>(dummyNotice);

  // 1) 탭·검색어 필터링, 2) 페이징: useMemo 로 캐싱
  const filteredData = useMemo(() => {
    return noticeData
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
        ].some((field) => field.toLowerCase().includes(searchTerm))
      );
  }, [noticeData, selectedTab, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / limit));
  const currentPageData = useMemo(
    () => filteredData.slice((page - 1) * limit, (page - 1) * limit + limit),
    [filteredData, page]
  );

  // 핸들러에 useCallback 적용
  const handleTabChange = useCallback(
    (tab: TabItem) => {
      setSelectedTab(tab);
      setSearchParams((prev) => {
        const params = Object.fromEntries(prev.entries());
        params.page = '1';
        return params;
      });
    },
    [setSearchParams]
  );

  const handleRowClick = useCallback(
    (_author: string, no: number) => {
      navigate(`/noticeDetail/${no}`, {
        state: { selectOptions: noticeSelectOptions },
      });
    },
    [navigate]
  );

  return (
    <Content>
      <HeaderTitle>공지사항</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {filteredData.length}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <NoticeTable
          filteredData={currentPageData}
          handleEdit={handleRowClick}
        />
      </TableContainer>

      <FooterRow>
        <Pagination
          totalPages={totalPages}
          leftComponent={
            <RegisterButton
              text='등록하기'
              onClick={() => navigate('/createNotice')}
            />
          }
        />
      </FooterRow>
    </Content>
  );
};

export default NoticeList;

/* ================= Styled Components ================= */
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
