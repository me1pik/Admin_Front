import React, { useState } from 'react';
import styled from 'styled-components';
import NoticeTable, { NoticeItem } from '../components/Table/NoticeTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

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

/** 서브헤더 탭: 전체보기 / 공지 / 안내 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '공지', path: '공지' },
  { label: '안내', path: '안내' },
];

const NoticeList: React.FC = () => {
  // 검색 상태
  const [searchTerm, setSearchTerm] = useState('');

  // 현재 선택된 탭 상태
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 공지사항 목록
  const [noticeData] = useState<NoticeItem[]>(dummyNotice);

  // 탭 변경 시
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭 필터링 로직
  const dataByTab = noticeData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    return item.type === selectedTab.label; // 공지 or 안내
  });

  // 검색 로직 (No, 구분, 내용, 작성자, 등록일을 포함)
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

  // 작성자 클릭 시 이벤트 (예시)
  const handleEdit = (author: string) => {
    alert(`작성자(${author}) 클릭됨`);
  };

  return (
    <Content>
      <HeaderTitle>공지사항</HeaderTitle>
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
        <NoticeTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>
      <FooterRow>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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
