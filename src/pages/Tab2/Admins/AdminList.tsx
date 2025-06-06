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

  // URL 쿼리에서 검색어와 페이지를 읽어옴
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set()); // 선택된 관리자 no 목록
  const limit = 10;

  // API에서 내려주는 raw Admin을 테이블용 타입으로 변환
  const mapAdminData = (admins: any[]): Admin[] =>
    admins.map((admin) => ({
      no: admin.no,
      status: admin.status,
      id: admin.id,
      team: admin.role || '',
      name: admin.name,
      email: admin.email,
      lastLogin: admin.lastLogin || '-', // lastLogin 필드가 있다면 사용
      registeredAt: admin.signupDate || admin.createdAt, // 가입일 또는 생성일
    }));

  // 서버에서 관리자 목록을 가져오는 함수 (useCallback으로 감쌈)
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

      setTotalCount(res.total);
      setAdminData(mapAdminData(res.admins));
      setSelectedIds(new Set()); // 목록이 바뀌면 선택 초기화
    } catch (err) {
      console.error('관리자 데이터 로드 실패', err);
    }
  }, [selectedTab, page]);

  // selectedTab 또는 page가 바뀔 때마다 서버 호출
  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // 클라이언트 사이드 필터링: (검색어가 없으면 adminData 그대로, 있으면 filter)
  const filteredData = adminData.filter((item) => {
    const t = searchTerm;
    if (!t) return true;
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

  // 페이징 UI를 위한 “전체 페이지 수”
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  // 실제 테이블에는 server에서 받은 adminData를 그대로 쓰되,
  // (혹시 검색어가 있는 경우) client-side 검색 결과인 filteredData를 보여줌
  const currentPageData = filteredData;

  // 이메일 클릭 시 수정/상세 페이지로 이동
  const handleEdit = (id: string) => {
    const admin = adminData.find((a) => a.id === id);
    if (admin) navigate(`/admindetail/${admin.no}`);
  };

  // 관리자 등록 클릭
  const handleRegisterClick = () => {
    navigate('/admin-create');
  };

  // 선택된 행이 바뀔 때 호출되는 콜백 (AdminTable에서 내려줌)
  const handleSelectChange = (no: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(no);
      } else {
        newSet.delete(no);
      }
      return newSet;
    });
  };

  // 전체 선택/해제 시 호출되는 콜백
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const all = new Set(currentPageData.map((mgr) => mgr.no));
      setSelectedIds(all);
    } else {
      setSelectedIds(new Set());
    }
  };

  // 관리자 삭제 버튼 클릭 핸들러 (체크된 것들만 삭제)
  const handleDeleteClick = async () => {
    if (selectedIds.size === 0) {
      alert('삭제할 관리자를 하나 이상 선택해주세요.');
      return;
    }

    // 확인 알림
    if (
      !window.confirm(
        `선택된 ${selectedIds.size}명의 관리자를 삭제하시겠습니까?`
      )
    ) {
      return;
    }

    try {
      // 선택된 no에 대응되는 관리자 id를 찾아 삭제
      for (const no of selectedIds) {
        const adminToDelete = adminData.find((a) => a.no === no);
        if (!adminToDelete) {
          console.warn(`no=${no} 관리자 정보를 찾을 수 없습니다.`);
          continue;
        }

        // 실제 삭제 API에는 id(문자열) 값을 넘겨야 함
        await deleteAdmin(adminToDelete.id);
      }
      alert(`선택된 ${selectedIds.size}명의 관리자를 삭제했습니다.`);
      fetchAdmins();
    } catch (err) {
      console.error('관리자 삭제 실패', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  // 탭 변경 시
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  return (
    <Content>
      <HeaderTitle>관리자 관리</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
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
        <Pagination totalPages={totalPages} />
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

// Register 버튼과 Delete 버튼을 묶어주는 그룹
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

// 단순한 스타일의 삭제 버튼 (필요에 따라 스타일 변경 가능)
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
