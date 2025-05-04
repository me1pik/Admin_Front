// src/components/Table/admin/TaskHistoryTable.tsx
import React from 'react';
import styled from 'styled-components';

/**
 * 스크린샷에 맞춰 컬럼 구성
 *  - 작업일자 (workDate)
 *  - 작업내용 (workContent)
 *  - 변경일시 (changedAt)
 */
export interface TaskHistoryRow {
  workDate: string; // 예: "서비스 > 제품목록 관리"
  workContent: string; // 예: "변경전 작업내용... 관리자 내 상세..."
  changedAt: string; // 예: "2025-03-02 00:00:00"
}

interface TaskHistoryTableProps {
  data: TaskHistoryRow[];
}

const TaskHistoryTable: React.FC<TaskHistoryTableProps> = ({ data }) => {
  // 10행 고정을 위해 부족한 행의 개수를 계산
  const emptyRowsCount = Math.max(0, 10 - data.length);

  return (
    <TableContainer>
      <StyledTable>
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '60%' }} />
          <col style={{ width: '20%' }} />
        </colgroup>
        <thead>
          <tr>
            <Th>작업일자</Th>
            <Th>작업내용</Th>
            <Th>변경일시</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <Td title={row.workDate}>{row.workDate}</Td>
              <Td title={row.workContent}>{row.workContent}</Td>
              <Td title={row.changedAt}>{row.changedAt}</Td>
            </tr>
          ))}
          {/* 데이터가 10행 미만이면 빈 행 추가 */}
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

export default TaskHistoryTable;

/* ====================== Styled Components ====================== */

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
  text-align: justify;
  padding: 0 20px;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
