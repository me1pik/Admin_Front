// src/pages/UserList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserTable, { User } from '../components/Table/UserTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

/** 임시 데이터 (API 호출 대신 하드코딩) */
const dummyUsers: User[] = [
  {
    no: 13486,
    status: '일반',
    grade: '일반',
    name: '홍길동',
    nickname: 'mivin',
    instagram: 'style_hwan',
    followingFollower: '5,480 / 397',
    serviceArea: '서울-강남',
    joinDate: '2024-11-15',
  },
  {
    no: 13485,
    status: '일반',
    grade: '일반',
    name: '홍홍홍',
    nickname: 'mivin2',
    instagram: 'cobacarmi',
    followingFollower: '1,200 / 567',
    serviceArea: '서울-강동',
    joinDate: '2024-11-15',
  },
  {
    no: 13484,
    status: '일반',
    grade: '우수',
    name: '홍길순',
    nickname: 'mivin3',
    instagram: 'jmarr_sunwoo',
    followingFollower: '2,900 / 1,110',
    serviceArea: '경기-용인',
    joinDate: '2024-11-15',
  },
  {
    no: 13483,
    status: '일반',
    grade: '일반',
    name: '홍길자',
    nickname: 'mivin4',
    instagram: 'jimmyInstagram',
    followingFollower: '1,223 / 402',
    serviceArea: '서울-서초',
    joinDate: '2024-11-15',
  },
  {
    no: 13482,
    status: '일반',
    grade: '일반',
    name: '홍길현',
    nickname: 'mivin5',
    instagram: 'mkkyoons_k',
    followingFollower: '24,400 / 3,200',
    serviceArea: '경기-분당',
    joinDate: '2024-11-15',
  },
  {
    no: 13481,
    status: '블럭',
    grade: '일반',
    name: '홍길민',
    nickname: 'mivin6',
    instagram: 'biscossiny520',
    followingFollower: '5,480 / 397',
    serviceArea: '서울-강북',
    joinDate: '2024-11-15',
  },
];

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '일반회원', path: '일반' },
  { label: '블럭회원', path: '블럭' },
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [userData] = useState<User[]>(dummyUsers);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  const dataByTab = userData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    return item.status === selectedTab.path;
  });

  const filteredData = dataByTab.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      String(item.no).toLowerCase().includes(lowerTerm) ||
      item.name.toLowerCase().includes(lowerTerm) ||
      item.nickname.toLowerCase().includes(lowerTerm) ||
      item.instagram.toLowerCase().includes(lowerTerm) ||
      item.followingFollower.toLowerCase().includes(lowerTerm) ||
      item.serviceArea.toLowerCase().includes(lowerTerm) ||
      item.status.toLowerCase().includes(lowerTerm) ||
      item.grade.toLowerCase().includes(lowerTerm) ||
      item.joinDate.toLowerCase().includes(lowerTerm)
    );
  });

  const [page, setPage] = useState(1);
  const limit = 10;
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 인스타 계정 클릭 시 유저 번호(no)를 이용해 상세 페이지로 이동
  const handleEdit = (no: number) => {
    navigate(`/userdetail/${no}`);
  };

  return (
    <Content>
      <HeaderTitle>유저 목록</HeaderTitle>
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
