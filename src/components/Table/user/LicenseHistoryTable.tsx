// src/components/Table/user/LicenseHistoryTable.tsx
import React from 'react';
import styled from 'styled-components';

export interface LicenseHistoryRow {
  no: number; // No.
  type: string; // 종류
  paymentDate: string; // 결제일자
  nextPaymentDate?: string; // 다음 결제일자
  code: string; // 이용권 코드
  period?: string; // 이용권 사용기간
  amount: string; // 결제금액
  status: string; // 상태
  cancelRequestDate?: string; // 취소 신청일자
}

interface LicenseHistoryTableProps {
  data: LicenseHistoryRow[];
}

const LicenseHistoryTable: React.FC<LicenseHistoryTableProps> = ({ data }) => {
  const emptyRowsCount = Math.max(0, 10 - data.length);

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>No.</Th>
            <Th>종류</Th>
            <Th>결제일자</Th>
            <Th>다음 결제일자</Th>
            <Th>이용권 코드</Th>
            <Th>이용권 사용기간</Th>
            <Th>결제금액</Th>
            <Th>상태</Th>
            <Th>취소 신청일자</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.no}</Td>
              <Td>{row.type}</Td>
              <Td>{row.paymentDate}</Td>
              <Td>{row.nextPaymentDate || '-'}</Td>
              <Td>
                <Underlined>{row.code}</Underlined>
              </Td>
              <Td>{row.period || '-'}</Td>
              <Td>{row.amount}</Td>
              <Td>{row.status}</Td>
              <Td>{row.cancelRequestDate || '-'}</Td>
            </tr>
          ))}
          {Array.from({ length: emptyRowsCount }).map((_, idx) => (
            <tr key={`empty-${idx}`}>
              {Array.from({ length: 9 }).map((_, cidx) => (
                <Td key={cidx} />
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default LicenseHistoryTable;

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
  text-align: center;
  white-space: nowrap;
`;

const Td = styled.td`
  height: 44px;
  border: 1px solid #dddddd;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
`;

const Underlined = styled.span`
  text-decoration: underline;
`;
