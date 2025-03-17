// src/pages/AdminList.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminTable, { Admin } from "../components/AdminTable";
import SubHeader, { TabItem } from "../components/SubHeader";
import Pagination from "../components/Pagination";

/** 임시 데이터 (API 호출 대신 하드코딩) */
const dummyAdmins: Admin[] = [
  {
    no: 15,
    status: "정상",
    id: "webmanager",
    team: "관리팀장 1",
    name: "홍길동",
    email: "manager@mkbk.com",
    lastLogin: "2023-03-14",
    registeredAt: "2024-11-15",
  },
  {
    no: 14,
    status: "블럭",
    id: "webmanager2",
    team: "관리팀장 2",
    name: "김철수",
    email: "manager2@mkbk.com",
    lastLogin: "",
    registeredAt: "2024-11-15",
  },
  {
    no: 13,
    status: "정상",
    id: "webmanager3",
    team: "관리팀장 3",
    name: "이영희",
    email: "manager3@mkbk.com",
    lastLogin: "2023-03-14",
    registeredAt: "2024-11-15",
  },
  {
    no: 12,
    status: "정상",
    id: "adminuser1",
    team: "관리팀장 1",
    name: "박민수",
    email: "admin1@mkbk.com",
    lastLogin: "2023-03-10",
    registeredAt: "2024-10-01",
  },
  {
    no: 11,
    status: "블럭",
    id: "adminuser2",
    team: "관리팀장 2",
    name: "최지현",
    email: "admin2@mkbk.com",
    lastLogin: "",
    registeredAt: "2024-09-20",
  },
  {
    no: 10,
    status: "정상",
    id: "adminuser3",
    team: "관리팀장 3",
    name: "한지민",
    email: "admin3@mkbk.com",
    lastLogin: "2023-03-08",
    registeredAt: "2024-08-15",
  },
  {
    no: 15,
    status: "정상",
    id: "webmanager",
    team: "관리팀장 1",
    name: "홍길동",
    email: "manager@mkbk.com",
    lastLogin: "2023-03-14",
    registeredAt: "2024-11-15",
  },
  {
    no: 14,
    status: "블럭",
    id: "webmanager2",
    team: "관리팀장 2",
    name: "김철수",
    email: "manager2@mkbk.com",
    lastLogin: "",
    registeredAt: "2024-11-15",
  },
  {
    no: 13,
    status: "정상",
    id: "webmanager3",
    team: "관리팀장 3",
    name: "이영희",
    email: "manager3@mkbk.com",
    lastLogin: "2023-03-14",
    registeredAt: "2024-11-15",
  },
  {
    no: 12,
    status: "정상",
    id: "adminuser1",
    team: "관리팀장 1",
    name: "박민수",
    email: "admin1@mkbk.com",
    lastLogin: "2023-03-10",
    registeredAt: "2024-10-01",
  },
  {
    no: 11,
    status: "블럭",
    id: "adminuser2",
    team: "관리팀장 2",
    name: "최지현",
    email: "admin2@mkbk.com",
    lastLogin: "",
    registeredAt: "2024-09-20",
  },
  {
    no: 10,
    status: "정상",
    id: "adminuser3",
    team: "관리팀장 3",
    name: "한지민",
    email: "admin3@mkbk.com",
    lastLogin: "2023-03-08",
    registeredAt: "2024-08-15",
  },
];

const tabs: TabItem[] = [
  { label: "전체보기", path: "" },
  { label: "관리자", path: "정상" },
  { label: "블럭", path: "블럭" },
];

const AdminList: React.FC = () => {
  const navigate = useNavigate();

  // 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("id");

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
    if (selectedTab.label === "전체보기") return true;
    return item.status === selectedTab.path;
  });

  // 검색 로직 (탭 필터링 이후)
  const filteredData = dataByTab.filter((item) => {
    if (searchType === "id") {
      return item.id.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === "name") {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === "email") {
      return item.email.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === "team") {
      return item.team.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10; // 한 페이지당 10개 고정

  // 페이지네이션 계산
  const totalCount = filteredData.length; // 현재 표의 총 건수
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
        searchType={searchType}
        setSearchType={setSearchType}
        tabs={tabs}
        onTabChange={handleTabChange}
      />
      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
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
  font-family: "NanumSquare Neo OTF", sans-serif;
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

const TotalCount = styled.div`
  font-family: "NanumSquare Neo OTF", sans-serif;
  font-weight: 900;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
`;
