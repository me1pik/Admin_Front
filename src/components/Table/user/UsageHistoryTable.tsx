// src/components/Table/user/UsageHistoryTable.tsx
import React from 'react';
import styled from 'styled-components';

interface UsageHistoryRow {
  date: string; // 이용일자
  orderNumber: string; // 주문번호
  productName: string; // 상품명
  status: string; // 이용상태 (완료, 취소, 진행중 등)
  amount: string; // 결제금액
}

const dummyUsageHistory: UsageHistoryRow[] = [
  {
    date: '2025-03-01',
    orderNumber: 'ORD12345',
    productName: '상품 A',
    status: '완료',
    amount: '120,000원',
  },
  {
    date: '2025-02-27',
    orderNumber: 'ORD12346',
    productName: '상품 B',
    status: '취소',
    amount: '80,000원',
  },
  {
    date: '2025-02-25',
    orderNumber: 'ORD12347',
    productName: '상품 C',
    status: '진행중',
    amount: '150,000원',
  },
  {
    date: '2025-02-20',
    orderNumber: 'ORD12348',
    productName: '상품 D',
    status: '완료',
    amount: '200,000원',
  },
  {
    date: '2025-02-15',
    orderNumber: 'ORD12349',
    productName: '상품 E',
    status: '완료',
    amount: '90,000원',
  },
];

const UsageHistoryTable: React.FC = () => {
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
          {dummyUsageHistory.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.date}</Td>
              <Td>{row.orderNumber}</Td>
              <Td>{row.productName}</Td>
              <Td>{row.status}</Td>
              <Td>{row.amount}</Td>
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
  padding: 10px;
  border: 1px solid #dddddd;
  background-color: #eeeeee;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #dddddd;
  text-align: center;
  font-size: 12px;
`;
