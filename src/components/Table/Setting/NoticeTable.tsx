// src/components/Table/Setting/NoticeTable.tsx
import React from 'react';
import styled from 'styled-components';

export interface NoticeItem {
  no: number;
  type: string;
  content: string;
  author: string;
  createdAt: string;
}

interface NoticeTableProps {
  filteredData: NoticeItem[];
  handleEdit: (author: string, no: number) => void;
}

const NoticeTable: React.FC<NoticeTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  const emptyRowsCount = Math.max(0, 10 - filteredData.length);

  return (
    <Table>
      <colgroup>
        <col style={{ width: '60px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: 'auto' }} />
        <col style={{ width: '120px' }} />
        <col style={{ width: '100px' }} />
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>구분</Th>
          <Th>내용</Th>
          <Th>작성자</Th>
          <Th>등록일</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <TableRow key={item.no}>
            <TdCenter>{item.no}</TdCenter>
            <TdCenter>{item.type}</TdCenter>
            <TdLeft
              onClick={() => handleEdit(item.author, item.no)}
              style={{ cursor: 'pointer', color: '#007bff' }}
            >
              {item.content}
            </TdLeft>
            <TdCenter>{item.author}</TdCenter>
            <TdCenter>{item.createdAt}</TdCenter>
          </TableRow>
        ))}
        {Array.from({ length: emptyRowsCount }).map((_, i) => (
          <TableRow key={`empty-${i}`}>
            <TdCenter>&nbsp;</TdCenter>
            <TdCenter>&nbsp;</TdCenter>
            <TdLeft>&nbsp;</TdLeft>
            <TdCenter>&nbsp;</TdCenter>
            <TdCenter>&nbsp;</TdCenter>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default NoticeTable;

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
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const Td = styled.td`
  vertical-align: middle;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const TdCenter = styled(Td)`
  text-align: center;
`;

const TdLeft = styled(Td)`
  text-align: left;
  padding-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
