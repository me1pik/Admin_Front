// src/pages/UserList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserTable, { User } from '../components/Table/UserTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';
import { getAllUsers, getBlockedUsers } from '../api/adminUser';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '일반회원', path: '일반' },
  { label: '블럭회원', path: '블럭' },
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [userData, setUserData] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchUsers = async () => {
    try {
      let res;
      // 탭에 따라 API 호출: 블럭회원이면 getBlockedUsers, 그 외는 getAllUsers 호출
      if (selectedTab.label === '블럭회원') {
        res = await getBlockedUsers(limit, page);
      } else {
        res = await getAllUsers(limit, page);
      }
      // API에서 받은 데이터를 테이블에 맞게 매핑 (필요에 따라 변환)
      const users: User[] = res.users.map((u: any) => ({
        no: u.id,
        // getBlockedUsers 호출 시는 '블럭', 아니면 '일반'으로 표시 (API에서 받은 status 값이 다를 경우 수정)
        status: selectedTab.label === '블럭회원' ? '블럭' : '일반',
        grade: u.membershipLevel,
        name: u.name,
        nickname: u.nickname,
        instagram: u.instagramId,
        followingFollower: `${u.followersCount} / ${u.followingCount}`,
        serviceArea: u.address,
        joinDate: new Date(u.signupDate).toLocaleDateString('ko-KR'),
      }));
      setUserData(users);
      setTotalCount(res.total);
    } catch (err) {
      console.error('사용자 목록을 불러오는데 실패했습니다:', err);
    }
  };

  // 페이지나 탭 변경 시 API 호출
  useEffect(() => {
    fetchUsers();
  }, [page, selectedTab]);

  // 탭 변경 시 페이지 초기화
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 클라이언트 사이드 검색 필터링 (API에서 검색 기능을 제공하지 않는 경우)
  const filteredData = userData.filter((item) => {
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

  // 인스타그램 계정을 클릭하면 해당 사용자의 상세 페이지로 이동
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
        <TotalCountText>Total: {filteredData.length}</TotalCountText>
      </InfoBar>
      <TableContainer>
        <UserTable filteredData={filteredData} handleEdit={handleEdit} />
      </TableContainer>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(totalCount / limit)}
      />
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
