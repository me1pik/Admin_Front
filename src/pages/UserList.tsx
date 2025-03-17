// src/pages/UserList.tsx
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserTable, { User } from "../components/UserTable";
import SubHeader, { TabItem } from "../components/SubHeader";
import Pagination from "../components/Pagination";

/** 임시 데이터 (API 호출 대신 하드코딩) */
const dummyUsers: User[] = [
  {
    no: 13486,
    status: "일반",
    grade: "일반",
    name: "홍길동",
    nickname: "mivin",
    instagram: "style_hwan",
    followingFollower: "5,480 / 397",
    serviceArea: "서울-강남",
    joinDate: "2024-11-15",
  },
  {
    no: 13485,
    status: "일반",
    grade: "일반",
    name: "홍홍홍",
    nickname: "mivin2",
    instagram: "cobacarmi",
    followingFollower: "1,200 / 567",
    serviceArea: "서울-강동",
    joinDate: "2024-11-15",
  },
  {
    no: 13484,
    status: "일반",
    grade: "우수",
    name: "홍길순",
    nickname: "mivin3",
    instagram: "jmarr_sunwoo",
    followingFollower: "2,900 / 1,110",
    serviceArea: "경기-용인",
    joinDate: "2024-11-15",
  },
  {
    no: 13483,
    status: "일반",
    grade: "일반",
    name: "홍길자",
    nickname: "mivin4",
    instagram: "jimmyInstagram",
    followingFollower: "1,223 / 402",
    serviceArea: "서울-서초",
    joinDate: "2024-11-15",
  },
  {
    no: 13482,
    status: "일반",
    grade: "일반",
    name: "홍길현",
    nickname: "mivin5",
    instagram: "mkkyoons_k",
    followingFollower: "24,400 / 3,200",
    serviceArea: "경기-분당",
    joinDate: "2024-11-15",
  },
  {
    no: 13481,
    status: "블럭",
    grade: "일반",
    name: "홍길민",
    nickname: "mivin6",
    instagram: "biscossiny520",
    followingFollower: "5,480 / 397",
    serviceArea: "서울-강북",
    joinDate: "2024-11-15",
  },
];

/** 탭: 전체보기 / 일반회원 / 블럭회원 */
const tabs: TabItem[] = [
  { label: "전체보기", path: "" },
  { label: "일반회원", path: "일반" },
  { label: "블럭회원", path: "블럭" },
];

const UserList: React.FC = () => {
  // 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 기본 검색 분류는 "이름"으로
  const [searchType, setSearchType] = useState("name");

  // 현재 선택된 탭 상태 (기본값: "전체보기")
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 유저 목록 (임시 데이터)
  const [userData] = useState<User[]>(dummyUsers);

  // 탭 변경 시 호출되는 콜백
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1); // 탭 변경 시 페이지 초기화
  };

  // 탭에 따른 데이터 필터링
  // status가 "일반"인 것만 보여주거나, "블럭"인 것만 보여주거나, 전체보기
  const dataByTab = userData.filter((item) => {
    if (selectedTab.label === "전체보기") return true;
    return item.status === selectedTab.path; // "일반" / "블럭"
  });

  // 검색 로직 (탭 필터링 이후)
  // 드롭다운: name / nickname / instagram / serviceArea
  const filteredData = dataByTab.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();

    if (searchType === "name") {
      return item.name.toLowerCase().includes(lowerTerm);
    } else if (searchType === "nickname") {
      return item.nickname.toLowerCase().includes(lowerTerm);
    } else if (searchType === "instagram") {
      return item.instagram.toLowerCase().includes(lowerTerm);
    } else if (searchType === "serviceArea") {
      return item.serviceArea.toLowerCase().includes(lowerTerm);
    }
    return true;
  });

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10; // 한 페이지당 10개

  // 페이지네이션 계산
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 인스타 계정 클릭 시 수정/상세 페이지 이동 (예시)
  const handleEdit = (instagram: string) => {
    alert(`인스타 계정(${instagram}) 클릭됨`);
  };

  return (
    <Content>
      <HeaderTitle>유저 목록</HeaderTitle>
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
        <UserTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </Content>
  );
};

export default UserList;

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
  color: #000000;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
`;
