// src/components/Table/GeneralOrderTable.tsx

import React from 'react';
import styled from 'styled-components';
import { getStatusStyle } from '../common/Table';

/** 구매 아이템 인터페이스 */
export interface GeneralOrderListItem {
  no: number;
  orderDate: string;
  buyerAccount: string;
  brand: string;
  styleCode: string;
  size: string;
  color: string;
  paymentMethod: string;
  paymentStatus: string;
}

/** Props */
interface GeneralOrderListTableProps {
  filteredData: GeneralOrderListItem[];
  handleEdit: (no: number) => void;
}

const GeneralOrderListTable: React.FC<GeneralOrderListTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  return (
    <Table>
      <colgroup>
        <col style={{ width: '50px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '150px' }} />
        <col style={{ width: '120px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: '80px' }} />
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>주문일</Th>
          <Th>주문자(계정)</Th>
          <Th>브랜드</Th>
          <Th>스타일(품번)</Th>
          <Th>사이즈</Th>
          <Th>제품색상</Th>
          <Th>결제방식</Th>
          <Th>결제상태</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <Td>{item.no}</Td>
              <Td>{item.orderDate}</Td>
              <TdLeft onClick={() => handleEdit(item.no)}>
                <AccountContainer>
                  <ProfileCircle />
                  <AccountText>{item.buyerAccount}</AccountText>
                </AccountContainer>
              </TdLeft>
              <Td>{item.brand}</Td>
              <Td>{item.styleCode}</Td>
              <Td>{item.size}</Td>
              <Td>{item.color}</Td>
              <Td>{item.paymentMethod}</Td>
              <Td>
                <StatusBadge style={getStatusStyle(item.paymentStatus)}>
                  {item.paymentStatus}
                </StatusBadge>
              </Td>
            </TableRow>
          );
        })}

        {/* 빈 행 채우기 */}
        {filteredData.length < 10 &&
          Array.from({ length: 10 - filteredData.length }).map((_, i) => (
            <TableRow key={`empty-${i}`}>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <TdLeft>&nbsp;</TdLeft>
              <Td>&nbsp;</Td>
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

export default GeneralOrderListTable;

/* Styled Components */

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

  font-weight: 800;
  font-size: 12px;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const Td = styled.td`
  text-align: center;
  vertical-align: middle;

  font-weight: 400;
  font-size: 12px;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const TdLeft = styled(Td)`
  text-align: left;
  cursor: pointer;
`;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;
`;

const ProfileCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #cccccc;
`;

const AccountText = styled.span`
  font-size: 12px;
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;

const StatusBadge = styled.div`
  display: inline-block;
  border-radius: 4px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  font-size: 10px;
  font-weight: 800;
  color: #ffffff;
  text-align: center;
`;
