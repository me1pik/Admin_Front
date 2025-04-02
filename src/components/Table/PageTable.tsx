// src/components/Table/PageTable.tsx
import React from 'react';
import styled from 'styled-components';

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
}

const PageTable: React.FC<PageTableProps> = ({ filteredData, handleEdit }) => {
  return (
    <Table>
      <colgroup>
        <col style={{ width: '60px' }} /> {/* No. */}
        <col style={{ width: '60px' }} /> {/* 등급 */}
        <col style={{ width: '80px' }} /> {/* 이름 */}
        <col style={{ width: '80px' }} /> {/* 닉네임 */}
        <col style={{ width: '150px' }} /> {/* 계정(인스타) */}
        <col style={{ width: '100px' }} /> {/* 시즌 편집참여 */}
        <col style={{ width: '80px' }} /> {/* 컨텐츠 수 */}
        <col style={{ width: '80px' }} /> {/* 등록 제출 수 */}
        <col style={{ width: '80px' }} /> {/* 1회 평균 */}
        <col style={{ width: '80px' }} /> {/* 총 합 */}
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>등급</Th>
          <Th>이름</Th>
          <Th>닉네임</Th>
          <Th>계정(인스타)</Th>
          <Th>시즌 진행상태</Th>
          <Th>링크등록</Th>
          <Th>등록 제품수</Th>
          <Th>1일 방문</Th>
          <Th>총 방문</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((user, index) => (
          <TableRow key={index}>
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
        {/* 빈 행을 10행으로 고정 (각 셀을 개별적으로 생성) */}
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
  );
};

export default PageTable;

/* ====================== Styled Components ====================== */

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #ffffff;
  border: 1px solid #dddddd;
`;

const TableRow = styled.tr`
  height: 44px;
`;

const Th = styled.th`
  text-align: center;
  vertical-align: middle;
  background-color: #eeeeee;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
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
  flex-shrink: 0;
  background-color: #cccccc;
`;

const InstaText = styled.span`
  cursor: pointer;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;
