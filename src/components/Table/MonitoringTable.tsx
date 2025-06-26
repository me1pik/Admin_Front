// src/components/Table/MonitoringTable.tsx
import React from 'react';
import styled from 'styled-components';

export interface MonitoringItem {
  no: number;
  신청일: string;
  주문자: string;
  대여기간: string;
  브랜드: string;
  종류: string;
  스타일: string;
  색상: string;
  사이즈: string;
  배송상태: string;
}

interface Props {
  filteredData: MonitoringItem[];
  handleEdit: (no: number) => void;
  selectedRows: Set<number>;
  toggleRow: (no: number) => void;
  toggleAll: () => void;
  statuses: string[];
  onSave: (id: number, status: string) => Promise<void>;
}

const MonitoringTable: React.FC<Props> = ({
  filteredData,
  handleEdit,
  selectedRows,
  toggleRow,
  toggleAll,
}) => {
  const getBadgeStyle = (status: string): { bg: string; color: string } => {
    switch (status) {
      case '신청완료':
        return { bg: '#ffb300', color: '#FFFFFF' };
      case '배송준비':
        return { bg: '#000000', color: '#FFFFFF' };
      case '배송중':
        return { bg: '#007bff', color: '#FFFFFF' };
      case '배송완료':
        return { bg: '#4AA361', color: '#FFFFFF' };
      case '배송취소':
        return { bg: '#c02626', color: '#FFFFFF' };
      case '반납중':
        return { bg: '#6c757d', color: '#FFFFFF' };
      case '반납완료':
        return { bg: '#6c757d', color: '#FFFFFF' };
      default:
        return { bg: '#6c757d', color: '#FFFFFF' };
    }
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: '40px' }} />
        <col style={{ width: '50px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '170px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: '120px' }} />
        <col style={{ width: '60px' }} />
        <col style={{ width: '60px' }} />
        <col style={{ width: '60px' }} />
      </colgroup>
      <thead>
        <TableRow>
          <Th>
            <input
              type='checkbox'
              checked={
                filteredData.length > 0 &&
                filteredData.every((i) => selectedRows.has(i.no))
              }
              onChange={toggleAll}
            />
          </Th>
          <Th>번호</Th>
          <Th>신청일</Th>
          <Th>주문자</Th>
          <Th>대여기간</Th>
          <Th>브랜드</Th>
          <Th>종류</Th>
          <Th>스타일(품번)</Th>
          <Th>색상</Th>
          <Th>사이즈</Th>
          <Th>배송상태</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((item) => {
          const badge = getBadgeStyle(item.배송상태);
          return (
            <TableRow key={item.no}>
              <Td>
                <input
                  type='checkbox'
                  checked={selectedRows.has(item.no)}
                  onChange={() => toggleRow(item.no)}
                />
              </Td>
              <Td>{item.no}</Td>
              <Td>{item.신청일}</Td>
              <Td
                onClick={() => handleEdit(item.no)}
                style={{
                  cursor: 'pointer',
                  color: '#007bff',
                  textAlign: 'center',
                }}
              >
                {item.주문자}
              </Td>
              <Td>{item.대여기간}</Td>
              <Td>{item.브랜드}</Td>
              <Td>{item.종류}</Td>
              <Td>{item.스타일}</Td>
              <Td>{item.색상}</Td>
              <Td>{item.사이즈}</Td>
              <Td>
                <StatusBadge
                  style={{ background: badge.bg, color: badge.color }}
                >
                  {item.배송상태}
                </StatusBadge>
              </Td>
            </TableRow>
          );
        })}
        {filteredData.length < 10 &&
          Array.from({ length: 10 - filteredData.length }).map((_, i) => (
            <TableRow key={`empty-${i}`}>
              {Array.from({ length: 11 }).map((_, ci) => (
                <Td key={ci}>&nbsp;</Td>
              ))}
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default MonitoringTable;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid #ddd;
  min-width: 1000px;
`;
const TableRow = styled.tr`
  height: 44px;
`;
const Th = styled.th`
  text-align: center;
  vertical-align: middle;
  background: #eee;
  font-weight: 800;
  font-size: 12px;
  border: 1px solid #ddd;
`;
const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  border: 1px solid #ddd;
`;
const StatusBadge = styled.div`
  display: inline-block;
  border-radius: 4px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  font-size: 10px;
  font-weight: 800;
`;
