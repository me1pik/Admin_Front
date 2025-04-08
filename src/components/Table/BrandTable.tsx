import React from 'react';
import styled, { css } from 'styled-components';

/** 제품 아이템 인터페이스 */
export interface BrandItem {
  no: number;
  group: string; // 그룹사(대/중/소)
  brand: string; // 브랜드
  quantity: number; // 제품수
  discount: number; // 할인율 (예: 20 -> "20%")
  manager: string; // 담당자
  contact: string; // 연락처
  registerDate: string; // 등록일
  status: string; // 상태
}

/** BrandTable Props */
interface BrandTableProps {
  filteredData: BrandItem[];
  /** handleEdit: 행 클릭 시 no값만 넘겨 받도록 변경 */
  handleEdit: (no: number) => void;
}

// 모든 셀에 공통으로 적용할 ellipsis 스타일
const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BrandTable: React.FC<BrandTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  // 상태별 배경색 반환 함수
  const getStatusColor = (status: string) => {
    switch (status) {
      case '등록완료':
        return '#4AA361'; // 초록
      case '등록대기':
        return '#3071B2'; // 파랑
      case '계약종료':
        return '#CD5542'; // 주황/빨강
      default:
        return '#6c757d'; // 회색
    }
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: '60px' }} /> {/* No. */}
        <col style={{ width: '150px' }} /> {/* 그룹사(대/중/소) */}
        <col style={{ width: '100px' }} /> {/* 브랜드 */}
        <col style={{ width: '80px' }} /> {/* 제품수 */}
        <col style={{ width: '80px' }} /> {/* 할인율 */}
        <col style={{ width: '120px' }} /> {/* 담당자 */}
        <col style={{ width: '120px' }} /> {/* 연락처 */}
        <col style={{ width: '100px' }} /> {/* 등록일 */}
        <col style={{ width: '80px' }} /> {/* 상태 */}
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>그룹사</Th>
          <Th>브랜드</Th>
          <Th>제품수</Th>
          <Th>할인율</Th>
          <Th>담당자</Th>
          <Th>연락처</Th>
          <Th>등록일</Th>
          <Th>상태</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((item, idx) => (
          <TableRow key={idx}>
            <Td>{item.no}</Td>
            {/* 행 클릭 시 handleEdit 호출 */}
            <Td onClick={() => handleEdit(item.no)}>
              <SpanLink title={item.group}>{item.group}</SpanLink>
            </Td>
            <Td title={item.brand}>{item.brand}</Td>
            <Td title={String(item.quantity)}>{item.quantity}</Td>
            <Td title={`${item.discount}%`}>{item.discount}%</Td>
            <Td title={item.manager}>{item.manager}</Td>
            <Td title={item.contact}>{item.contact}</Td>
            <Td title={item.registerDate}>{item.registerDate}</Td>
            <Td>
              <StatusBadge
                title={item.status}
                style={{ backgroundColor: getStatusColor(item.status) }}
              >
                {item.status}
              </StatusBadge>
            </Td>
          </TableRow>
        ))}
        {filteredData.length < 10 &&
          Array.from({ length: 10 - filteredData.length }).map((_, i) => (
            <TableRow key={`empty-${i}`}>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default BrandTable;

/* ====================== Styled Components ====================== */

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #ffffff;
  border: 1px solid #dddddd;
`;

const TableRow = styled.tr`
  height: 44px;
  &:hover {
    background: #fafafa;
  }
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
  ${ellipsis}
`;

const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  cursor: default;
  ${ellipsis}
`;

const SpanLink = styled.span`
  font-size: 12px;
  color: #007bff;
  cursor: pointer;
  &:hover {
    color: #0056b3;
  }
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
  ${ellipsis}
`;
