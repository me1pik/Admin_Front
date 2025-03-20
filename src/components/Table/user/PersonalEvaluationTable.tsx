// src/components/Table/user/PersonalEvaluationTable.tsx
import React from 'react';
import styled from 'styled-components';

export interface PersonalEvaluationRow {
  item: string; // 평가 항목
  score: number; // 평가 점수 (예: 1 ~ 5)
  comment: string; // 평가 의견
}

interface PersonalEvaluationTableProps {
  data: PersonalEvaluationRow[];
}

const PersonalEvaluationTable: React.FC<PersonalEvaluationTableProps> = ({
  data,
}) => {
  const emptyRowsCount = Math.max(0, 10 - data.length);

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>평가 항목</Th>
            <Th>평가 점수</Th>
            <Th>평가 의견</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.item}</Td>
              <Td>{row.score}</Td>
              <Td>{row.comment}</Td>
            </tr>
          ))}
          {Array.from({ length: emptyRowsCount }).map((_, idx) => (
            <tr key={`empty-${idx}`}>
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

export default PersonalEvaluationTable;

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
