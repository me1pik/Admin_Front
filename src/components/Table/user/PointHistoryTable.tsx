// src/components/Table/user/PointHistoryTable.tsx
import React from 'react';
import styled from 'styled-components';

interface PointHistoryRow {
  date: string; // 포인트 날짜
  description: string; // 내역
  points: string; // 포인트 변화 (적립 또는 사용)
}

const dummyPointHistory: PointHistoryRow[] = [
  {
    date: '2025-03-01',
    description: '구매 적립',
    points: '+50',
  },
  {
    date: '2025-02-28',
    description: '포인트 사용',
    points: '-30',
  },
  {
    date: '2025-02-25',
    description: '이벤트 보상',
    points: '+20',
  },
  {
    date: '2025-02-20',
    description: '구매 적립',
    points: '+40',
  },
  {
    date: '2025-02-15',
    description: '포인트 사용',
    points: '-10',
  },
];

const PointHistoryTable: React.FC = () => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>포인트 날짜</Th>
            <Th>내역</Th>
            <Th>포인트 변화</Th>
          </tr>
        </thead>
        <tbody>
          {dummyPointHistory.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.date}</Td>
              <Td>{row.description}</Td>
              <Td>{row.points}</Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default PointHistoryTable;

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
