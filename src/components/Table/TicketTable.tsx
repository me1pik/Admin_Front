import React from 'react';
import styled from 'styled-components';
import { getStatusStyle } from '../common/Table';

/** 이용권 아이템 인터페이스 */
export interface TicketItem {
  no: number; // 번호
  paymentDate: string; // 결제일
  nextPaymentDate: string; // 다음결제일
  user: string; // 이용자 (닉네임)
  type: string; // 종류
  usagePeriod: string; // 이용기간
  usageCount: string; // 이용횟수
  status: string; // 상태
}

interface TicketTableProps {
  filteredData: TicketItem[];
  handleEdit: (no: number) => void;
  selectedRows: Set<number>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const TicketTable: React.FC<TicketTableProps> = ({
  filteredData,
  handleEdit,
  selectedRows,
  setSelectedRows,
}) => {
  const allSelected =
    filteredData.length > 0 && selectedRows.size === filteredData.length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(filteredData.map((t) => t.no)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (no: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(no)) newSet.delete(no);
      else newSet.add(no);
      return newSet;
    });
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: '40px' }} /> {/* 체크박스 */}
        <col style={{ width: '50px' }} /> {/* 번호 */}
        <col style={{ width: '100px' }} /> {/* 결제일 */}
        <col style={{ width: '100px' }} /> {/* 다음결제일 */}
        <col style={{ width: '150px' }} /> {/* 이용자 (닉네임) */}
        <col style={{ width: '120px' }} /> {/* 종류 */}
        <col style={{ width: '150px' }} /> {/* 이용기간 */}
        <col style={{ width: '80px' }} /> {/* 이용횟수 */}
        <col style={{ width: '80px' }} /> {/* 상태 */}
      </colgroup>
      <thead>
        <TableRow>
          <Th>
            <input
              type='checkbox'
              onChange={handleSelectAll}
              checked={allSelected}
              disabled={filteredData.length === 0}
            />
          </Th>
          <Th>번호</Th>
          <Th>결제일</Th>
          <Th>다음결제일</Th>
          <Th>이용자 (닉네임)</Th>
          <Th>종류</Th>
          <Th>이용기간</Th>
          <Th>이용횟수</Th>
          <Th>상태</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((item) => {
          return (
            <TableRow key={item.no}>
              <Td>
                <input
                  type='checkbox'
                  checked={selectedRows.has(item.no)}
                  onChange={() => handleRowSelect(item.no)}
                />
              </Td>
              <Td>{item.no}</Td>
              <Td>{item.paymentDate}</Td>
              <Td>{item.nextPaymentDate}</Td>
              <TdUser onClick={() => handleEdit(item.no)}>{item.user}</TdUser>
              <Td>{item.type}</Td>
              <Td>{item.usagePeriod}</Td>
              <Td>{item.usageCount}</Td>
              <Td>
                <StatusBadge style={getStatusStyle(item.status)}>
                  {item.status}
                </StatusBadge>
              </Td>
            </TableRow>
          );
        })}

        {filteredData.length < 10 &&
          Array.from({ length: 10 - filteredData.length }).map((_, i) => (
            <TableRow key={`empty-${i}`}>
              {Array.from({ length: 9 }).map((__, idx) => (
                <Td key={idx}>&nbsp;</Td>
              ))}
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default TicketTable;

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
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Th = styled.th`
  text-align: center;
  vertical-align: middle;
  background-color: #eeeeee;
  font-weight: 800;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

/** 이용자 컬럼만 파란색 클릭 가능 표시 */
const TdUser = styled(Td)`
  cursor: pointer;
  color: #007bff;
  &:hover {
    text-decoration: underline;
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
  vertical-align: middle;
`;
