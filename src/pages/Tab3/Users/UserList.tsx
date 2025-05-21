// src/pages/Tab3/Users/UserList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import UserTable, { User } from '../../../components/Table/UserTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import { getAllUsers, getBlockedUsers } from '../../../api/adminUser';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '일반회원', path: '일반' },
  { label: '블럭회원', path: '블럭' },
];

// 일괄 변경용 상태 옵션
const statuses = [
  { label: '일반회원으로 변경', value: 'unblock' },
  { label: '블럭회원으로 변경', value: 'block' },
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search')?.toLowerCase() ?? '';

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [userData, setUserData] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // totalCount 선언 이후에 totalPages 계산
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  // 일괄변경 UI 상태
  const [newStatus, setNewStatus] = useState<string>('');
  const [selectedRows] = useState<Set<number>>(new Set());

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res =
        selectedTab.label === '블럭회원'
          ? await getBlockedUsers(limit, page)
          : await getAllUsers(limit, page);

      const users: User[] = res.users.map((u: any) => ({
        no: u.id,
        email: u.email,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedTab]);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  const filteredData = userData.filter((item) =>
    [
      String(item.no),
      item.email,
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

  const handleBulkChange = () => {
    if (!newStatus) {
      alert('변경할 상태를 선택해주세요.');
      return;
    }
    if (selectedRows.size === 0) {
      alert('변경할 사용자를 선택해주세요.');
      return;
    }
    alert(
      `선택된 ${selectedRows.size}명 상태를 "${statuses.find((s) => s.value === newStatus)?.label}"로 변경합니다.`
    );
    // TODO: API 호출 후 fetchUsers()
  };

  const handleEdit = (no: number) => {
    const user = userData.find((u) => u.no === no);
    if (user) {
      navigate(`/userdetail/${encodeURIComponent(user.email)}`);
    }
  };

  return (
    <Content>
      <HeaderTitle>유저 목록</HeaderTitle>
      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {filteredData.length}</TotalCountText>
        <FilterGroup>
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value=''>변경할 상태 선택</option>
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
          <BulkButton onClick={handleBulkChange}>일괄변경</BulkButton>
        </FilterGroup>
      </InfoBar>

      <TableContainer>
        {loading ? (
          <LoadingText>로딩중...</LoadingText>
        ) : (
          <UserTable
            filteredData={filteredData}
            handleEdit={handleEdit}
            /* 체크박스 지원 시 아래 3개 prop을 활성화하세요 */
            // selectedRows={selectedRows}
            // toggleRow={toggleRow}
            // toggleAll={toggleAll}
          />
        )}
      </TableContainer>

      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default UserList;

/* Styled Components 생략 */

/* Styled Components */
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
  font-weight: 900;
  font-size: 12px;
  color: #000000;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Select = styled.select`
  height: 32px;
  padding: 0 8px;
  font-size: 12px;
  border: 1px solid #ccc;
`;

const BulkButton = styled.button`
  height: 32px;
  padding: 0 12px;
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
`;

const LoadingText = styled.div`
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
