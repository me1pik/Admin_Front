// src/pages/ManagerList.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AdminGet, deleteAdmin } from '../api/AdminApi';
import SubHeader from '../components/SubHeader';
import AdminTable from '../components/AdminTable';
import Pagination from '../components/Pagination';

const ManagerList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('id');
  const [adminData, setAdminData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AdminGet(page, limit);
        setAdminData(data.admins);
        setTotalCount(data.total);
        console.log('Fetched admin data:', data.admins);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      }
    };

    fetchData();
  }, [page, limit]);

  const handleEdit = (id: string) => {
    navigate(`/admin/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      '정말로 이 관리자를 삭제하시겠습니까?'
    );
    if (confirmDelete) {
      try {
        await deleteAdmin(id);
        alert('관리자가 성공적으로 삭제되었습니다.');
        setAdminData((prevData) =>
          prevData.filter((admin: any) => admin.id !== id)
        );
      } catch (error) {
        alert('관리자 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const filteredData = adminData.filter((item: any) => {
    if (searchType === 'id') {
      return item.id.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === 'name') {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === 'email') {
      return item.email.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === 'role') {
      return item.role.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <Content>
      {/* 헤더 + 검색영역 */}
      <HeaderTitle>관리자 목록</HeaderTitle>
      <SubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
      />

      {/* 타이틀과 액션영역을 flex로 정렬 */}
      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
        <ActionButton onClick={() => navigate('/admin/create')}>
          신규 등록
        </ActionButton>
      </InfoBar>

      {/* 메인 컨텐츠 */}
      <TableContainer>
        <AdminTable
          filteredData={filteredData}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </TableContainer>

      {/* 페이지네이션 */}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </Content>
  );
};

export default ManagerList;

/* 스타일 정의 */
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
  margin-bottom: 10px;
`;

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TotalCount = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

const ActionButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #a0522d;
  color: #ffffff;
  border: none;
  border-radius: 4px;
`;

const TableContainer = styled.div`
  border: 2px solid #cccccc;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: auto;
`;
