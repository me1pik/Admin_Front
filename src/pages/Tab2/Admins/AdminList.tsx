// src/pages/AdminList.tsx

import React, { useState, useEffect } from 'react';
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
      lastLogin: '-',
      registeredAt: admin.signupDate || admin.createdAt,
    }));

  // 탭 변경 시 selectedTab 업데이트 + 페이지를 1로 리셋
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  // selectedTab 또는 page가 바뀔 때마다 서버 호출
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        let res: GetAdminsResponse;
        if (selectedTab.label === '전체보기') {
          res = await getAllAdmins(limit, page);
        } else if (selectedTab.label === '관리자') {
          res = await getActiveAdmins(limit, page);
        } else {
          res = await getBlockedAdmins(limit, page);
        }
        setAdminData(mapAdminData(res.admins));
        setTotalCount(res.total);
      } catch (err) {
        console.error('관리자 데이터 로드 실패', err);
      }
    };
    fetchAdmins();
  }, [selectedTab, page]);

  // 클라이언트 사이드 검색어 필터링
  const filteredData = adminData.filter((item) => {
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

  // 최종 페이지 수와 현재 페이지 데이터 슬라이스
  const totalPages = Math.max(1, Math.ceil(filteredData.length / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  const handleEdit = (id: string) => {
    const admin = adminData.find((a) => a.id === id);
    if (admin) navigate(`/admindetail/${admin.no}`);
  };

  const handleRegisterClick = () => {
    navigate('/admin-create');
  };

  return (
    <Content>
      <HeaderTitle>관리자 관리</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <AdminTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>

      <FooterRow>
        <RegisterButton text='관리자등록' onClick={handleRegisterClick} />
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
