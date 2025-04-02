// src/pages/AdminList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // 검색 상태
  const [searchTerm, setSearchTerm] = useState('');
  // 현재 선택된 탭 상태
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  // API에서 불러온 관리자 목록 (AdminResponse를 Admin 타입으로 변환)
  const [adminData, setAdminData] = useState<Admin[]>([]);
  // 전체 관리자 수 (API 응답)
  const [totalCount, setTotalCount] = useState(0);
  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10;

  // API 응답(AdminResponse)을 AdminTable 컴포넌트에서 사용하는 Admin 타입으로 변환하는 함수
  const mapAdminData = (admins: any[]): Admin[] => {
    return admins.map((admin) => ({
      no: admin.no,
      status: admin.status,
      id: admin.id,
      // API에 team 필드가 없다면 기본값 또는 role 정보를 사용하도록 함
      team: admin.role || '',
      name: admin.name,
      email: admin.email,
      // lastLogin은 API에 없으므로 기본값 '-' 처리
      lastLogin: '-',
      // 등록일자는 signupDate가 있으면 사용하고 없으면 createdAt 사용
      registeredAt: admin.signupDate || admin.createdAt,
    }));
  };

  // 선택된 탭이나 페이지가 변경될 때 API를 호출합니다.
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        let response: GetAdminsResponse;
        if (selectedTab.label === '전체보기') {
          response = await getAllAdmins(limit, page);
        } else if (selectedTab.label === '관리자') {
          response = await getActiveAdmins(limit, page);
        } else if (selectedTab.label === '블럭') {
          response = await getBlockedAdmins(limit, page);
        } else {
          response = { admins: [], total: 0 };
        }
        setAdminData(mapAdminData(response.admins));
        setTotalCount(response.total);
      } catch (error) {
        console.error('관리자 데이터를 불러오는 중 에러 발생', error);
      }
    };
    fetchAdmins();
  }, [page, selectedTab]);

  // 탭 변경 시 호출되는 콜백
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 클라이언트측 검색 로직: 여러 항목에서 검색
  const filteredData = adminData.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      String(item.no).toLowerCase().includes(lowerTerm) ||
      item.id.toLowerCase().includes(lowerTerm) ||
      item.name.toLowerCase().includes(lowerTerm) ||
      item.email.toLowerCase().includes(lowerTerm) ||
      item.team.toLowerCase().includes(lowerTerm) ||
      item.status.toLowerCase().includes(lowerTerm) ||
      item.registeredAt.toLowerCase().includes(lowerTerm) ||
      item.lastLogin.toLowerCase().includes(lowerTerm)
    );
  });

  // 페이지네이션을 위해 필터된 데이터에서 현재 페이지 데이터만 선택합니다.
  const currentPageData = filteredData.slice(0, limit);

  // 이메일 클릭 시 상세 페이지 이동 (AdminTable에서 id(string)을 인자로 전달)
  const handleEdit = (id: string) => {
    const admin = adminData.find((admin) => admin.id === id);
    if (admin) {
      navigate(`/admindetail/${admin.no}`);
    }
  };

  // RegisterButton 클릭 시 처리
  const handleRegisterClick = () => {
    navigate('/admin-create');
  };

  return (
    <Content>
      <HeaderTitle>관리자 목록</HeaderTitle>
      <SubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tabs={tabs}
        onTabChange={handleTabChange}
      />
      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>
      <TableContainer>
        <AdminTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>
      <FooterRow>
        <RegisterButton text='제품등록' onClick={handleRegisterClick} />
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

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;
