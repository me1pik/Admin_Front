// src/components/ShippingAddressTable.tsx
import React from 'react';
import styled from 'styled-components';

export interface ShippingRow {
  type: string; // 수령지 (자택, 기타 등)
  name: string; // 수령인
  address: string; // 배송지
  phone1: string; // 연락처1
  phone2: string; // 연락처2
  isDefault: boolean; // 기본설정 여부
}

interface ShippingAddressTableProps {
  data: ShippingRow[];
}

const ShippingAddressTable: React.FC<ShippingAddressTableProps> = ({
  data,
}) => {
  // 10행 고정을 위해 부족한 행의 개수 계산
  const emptyRowsCount = Math.max(0, 10 - data.length);

  return (
    <TableContainer>
      <StyledTable>
        <colgroup>
          <col style={{ width: '50px' }} /> {/* No. 열 */}
          <col style={{ width: '80px' }} /> {/* 수령지 */}
          <col style={{ width: '80px' }} /> {/* 이름 */}
          <col style={{ width: '300px' }} /> {/* 배송지 */}
          <col style={{ width: '100px' }} /> {/* 연락처1 */}
          <col style={{ width: '100px' }} /> {/* 연락처2 */}
          <col style={{ width: '80px' }} /> {/* 기본설정 */}
        </colgroup>
        <thead>
          <tr>
            <Th>No.</Th>
            <Th>수령지</Th>
            <Th>이름</Th>
            <Th>배송지</Th>
            <Th>연락처1</Th>
            <Th>연락처2</Th>
            <Th>기본설정</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <Td>{idx + 1}</Td>
              <Td title={row.type}>{row.type}</Td>
              <Td title={row.name}>{row.name}</Td>
              <Td title={row.address}>{row.address}</Td>
              <Td title={row.phone1}>{row.phone1}</Td>
              <Td title={row.phone2}>{row.phone2}</Td>
              <Td>{row.isDefault ? 'Y' : 'N'}</Td>
            </tr>
          ))}
          {/* 데이터가 10행 미만이면 빈 행 추가 */}
          {Array.from({ length: emptyRowsCount }).map((_, idx) => (
            <tr key={`empty-${idx}`}>
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

export default ShippingAddressTable;

/* ====================== Styled Components ====================== */

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
