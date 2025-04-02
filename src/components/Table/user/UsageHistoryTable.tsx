// src/components/Table/user/UsageHistoryTable.tsx
import React from 'react';
import styled from 'styled-components';

/** 스크린샷 예시에 맞춘 UsageHistoryRow 인터페이스 */
export interface UsageHistoryRow {
  no: number; // No.
  applicationDate: string; // 신청일자
  purpose: string; // 이용목적 (대여, 구매 등)
  usagePeriod: string; // 이용기간(합일) (예: "2025-03-04 ~ 2025-03-07 (총4일)")
  brand: string; // 브랜드
  style: string; // 스타일(행정)
  size: string; // 사이즈
  color: string; // 재질/색상
  status: string; // 상태 (배송완료, 배송중, 주문취소, 배송준비중 등)
}

/** 컴포넌트 Props */
interface UsageHistoryTableProps {
  data: UsageHistoryRow[];
}

/**
 * 상태(status)에 따른 배경색과 라벨을 반환
 * 필요에 따라 색상이나 라벨을 수정하세요.
 */
const getStatusStyle = (status: string) => {
  switch (status) {
    case '배송완료':
      return { background: '#4AA361', label: '배송완료' };
    case '배송준비중':
      return { background: '#000000', label: '배송준비중' };
    case '배송중':
      return { background: '#3071B2', label: '배송중' };
    case '주문취소중':
      return { background: '#CD5542', label: '주문취소중' };
    case '주문취소':
      return { background: '#AAAAAA', label: '주문취소' };
    default:
      return { background: '#6c757d', label: status };
  }
};

const UsageHistoryTable: React.FC<UsageHistoryTableProps> = ({ data }) => {
  // 10행 고정을 위해 부족한 행의 개수 계산
  const emptyRowsCount = Math.max(0, 10 - data.length);

  return (
    <TableContainer>
      <StyledTable>
        <colgroup>
          <col style={{ width: '50px' }} /> {/* No. */}
          <col style={{ width: '100px' }} /> {/* 신청일자 */}
          <col style={{ width: '80px' }} /> {/* 이용목적 */}
          <col style={{ width: '180px' }} /> {/* 이용기간(합일) */}
          <col style={{ width: '100px' }} /> {/* 브랜드 */}
          <col style={{ width: '100px' }} /> {/* 스타일(행정) */}
          <col style={{ width: '80px' }} /> {/* 사이즈 */}
          <col style={{ width: '80px' }} /> {/* 재질/색상 */}
          <col style={{ width: '100px' }} /> {/* 상태 */}
        </colgroup>
        <thead>
          <tr>
            <Th>No.</Th>
            <Th>신청일자</Th>
            <Th>이용목적</Th>
            <Th>이용기간(발송일)</Th>
            <Th>브랜드</Th>
            <Th>스타일(코드)</Th>
            <Th>사이즈</Th>
            <Th>재질/색상</Th>
            <Th>상태</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            const styleInfo = getStatusStyle(row.status);
            return (
              <tr key={idx}>
                <Td>{row.no}</Td>
                <Td>{row.applicationDate}</Td>
                <Td>{row.purpose}</Td>
                <Td>{row.usagePeriod}</Td>
                <Td>{row.brand}</Td>
                <Td>{row.style}</Td>
                <Td>{row.size}</Td>
                <Td>{row.color}</Td>
                <Td>
                  <StatusBadge
                    style={{ backgroundColor: styleInfo.background }}
                  >
                    {styleInfo.label}
                  </StatusBadge>
                </Td>
              </tr>
            );
          })}
          {/* 데이터가 10행 미만이면 빈 행 추가 */}
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

export default UsageHistoryTable;

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
