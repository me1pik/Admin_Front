// src/pages/AdminList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminTable, { Admin } from '../components/AdminTable';
import SubHeader, { TabItem } from '../components/SubHeader';
import Pagination from '../components/Pagination';

/** 임시 데이터 (API 호출 대신 하드코딩) */
const dummyAdmins: Admin[] = [
  {
    no: 15,
    status: '정상',
    id: 'webmanager',
    team: '관리팀장 1',
    name: '홍길동',
    email: 'manager@mkbk.com',
    lastLogin: '2023-03-14',
    registeredAt: '2024-11-15',
  },
  {
    no: 14,
    status: '블럭',
    id: 'webmanager2',
    team: '관리팀장 2',
    name: '김철수',
    email: 'manager2@mkbk.com',
    lastLogin: '',
    registeredAt: '2024-11-15',
  },
  {
    no: 13,
    status: '정상',
    id: 'webmanager3',
    team: '관리팀장 3',
    name: '이영희',
    email: 'manager3@mkbk.com',
    lastLogin: '2023-03-14',
    registeredAt: '2024-11-15',
  },
  {
    no: 12,
    status: '정상',
    id: 'adminuser1',
    team: '관리팀장 1',
    name: '박민수',
    email: 'admin1@mkbk.com',
    lastLogin: '2023-03-10',
    registeredAt: '2024-10-01',
  },
  {
    no: 11,
    status: '블럭',
    id: 'adminuser2',
    team: '관리팀장 2',
    name: '최지현',
    email: 'admin2@mkbk.com',
    lastLogin: '',
    registeredAt: '2024-09-20',
  },
  {
    no: 10,
    status: '정상',
    id: 'adminuser3',
    team: '관리팀장 3',
    name: '한지민',
    email: 'admin3@mkbk.com',
    lastLogin: '2023-03-08',
    registeredAt: '2024-08-15',
  },
  {
    no: 15,
    status: '정상',
    id: 'webmanager',
    team: '관리팀장 1',
    name: '홍길동',
    email: 'manager@mkbk.com',
    lastLogin: '2023-03-14',
    registeredAt: '2024-11-15',
  },
  {
    no: 14,
    status: '블럭',
    id: 'webmanager2',
    team: '관리팀장 2',
    name: '김철수',
    email: 'manager2@mkbk.com',
    lastLogin: '',
    registeredAt: '2024-11-15',
  },
  {
    no: 13,
    status: '정상',
    id: 'webmanager3',
    team: '관리팀장 3',
    name: '이영희',
    email: 'manager3@mkbk.com',
    lastLogin: '2023-03-14',
    registeredAt: '2024-11-15',
  },
  {
    no: 12,
    status: '정상',
    id: 'adminuser1',
    team: '관리팀장 1',
    name: '박민수',
    email: 'admin1@mkbk.com',
    lastLogin: '2023-03-10',
    registeredAt: '2024-10-01',
  },
  {
    no: 11,
    status: '블럭',
    id: 'adminuser2',
    team: '관리팀장 2',
    name: '최지현',
    email: 'admin2@mkbk.com',
    lastLogin: '',
    registeredAt: '2024-09-20',
  },
  {
    no: 10,
    status: '정상',
    id: 'adminuser3',
    team: '관리팀장 3',
    name: '한지민',
    email: 'admin3@mkbk.com',
    lastLogin: '2023-03-08',
    registeredAt: '2024-08-15',
  },
];

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '관리자', path: '정상' },
  { label: '블럭', path: '블럭' },
];

const AdminList: React.FC = () => {
  const navigate = useNavigate();

  // 검색 상태 (검색 분류 제거)
  const [searchTerm, setSearchTerm] = useState('');

  // 현재 선택된 탭 상태 (기본값: "전체보기")
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 관리자 목록 (임시 데이터)
  const [adminData] = useState<Admin[]>(dummyAdmins);

  // 탭 변경 시 호출되는 콜백
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1); // 탭 변경 시 페이지 초기화
  };

  // 탭에 따른 데이터 필터링 (전체보기: 모든 데이터, 관리자: status가 "정상", 블럭: status가 "블럭")
  const dataByTab = adminData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    return item.status === selectedTab.path;
  });

  // 검색 로직: id, name, email, team, status, registeredAt, lastLogin, 그리고 숫자인 no도 문자열로 변환 후 포함 여부 확인
  const filteredData = dataByTab.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      String(item.no).toLowerCase().includes(lowerTerm) ||
      item.id.toLowerCase().includes(lowerTerm) ||
      item.name.toLowerCase().includes(lowerTerm) ||
      item.email.toLowerCase().includes(lowerTerm) ||
      item.team.toLowerCase().includes(lowerTerm) ||
      item.status.toLowerCase().includes(lowerTerm) ||
      item.registeredAt.toLowerCase().includes(lowerTerm) ||
      (item.lastLogin && item.lastLogin.toLowerCase().includes(lowerTerm))
    );
  });

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10; // 한 페이지당 10개 고정

  // 페이지네이션 계산
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 이메일 클릭 시 수정/상세 페이지 이동
  const handleEdit = (id: string) => {
    navigate(`/admin/${id}`);
  };

  return (
    <Content>
      <HeaderTitle>관리자 목록</HeaderTitle>
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
        <AdminTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </Content>
  );
};

export default AdminList;

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
