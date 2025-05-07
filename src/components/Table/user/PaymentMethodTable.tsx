import React from 'react';
import styled from 'styled-components';

export interface PaymentMethodRow {
  no: number; // No.
  cardCompany: string; // 카드사
  cardNumber: string; // 카드번호
  status: string; // 상태
  registeredDate: string; // 등록일자
}

interface PaymentMethodTableProps {
  data: PaymentMethodRow[];
}

const PaymentMethodTable: React.FC<PaymentMethodTableProps> = ({ data }) => {
  const emptyRowsCount = Math.max(0, 10 - data.length);

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>No.</Th>
            <Th>카드사</Th>
            <Th>카드번호</Th>
            <Th>상태</Th>
            <Th>등록일자</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.no}</Td>
              <Td>{row.cardCompany}</Td>
              <Td>{row.cardNumber}</Td>
              <Td>{row.status}</Td>
              <Td>{row.registeredDate}</Td>
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

export default PaymentMethodTable;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #dddddd;
  border-radius: 4px;
  min-width: 800px;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Td = styled.td`
  height: 44px;
  border: 1px solid #dddddd;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
