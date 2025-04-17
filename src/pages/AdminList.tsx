// src/pages/AdminList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import AdminTable, { Admin } from '../components/Table/AdminTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';
import RegisterButton from '../components/RegisterButton';
import { getAllAdmins, getActiveAdmins, getBlockedAdmins } from '../api/admin';
import { GetAdminsResponse } from '../api/admin';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '관리자', path: 'active' },
  { label: '블럭', path: 'blocked' },
];

const AdminList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

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

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

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

  // client-side pagination after filtering
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
      <HeaderTitle>관리자 목록</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <AdminTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>

      <FooterRow>
        <RegisterButton text='관리자등록' onClick={handleRegisterClick} />
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(totalCount / limit)}
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
  font-family: 'NanumSquare Neo OTF', sans-serif;
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
  font-family: 'NanumSquare Neo OTF', sans-serif;
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
