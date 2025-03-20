// src/components/Table/user/PersonalEvaluationTable.tsx
import React from 'react';
import styled from 'styled-components';

interface PersonalEvaluationRow {
  item: string; // 평가 항목
  score: number; // 평가 점수 (예: 1 ~ 5)
  comment: string; // 평가 의견
}

const dummyEvaluations: PersonalEvaluationRow[] = [
  {
    item: '서비스 품질',
    score: 4,
    comment: '전반적으로 만족합니다.',
  },
  {
    item: '배송 속도',
    score: 5,
    comment: '매우 빠릅니다!',
  },
  {
    item: '고객 지원',
    score: 3,
    comment: '개선의 여지가 있습니다.',
  },
  {
    item: '가격 만족도',
    score: 4,
    comment: '가격 대비 좋은 품질입니다.',
  },
  {
    item: '재구매 의사',
    score: 5,
    comment: '반드시 재구매할 예정입니다.',
  },
];

const PersonalEvaluationTable: React.FC = () => {
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
          {dummyEvaluations.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.item}</Td>
              <Td>{row.score}</Td>
              <Td>{row.comment}</Td>
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
