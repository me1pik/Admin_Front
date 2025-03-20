// src/components/Table/user/UsageHistoryTable.tsx
import React from 'react';
import styled from 'styled-components';

export interface UsageHistoryRow {
  date: string; // 이용일자
  orderNumber: string; // 주문번호
  productName: string; // 상품명
  status: string; // 이용상태 (완료, 취소, 진행중 등)
  amount: string; // 결제금액
}

interface UsageHistoryTableProps {
  data: UsageHistoryRow[];
}

const UsageHistoryTable: React.FC<UsageHistoryTableProps> = ({ data }) => {
  const emptyRowsCount = Math.max(0, 10 - data.length);

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>이용일자</Th>
            <Th>주문번호</Th>
            <Th>상품명</Th>
            <Th>이용상태</Th>
            <Th>결제금액</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.date}</Td>
              <Td>{row.orderNumber}</Td>
              <Td>{row.productName}</Td>
              <Td>{row.status}</Td>
              <Td>{row.amount}</Td>
            </tr>
          ))}
          {Array.from({ length: emptyRowsCount }).map((_, idx) => (
            <tr key={`empty-${idx}`}>
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

export default UsageHistoryTable;

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
  font-family: 'NanumSquare Neo OTF', sans-serif;
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
