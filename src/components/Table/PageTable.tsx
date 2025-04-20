// src/components/Table/PageTable.tsx
import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

/** User 인터페이스 (이미지에 맞춰 필드 변경) */
export interface User {
  no: number;
  grade: string;
  name: string;
  nickname: string;
  instagram: string;
  season: string;
  contentsCount: string;
  submitCount: string;
  average: number;
  totalSum: number;
}

/** PageTable 컴포넌트 Props */
interface PageTableProps {
  filteredData: User[];
  handleEdit: (no: number) => void;
  totalPages: number; // 총 페이지 수
}

const PageTable: React.FC<PageTableProps> = ({
  filteredData,
  handleEdit,
  totalPages,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? 1);

  return (
    <>
      <Table>
        <colgroup>
          <col style={{ width: '60px' }} />
          <col style={{ width: '60px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '150px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '80px' }} />
        </colgroup>
        <thead>
          <TableRow>
            <Th>No.</Th>
            <Th>등급</Th>
            <Th>이름</Th>
            <Th>닉네임</Th>
            <Th>계정(인스타)</Th>
            <Th>시즌 진행상태</Th>
            <Th>컨텐츠 수</Th>
            <Th>등록 제출 수</Th>
            <Th>1회 평균</Th>
            <Th>총 합</Th>
          </TableRow>
        </thead>
        <tbody>
          {filteredData.map((user, idx) => (
            <TableRow key={idx}>
              <Td>{user.no}</Td>
              <Td>{user.grade}</Td>
              <Td>{user.name}</Td>
              <Td>{user.nickname}</Td>
              <TdLeft>
                <InstaContainer>
                  <Avatar />
                  <InstaText onClick={() => handleEdit(user.no)}>
                    {user.instagram}
                  </InstaText>
                </InstaContainer>
              </TdLeft>
              <Td>{user.season}</Td>
              <Td>{user.contentsCount}</Td>
              <Td>{user.submitCount}</Td>
              <Td>{user.average}</Td>
              <Td>{user.totalSum}</Td>
            </TableRow>
          ))}

          {filteredData.length < 10 &&
            Array.from({ length: 10 - filteredData.length }).map((_, i) => (
              <TableRow key={`empty-${i}`}>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <TdLeft>&nbsp;</TdLeft>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
              </TableRow>
            ))}
        </tbody>
      </Table>

      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <PageLink
              key={page}
              to={{
                pathname: location.pathname,
                search: `?page=${page}`,
              }}
              isActive={page === currentPage}
            >
              {page}
            </PageLink>
          );
        })}
      </PaginationContainer>
    </>
  );
};

export default PageTable;

/* ================= Styled Components ================= */
const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  height: 44px;
`;

const Th = styled.th`
  text-align: center;
  vertical-align: middle;
  background: #eee;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 12px;
  border: 1px solid #ddd;
  white-space: nowrap;
`;

const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-size: 12px;
  border: 1px solid #ddd;
  white-space: nowrap;
`;

const TdLeft = styled(Td)`
  text-align: left;
`;

const InstaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;
`;

const Avatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ccc;
`;

const InstaText = styled.span`
  cursor: pointer;
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  gap: 4px;
`;

const PageLink = styled(Link)<{ isActive: boolean }>`
  padding: 4px 8px;
  text-decoration: none;
  border: 1px solid #007bff;
  border-radius: 4px;
  font-size: 12px;
  color: ${({ isActive }) => (isActive ? '#fff' : '#007bff')};
  background: ${({ isActive }) => (isActive ? '#007bff' : '#fff')};
  &:hover {
    background: #007bff;
    color: #fff;
  }
`;
