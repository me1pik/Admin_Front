// src/components/Table/user/AdditionalListTable.tsx
import React from 'react';
import styled from 'styled-components';

export interface AdditionalListRow {
  no: number; // No.
  registeredDate: string; // 등록일자
  style: string; // 스타일 (품번)
  brand: string; // 브랜드
  category: string; // 분류
  color: string; // 색상
  purchaseSize: string; // 구매 사이즈
  retailPrice: string; // 리테일가
}

interface AdditionalListTableProps {
  data: AdditionalListRow[];
}

const AdditionalListTable: React.FC<AdditionalListTableProps> = ({ data }) => {
  const emptyRowsCount = Math.max(0, 10 - data.length);

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>No.</Th>
            <Th>등록일자</Th>
            <Th>스타일 (품번)</Th>
            <Th>브랜드</Th>
            <Th>분류</Th>
            <Th>색상</Th>
            <Th>구매 사이즈</Th>
            <Th>리테일가</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.no}</Td>
              <Td>{row.registeredDate}</Td>
              <Td>{row.style}</Td>
              <Td>{row.brand}</Td>
              <Td>{row.category}</Td>
              <Td>{row.color}</Td>
              <Td>{row.purchaseSize}</Td>
              <Td>{row.retailPrice}</Td>
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
              <Td />
              <Td />
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default AdditionalListTable;

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
