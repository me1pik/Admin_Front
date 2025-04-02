// src/components/Table/CalculateListTable.tsx
import React from 'react';
import styled from 'styled-components';

/** User 인터페이스 */
export interface User {
  no: number; // No.
  grade: string; // 등급
  name: string; // 이름
  nickname: string; // 닉네임
  instagram: string; // 계정(인스타)
  season: string; // 시즌 진행상태
  sellCount: string; // 판매 제출수
  totalSum: number; // 총 판매금액
  profit: number; // 정산 수익
  expectedProfit: number; // 정산 예정금액
}

/** CalculateListTable 컴포넌트 Props */
interface CalculateListTableProps {
  filteredData: User[];
  handleEdit: (no: number) => void;
}

const CalculateListTable: React.FC<CalculateListTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  return (
    <Table>
      <colgroup>
        <col style={{ width: '60px' }} /> {/* No. */}
        <col style={{ width: '60px' }} /> {/* 등급 */}
        <col style={{ width: '80px' }} /> {/* 이름 */}
        <col style={{ width: '80px' }} /> {/* 닉네임 */}
        <col style={{ width: '150px' }} /> {/* 계정(인스타) */}
        <col style={{ width: '120px' }} /> {/* 시즌 진행상태 */}
        <col style={{ width: '90px' }} /> {/* 판매 제출수 */}
        <col style={{ width: '100px' }} /> {/* 총 판매금액 */}
        <col style={{ width: '90px' }} /> {/* 정산 수익 */}
        <col style={{ width: '90px' }} /> {/* 정산 예정금액 */}
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>등급</Th>
          <Th>이름</Th>
          <Th>닉네임</Th>
          <Th>계정(인스타)</Th>
          <Th>시즌 진행상태</Th>
          <Th>판매 제품수</Th>
          <Th>총 판매금액</Th>
          <Th>판매 수익금</Th>
          <Th>정산 예정금</Th>
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
            <Td>{user.sellCount}</Td>
            {/* 1,840,000처럼 쉼표 표시 */}
            <Td>{user.totalSum.toLocaleString()}</Td>
            <Td>{user.profit.toLocaleString()}</Td>
            <Td>{user.expectedProfit.toLocaleString()}</Td>
          </TableRow>
        ))}
        {/* 10행 미만이면 빈 행 생성 */}
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

export default CalculateListTable;

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
