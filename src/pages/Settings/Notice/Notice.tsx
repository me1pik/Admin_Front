// src/pages/NoticeList.tsx

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import NoticeTable, {
  NoticeItem,
} from '../../../components/Table/Setting/NoticeTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';

/** 공지사항 더미 데이터 */
const dummyNotice: NoticeItem[] = [
  {
    no: 13485,
    type: '공지',
    content: '[공지] 새로운 시즌 신상품 할인안내 (2025 봄)',
    author: '홍길동 매니저',
    createdAt: '2025.04.01',
  },
  {
    no: 13486,
    type: '공지',
    content: '[공지] 시스템 정기 점검 안내 (4/15 ~ 4/16)',
    author: '이영희 담당',
    createdAt: '2025.04.02',
  },
  {
    no: 13487,
    type: '안내',
    content: '[안내] 회원가입 이벤트 당첨자 발표',
    author: '김민수 운영',
    createdAt: '2025.04.03',
  },
  {
    no: 13488,
    type: '공지',
    content: '[공지] 휴무일 배송 지연 공지',
    author: '박민정 팀장',
    createdAt: '2025.04.04',
  },
  {
    no: 13489,
    type: '안내',
    content: '[안내] 적립금 사용정책 변경 안내',
    author: '허준 대리',
    createdAt: '2025.04.05',
  },
  {
    no: 13490,
    type: '공지',
    content: '[공지] 신규 브랜드 입점 예정 안내 (4월말)',
    author: '최수영 매니저',
    createdAt: '2025.04.06',
  },
  {
    no: 13491,
    type: '안내',
    content: '[안내] 리뷰 프로모션 (포토리뷰 작성 시 포인트 지급)',
    author: '정아름 운영',
    createdAt: '2025.04.07',
  },
  {
    no: 13492,
    type: '안내',
    content: '[안내] 배송비 인상 안내 (물류비 상승)',
    author: '김진호 담당',
    createdAt: '2025.04.08',
  },
];

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '공지', path: '공지' },
  { label: '안내', path: '안내' },
];

// 상세페이지로 전달할 selectOptions
const noticeSelectOptions: TabItem[] = [
  { label: '공지', path: '' },
  { label: '안내', path: '' },
];

const NoticeList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  // URL 쿼리에서 현재 페이지 읽기
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [noticeData] = useState<NoticeItem[]>(dummyNotice);

  // 탭별 1차 필터링
  const dataByTab = noticeData.filter((item) =>
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
    navigate(`/noticeDetail/${no}`, {
      state: { selectOptions: noticeSelectOptions },
    });
  };

  return (
    <Content>
      <HeaderTitle>공지사항</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <NoticeTable
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

export default NoticeList;

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
