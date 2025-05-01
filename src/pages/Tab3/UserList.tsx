// src/pages/UserList.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import UserTable, { User } from '../../components/Table/UserTable';
import SubHeader, { TabItem } from '../../components/Header/SearchSubHeader';
import Pagination from '../../components/Pagination';
import { getAllUsers, getBlockedUsers } from '../../api/adminUser';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '일반회원', path: '일반' },
  { label: '블럭회원', path: '블럭' },
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search')?.toLowerCase() ?? '';

  // URL 쿼리에서 current page 읽기
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [userData, setUserData] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // 총 페이지 수
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  // 서버 호출 함수
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res =
        selectedTab.label === '블럭회원'
          ? await getBlockedUsers(limit, page)
          : await getAllUsers(limit, page);

      const users: User[] = res.users.map((u: any) => ({
        no: u.id,
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
    } finally {
      setLoading(false);
    }
  };

  // 페이지나 탭 변경 시 데이터 재요청
  useEffect(() => {
    fetchUsers();
  }, [page, selectedTab]);

  // 탭 변경 핸들러: selectedTab 업데이트 + page=1으로 URL 리셋
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  // 클라이언트 사이드 검색 필터
  const filteredData = userData.filter((item) =>
    [
      String(item.no),
      item.name,
      item.nickname,
      item.instagram,
      item.followingFollower,
      item.serviceArea,
      item.status,
      item.grade,
      item.joinDate,
    ].some((field) => field.toLowerCase().includes(searchTerm))
  );

  const handleEdit = (no: number) => {
    navigate(`/userdetail/${no}`);
  };

  return (
    <Content>
      <HeaderTitle>유저 목록</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {filteredData.length}</TotalCountText>
      </InfoBar>

      <TableContainer>
        {loading ? (
          <LoadingText>로딩중...</LoadingText>
        ) : (
          <UserTable filteredData={filteredData} handleEdit={handleEdit} />
        )}
      </TableContainer>

      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
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

const LoadingText = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-size: 14px;
  color: #555;
  text-align: center;
  padding: 20px;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;
