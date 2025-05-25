import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import UserTable, { User } from '../../../components/Table/UserTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import {
  getAllUsers,
  getBlockedUsers,
  changeUserMembership,
  getAllMemberships,
  GetAllMembershipsResponse,
} from '../../../api/adminUser';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '일반회원', path: '일반' },
  { label: '블럭회원', path: '블럭' },
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

  // --- 멤버십 목록을 API에서 가져와서 상태에 저장 ---
  const [memberships, setMemberships] = useState<GetAllMembershipsResponse>([]);
  useEffect(() => {
    getAllMemberships()
      .then((data) => setMemberships(data))
      .catch((err) => console.error('멤버십 목록 조회 실패:', err));
  }, []);

  // 일괄 변경용
  const [newMembershipId, setNewMembershipId] = useState<number | ''>('');
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

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
        status:
          u.status === 'active'
            ? '일반회원'
            : u.status === 'blocked'
              ? '블럭회원'
              : u.status,
        grade: u.membership?.name || '',
        name: u.name,
        nickname: u.nickname,
        instagram: u.instagramId || '',
        followingFollower: `${u.followersCount} / ${u.followingCount}`,
        serviceArea: u.address,
        joinDate: new Date(u.signupDate).toLocaleDateString('ko-KR'),
      }));

      setUserData(users);
      setTotalCount(res.total);
      setSelectedRows(new Set());
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
    if (newMembershipId === '') {
      alert('변경할 멤버십을 선택해주세요.');
      return;
    }
    if (selectedRows.size === 0) {
      alert('변경할 사용자를 선택해주세요.');
      return;
    }

    const target = memberships.find((m) => m.id === newMembershipId);
    if (!target) return;

    if (
      !window.confirm(
        `선택된 ${selectedRows.size}명 멤버십을 "${target.name}"로 변경하시겠습니까?`
      )
    )
      return;

    setIsBulkLoading(true);
    Promise.all(
      Array.from(selectedRows).map((userId) =>
        changeUserMembership(userId, newMembershipId)
      )
    )
      .then(() => {
        alert('멤버십이 성공적으로 변경되었습니다.');
        fetchUsers();
      })
      .catch((err) => {
        console.error('멤버십 일괄 변경 실패:', err);
        alert('일부 또는 전체 변경에 실패했습니다.');
      })
      .finally(() => setIsBulkLoading(false));
  };

  const handleEdit = (no: number) => {
    const user = userData.find((u) => u.no === no);
    if (user) {
      navigate(`/userdetail/${encodeURIComponent(user.email)}`);
    }
  };

  return (
    <Content>
      <HeaderTitle>회원 관리</HeaderTitle>
      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {filteredData.length}</TotalCountText>
        <FilterGroup>
          <Select
            value={newMembershipId}
            onChange={(e) =>
              setNewMembershipId(
                e.target.value === '' ? '' : Number(e.target.value)
              )
            }
          >
            <option value=''>변경할 멤버십 선택</option>
            {memberships.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </Select>
          <BulkButton
            onClick={handleBulkChange}
            disabled={
              newMembershipId === '' || selectedRows.size === 0 || isBulkLoading
            }
          >
            {isBulkLoading ? '변경중...' : '일괄변경'}
          </BulkButton>
        </FilterGroup>
      </InfoBar>

      <TableContainer>
        {loading ? (
          <LoadingText>로딩중...</LoadingText>
        ) : (
          <UserTable
            filteredData={filteredData}
            handleEdit={handleEdit}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
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

/* Styled Components (생략 없이 그대로 유지) */
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
