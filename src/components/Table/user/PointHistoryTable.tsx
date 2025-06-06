// src/components/Table/user/PointHistoryTable.tsx
import React from 'react';
import styled from 'styled-components';

export interface PointHistoryRow {
  no: number; // No.
  date: string; // 적립일자
  kind: '적립' | '차감'; // 종류 (적립/차감)
  history: string; // 포인트 변동내역
  changedPoints: string; // 변동 포인트
  remainingPoints: string; // 잔여 포인트
}

interface PointHistoryTableProps {
  data: PointHistoryRow[];
}

const PointHistoryTable: React.FC<PointHistoryTableProps> = ({ data }) => {
  const emptyRowsCount = Math.max(0, 10 - data.length);

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>No.</Th>
            <Th>적립일자</Th>
            <Th>종류 (적립/차감)</Th>
            <Th>포인트 변동내역</Th>
            <Th>변동 포인트</Th>
            <Th>잔여 포인트</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.no}</Td>
              <Td>{row.date}</Td>
              <Td>{row.kind}</Td>
              <Td>{row.history}</Td>
              <Td>{row.changedPoints}</Td>
              <Td>{row.remainingPoints}</Td>
            </tr>
          ))}
          {Array.from({ length: emptyRowsCount }).map((_, idx) => (
            <tr key={`empty-${idx}`}>
              <Td />
              <Td />
              <Td />
              <Td />
              <Td />
              <Td />
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default PointHistoryTable;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #dddddd;
  border-radius: 4px;
  min-width: 1000px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
`;

const Th = styled.th`
  height: 40px;
  border: 1px solid #dddddd;
  background-color: #eeeeee;
  font-weight: 800;
  font-size: 12px;
  color: #000000;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Td = styled.td`
  height: 44px;
  border: 1px solid #dddddd;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
