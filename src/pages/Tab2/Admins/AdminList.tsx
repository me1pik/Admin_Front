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
      lastLogin: admin.lastLogin || '-', // lastLogin 필드가 있다면 사용
      registeredAt: admin.signupDate || admin.createdAt, // 가입일 또는 생성일
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

        // “총 개수”는 서버에서 내려주는 res.total 을 사용
        setTotalCount(res.total);

        // “실제 보여줄 데이터”는 서버가 이미 limit/page 기준으로 잘라서 내려준 admin 리스트 그대로 사용
        setAdminData(mapAdminData(res.admins));
      } catch (err) {
        console.error('관리자 데이터 로드 실패', err);
      }
    };
    fetchAdmins();
  }, [selectedTab, page]);

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

  // — 서버 사이드 페이징을 쓸 때는 아래를 사용하지 않습니다. —
  // const totalPages = Math.max(1, Math.ceil(filteredData.length / limit));
  // const offset = (page - 1) * limit;
  // const currentPageData = filteredData.slice(offset, offset + limit);

  // 1) 페이징 UI를 위한 “전체 페이지 수”는 서버에서 내려준 totalCount 기반으로 계산
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  // 2) 실제 테이블에는 서버에서 받아온 adminData를 그대로 쓰되,
  //    (혹시 검색어가 있는 경우) client-side 검색 결과인 filteredData를 보여줌
  const currentPageData = filteredData;

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
        {/* Pagination 컴포넌트에는 totalPages만 전달 */}
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
