// src/pages/Settings/Notice/Notice.tsx
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import NoticeTable, {
  NoticeItem,
} from '../../../components/Table/Setting/NoticeTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';

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

const noticeSelectOptions: TabItem[] = [
  { label: '공지', path: '' },
  { label: '안내', path: '' },
];

const Notice: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [noticeData] = useState<NoticeItem[]>(dummyNotice);

  // 탭 필터링
  const dataByTab = noticeData.filter((item) =>
    selectedTab.label === '전체보기' ? true : item.type === selectedTab.label
  );

  // 검색어 필터링
  const filteredData = dataByTab.filter((item) =>
    [
      String(item.no),
      item.type,
      item.content,
      item.author,
      item.createdAt,
    ].some((field) => field.toLowerCase().includes(searchTerm))
  );

  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  const handleRowClick = (_: string, no: number) => {
    navigate(`/noticeDetail/${no}`, {
      state: { selectOptions: noticeSelectOptions },
    });
  };
  const hoverAnim = keyframes`
  0% { transform: translateY(0); box-shadow: none; }
  100% { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
`;
  const AddButton = styled.button`
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #222;
      animation: ${hoverAnim} 0.2s forwards;
    }
    &:active {
      transform: translateY(0);
      box-shadow: none;
    }
  `;

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
          handleEdit={handleRowClick}
        />
      </TableContainer>

      <FooterRow>
        <Pagination
          totalPages={totalPages}
          leftComponent={
            <AddButton onClick={() => navigate('/createNotice')}>
              등록하기
            </AddButton>
          }
        />
      </FooterRow>
    </Content>
  );
};

export default Notice;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  flex-grow: 1;
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
  width: 100%;
  margin-top: 40px;
`;
