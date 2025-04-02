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
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // ✅ totalPages 계산 추가
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  // 유저 데이터 요청
  const fetchUsers = async () => {
    setLoading(true);
    try {
      let res;
      if (selectedTab.label === '블럭회원') {
        res = await getBlockedUsers(limit, page);
      } else {
        res = await getAllUsers(limit, page);
      }

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

  useEffect(() => {
    fetchUsers();
  }, [page, selectedTab]);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

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
        {loading ? (
          <LoadingText>로딩중...</LoadingText>
        ) : (
          <UserTable filteredData={filteredData} handleEdit={handleEdit} />
        )}
      </TableContainer>
      <FooterRow>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default UserList;

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
