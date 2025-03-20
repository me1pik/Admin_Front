// src/components/Table/user/AdditionalListTable.tsx
import React from 'react';
import styled from 'styled-components';

interface AdditionalListRow {
  item: string; // 항목명
  detail: string; // 세부내용
  status: string; // 상태 (예: 활성/비활성)
}

const dummyAdditionalList: AdditionalListRow[] = [
  {
    item: '추가 항목 1',
    detail: '세부 내용 1',
    status: '활성',
  },
  {
    item: '추가 항목 2',
    detail: '세부 내용 2',
    status: '비활성',
  },
  {
    item: '추가 항목 3',
    detail: '세부 내용 3',
    status: '활성',
  },
  {
    item: '추가 항목 4',
    detail: '세부 내용 4',
    status: '활성',
  },
  {
    item: '추가 항목 5',
    detail: '세부 내용 5',
    status: '비활성',
  },
];

const AdditionalListTable: React.FC = () => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>항목명</Th>
            <Th>세부내용</Th>
            <Th>상태</Th>
          </tr>
        </thead>
        <tbody>
          {dummyAdditionalList.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.item}</Td>
              <Td>{row.detail}</Td>
              <Td>{row.status}</Td>
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
