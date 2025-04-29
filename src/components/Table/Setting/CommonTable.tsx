// src/components/Table/Setting/CommonTable.tsx
import styled from 'styled-components';

export interface BaseTableItem {
  no: number;
  type: string;
  content: string;
  author: string;
  createdAt: string;
}

interface CommonTableProps<T extends BaseTableItem> {
  data: T[];
  onAuthorClick: (author: string, no: number) => void;
}

export function CommonTable<T extends BaseTableItem>({
  data,
  onAuthorClick,
}: CommonTableProps<T>) {
  const emptyRowsCount = Math.max(0, 10 - data.length);
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
        {data.map((item, idx) => (
          <TableRow key={idx}>
            <Td>{item.no}</Td>
            <Td>{item.type}</Td>
            <TdLeft
              onClick={() => onAuthorClick(item.author, item.no)}
              style={{ cursor: 'pointer', color: '#007bff' }}
            >
              {item.content}
            </TdLeft>
            <Td>{item.author}</Td>
            <Td>{item.createdAt}</Td>
          </TableRow>
        ))}
        {Array.from({ length: emptyRowsCount }).map((_, i) => (
          <TableRow key={`empty-${i}`}>
            <Td>&nbsp;</Td>
            <Td>&nbsp;</Td>
            <TdLeft>&nbsp;</TdLeft>
            <Td>&nbsp;</Td>
            <Td>&nbsp;</Td>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

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
  text-align: center;
  vertical-align: middle;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const TdLeft = styled(Td)`
  text-align: left;
  padding-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
