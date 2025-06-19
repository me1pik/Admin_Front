// src/pages/AdminList.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import AdminTable, { Admin } from '../../../components/Table/AdminTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import RegisterButton from '../../../components/RegisterButton';
import {
  getAllAdmins,
  getActiveAdmins,
  getBlockedAdmins,
  deleteAdmin, // DELETE API import
} from '../../../api/admin';
import { GetAdminsResponse } from '../../../api/admin';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '관리자', path: 'active' },
  { label: '블럭', path: 'blocked' },
];

const AdminList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 쿼리: search, page, status(tab)
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase().trim();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const statusParam = searchParams.get('status') ?? tabs[0].path;
  const matchedTab = tabs.find((t) => t.path === statusParam) || tabs[0];
  const [selectedTab, setSelectedTab] = useState<TabItem>(matchedTab);

  const limit = 10; // 페이지당 항목 수

  // 서버에서 관리자 목록을 가져오는 함수
  const fetchAdmins = useCallback(async () => {
    try {
      let res: GetAdminsResponse;
      if (selectedTab.label === '전체보기') {
        res = await getAllAdmins(limit, page);
      } else if (selectedTab.label === '관리자') {
        res = await getActiveAdmins(limit, page);
      } else {
        res = await getBlockedAdmins(limit, page);
      }
      // total과 admin 목록 세팅
      setTotalCount(res.total);
      setAdminData(
        // map to Admin 타입
        res.admins.map((admin: any) => ({
          no: admin.no,
          status: admin.status,
          id: admin.id,
          team: admin.role || '',
          name: admin.name,
          email: admin.email,
          lastLogin: admin.lastLogin
            ? new Date(admin.lastLogin).toLocaleDateString('ko-KR')
            : '-',
          registeredAt: admin.signupDate
            ? new Date(admin.signupDate).toLocaleDateString('ko-KR')
            : admin.createdAt
              ? new Date(admin.createdAt).toLocaleDateString('ko-KR')
              : '-',
        }))
      );
      setSelectedIds(new Set()); // 목록 변경 시 선택 초기화
    } catch (err) {
      console.error('관리자 데이터 로드 실패', err);
    }
  }, [selectedTab, page]);

  // state: 서버에서 받아온 현재 페이지 adminData, totalCount, 선택된 IDs
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // 탭 변경 시 URL 및 state 동기화
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.status = tab.path;
    params.page = '1';
    setSearchParams(params);
  };

  // URL의 status 파라미터가 바뀌면 selectedTab 동기화
  useEffect(() => {
    setSelectedTab(matchedTab);
  }, [matchedTab]);

  // selectedTab 또는 page 변경 시 fetch
  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // 클라이언트 사이드 검색 필터링: 현재 페이지(adminData) 내에서 필터링
  const filteredData = adminData.filter((item) => {
    if (!searchTerm) return true;
    const t = searchTerm;
    return (
      String(item.no).includes(t) ||
      item.id.toLowerCase().includes(t) ||
      item.name.toLowerCase().includes(t) ||
      item.email.toLowerCase().includes(t) ||
      item.team.toLowerCase().includes(t) ||
      item.status.toLowerCase().includes(t) ||
      item.registeredAt.toLowerCase().includes(t) ||
      item.lastLogin.toLowerCase().includes(t)
    );
  });

  // Pagination 계산: totalCount는 서버 전체 개수, 페이지 수 계산
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  // 안전하게 현재 page 범위 제한
  const safePage = Math.min(Math.max(page, 1), totalPages);
  // 현재 보여줄 데이터: 서버에서 이미 페이지네이션되어 온 adminData에, 검색이 있으면 filteredData 사용
  // (서버에서 온 adminData가 이미 해당 페이지 항목이므로, filteredData도 최대 limit 개)
  const currentPageData = filteredData;

  // 페이지 변경 핸들러
  const handlePageChange = (p: number) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = String(p);
    setSearchParams(params);
    setSelectedIds(new Set()); // 페이지 바뀌면 선택 초기화
  };

  // 선택된 행 변경
  const handleSelectChange = (no: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (checked) newSet.add(no);
      else newSet.delete(no);
      return newSet;
    });
  };
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allNos = currentPageData.map((a) => a.no);
      setSelectedIds(new Set(allNos));
    } else {
      setSelectedIds(new Set());
    }
  };

  // 편집/상세 이동
  const handleEdit = (id: string) => {
    const admin = adminData.find((a) => a.id === id);
    if (admin) navigate(`/admindetail/${admin.no}`);
  };

  // 등록 버튼
  const handleRegisterClick = () => {
    navigate('/admin-create');
  };

  // 삭제
  const handleDeleteClick = async () => {
    if (selectedIds.size === 0) {
      alert('삭제할 관리자를 하나 이상 선택해주세요.');
      return;
    }
    if (
      !window.confirm(
        `선택된 ${selectedIds.size}명의 관리자를 삭제하시겠습니까?`
      )
    ) {
      return;
    }
    try {
      for (const no of selectedIds) {
        const adminToDelete = adminData.find((a) => a.no === no);
        if (!adminToDelete) {
          console.warn(`no=${no} 관리자 정보를 찾을 수 없습니다.`);
          continue;
        }
        await deleteAdmin(adminToDelete.id);
      }
      alert(`선택된 ${selectedIds.size}명의 관리자를 삭제했습니다.`);
      // 삭제 후 현재 페이지 다시 로드
      fetchAdmins();
      setSelectedIds(new Set());
      // 페이지 재설정: 필요 시 page=1 or 유지
      // 여기서는 단순히 현재 URL page를 1로 리셋:
      const params = Object.fromEntries(searchParams.entries());
      params.page = '1';
      setSearchParams(params);
    } catch (err) {
      console.error('관리자 삭제 실패', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <Content>
      <HeaderTitle>관리자 관리</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        {/* 서버 전체 개수(totalCount)나, 검색 후 현재 페이지 내 필터 개수를 보여주려면 아래를 조정 */}
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <AdminTable
          filteredData={currentPageData}
          handleEdit={handleEdit}
          selectedIds={selectedIds}
          onSelectChange={handleSelectChange}
          onSelectAll={handleSelectAll}
        />
      </TableContainer>

      <FooterRow>
        <ButtonGroup>
          <RegisterButton text='관리자 등록' onClick={handleRegisterClick} />
          <DeleteButton
            onClick={handleDeleteClick}
            disabled={selectedIds.size === 0}
          >
            관리자삭제
          </DeleteButton>
        </ButtonGroup>
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </FooterRow>
    </Content>
  );
};

export default AdminList;

/* ====================== Styled Components ====================== */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  flex-grow: 1;
  font-size: 14px;
  padding: 10px;
`;

const HeaderTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 18px;
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TotalCountText = styled.div`
  font-weight: 900;
  font-size: 12px;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button<{ disabled: boolean }>`
  background: ${({ disabled }) => (disabled ? '#ccc' : '#e74c3c')};
  color: #fff;
  border: none;
  padding: 8px 12px;
  min-width: 100px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ disabled }) => (disabled ? '#ccc' : '#c0392b')};
  }
`;
