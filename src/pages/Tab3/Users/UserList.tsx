import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import UserTable, { User } from '../../../components/Table/UserTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import {
  getAllUsers,
  changeUserMembership,
  getAllMemberships,
  GetAllMembershipsResponse,
  // 가정: API에서 전체 개수 조회를 위해 getAllUsers(limit, page)를 사용
} from '../../../api/adminUser';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '일반회원', path: '일반' },
  { label: '블럭회원', path: '블럭' },
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 쿼리: search, page, status(tab)
  const searchTerm = searchParams.get('search')?.toLowerCase().trim() ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const statusParam = searchParams.get('status') ?? tabs[0].path;
  const matchedTab = tabs.find((t) => t.path === statusParam) || tabs[0];
  const [selectedTab, setSelectedTab] = useState<TabItem>(matchedTab);

  const limit = 10; // 페이지당 항목 수

  // 전체 사용자 데이터 (Raw)
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);

  // memberships for bulk change
  const [memberships, setMemberships] = useState<GetAllMembershipsResponse>([]);
  useEffect(() => {
    getAllMemberships()
      .then((data) => setMemberships(data))
      .catch((err) => console.error('멤버십 목록 조회 실패:', err));
  }, []);

  // bulk change
  const [newMembershipId, setNewMembershipId] = useState<number | ''>('');
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // 1) 전체 사용자 목록 한 번에 불러오기
  const fetchAllUsers = async () => {
    setLoadingAll(true);
    try {
      // 1-1) 총 개수 요청: limit=1, page=1으로 total 얻기
      const firstRes = await getAllUsers(1, 1);
      const totalCount = firstRes.total;

      // 1-2) 전체 데이터 요청: limit=totalCount, page=1
      const res = await getAllUsers(totalCount, 1);
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
      setAllUsers(users);
      // 초기 선택행 해제
      setSelectedRows(new Set());
    } catch (err) {
      console.error('전체 사용자 목록을 불러오는데 실패했습니다:', err);
    } finally {
      setLoadingAll(false);
    }
  };

  // 컴포넌트 마운트 시와, 탭/검색어가 바뀔 때 전체 다시 로드
  useEffect(() => {
    fetchAllUsers();
    // statusParam이나 searchTerm이 바뀌어도 전체 재로딩?
    // 현재는 탭 변경 시 전체 다시 불러옴. 검색어는 클라이언트 필터링이므로 전체 재요청 불필요하지만,
    // 신규 사용자가 생겼을 가능성 반영 위해 탭 변경 시만 재요청해도 무방.
    // searchTerm 의존은 생략해도 됨(클라이언트 필터링).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusParam]);

  // 탭 변경 시 URL 반영, currentPage 초기화
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.status = tab.path;
    params.page = '1';
    setSearchParams(params);
    // fetchAllUsers(); // useEffect에서 statusParam 의존으로 자동 호출
  };

  // 2) 탭 필터링
  const dataByTab = allUsers.filter((item) =>
    selectedTab.label === '전체보기' ? true : item.status === selectedTab.label
  );

  // 3) 검색 필터링
  const filteredData = dataByTab.filter((item) => {
    const txt = searchTerm;
    if (!txt) return true;
    return (
      String(item.no).toLowerCase().includes(txt) ||
      item.email.toLowerCase().includes(txt) ||
      item.name.toLowerCase().includes(txt) ||
      item.nickname.toLowerCase().includes(txt) ||
      item.instagram.toLowerCase().includes(txt) ||
      item.followingFollower.toLowerCase().includes(txt) ||
      item.serviceArea.toLowerCase().includes(txt) ||
      item.status.toLowerCase().includes(txt) ||
      item.grade.toLowerCase().includes(txt) ||
      item.joinDate.toLowerCase().includes(txt)
    );
  });

  // 4) 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(filteredData.length / limit));
  // URL의 page가 범위를 벗어나면 보정
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const paginated = filteredData.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  // bulk change
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
        // 전체 재로딩
        fetchAllUsers();
      })
      .catch((err) => {
        console.error('멤버십 일괄 변경 실패:', err);
        alert('일부 또는 전체 변경에 실패했습니다.');
      })
      .finally(() => setIsBulkLoading(false));
  };

  const handleEdit = (no: number) => {
    const user = allUsers.find((u) => u.no === no);
    if (user) {
      navigate(`/userdetail/${encodeURIComponent(user.email)}`);
    }
  };

  // 페이지 변경 시 URL 쿼리 반영
  const onPageChange = (p: number) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = p.toString();
    setSearchParams(params);
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
        {loadingAll ? (
          <LoadingText>로딩중...</LoadingText>
        ) : (
          <UserTable
            filteredData={paginated}
            handleEdit={handleEdit}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        )}
      </TableContainer>

      <FooterRow>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
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
