// src/components/Table/user/PersonalEvaluationTable.tsx
import React from 'react';
import styled from 'styled-components';

/** 기존 item, score, comment 대신
 *  스크린샷과 동일한 컬럼 구조로 변경합니다.
 */
export interface PersonalEvaluationRow {
  no: number; // No.
  usageType: string; // 이용형태
  productNumber: string; // 제품번호
  serviceQuality: string; // 서비스 품질
  usagePeriod: string; // 이용 기간
  brand: string; // 브랜드
  style: string; // 스타일 (품번)
  size: string; // 사이즈
  color: string; // 제품색상
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
            <Th>No.</Th>
            <Th>이용형태</Th>
            <Th>제품상태</Th>
            <Th>서비스 품질</Th>
            <Th>이용 기간</Th>
            <Th>브랜드</Th>
            <Th>스타일 (품번)</Th>
            <Th>사이즈</Th>
            <Th>제품색상</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <Td>{row.no}</Td>
              <Td>{row.usageType}</Td>
              <Td>{row.productNumber}</Td>
              <Td>{row.serviceQuality}</Td>
              <Td>{row.usagePeriod}</Td>
              <Td>{row.brand}</Td>
              <Td>{row.style}</Td>
              <Td>{row.size}</Td>
              <Td>{row.color}</Td>
            </tr>
          ))}
          {Array.from({ length: emptyRowsCount }).map((_, idx) => (
            <tr key={`empty-${idx}`}>
              <Td />
              <Td />
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
