// src/components/ProductTable.tsx
import React from 'react';
import styled, { css } from 'styled-components';

/** 제품 아이템 인터페이스 */
export interface ProductItem {
  no: number;
  styleCode: string;
  brand: string;
  category: string;
  color: string;
  size: string; // 사이즈
  retailPrice: number;
  registerDate: string;
  status: string;
}

/** ProductTable Props */
interface ProductTableProps {
  filteredData: ProductItem[];
  handleEdit: (styleCode: string) => void;
}

// 모든 셀에 공통으로 적용할 ellipsis 스타일
const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductTable: React.FC<ProductTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  // 상태별 배경색
  const getStatusColor = (status: string) => {
    switch (status) {
      case '등록완료':
        return '#4AA361'; // 예: 초록
      case '등록대기':
        return '#3071B2'; // 예: 파랑
      case '판매종료':
        return '#CD5542'; // 예: 빨강
      default:
        return '#6c757d'; // 기타 상태
    }
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: '70px' }} /> {/* No. */}
        <col style={{ width: '100px' }} /> {/* 스타일(행정) */}
        <col style={{ width: '120px' }} /> {/* 브랜드 */}
        <col style={{ width: '100px' }} /> {/* 분류 */}
        <col style={{ width: '80px' }} /> {/* 색상 */}
        <col style={{ width: '120px' }} /> {/* 사이즈 */}
        <col style={{ width: '80px' }} /> {/* 리테일가 */}
        <col style={{ width: '100px' }} /> {/* 등록일 */}
        <col style={{ width: '80px' }} /> {/* 상태 */}
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>스타일(행정)</Th>
          <Th>브랜드</Th>
          <Th>분류</Th>
          <Th>색상</Th>
          <Th>사이즈</Th>
          <Th>리테일가</Th>
          <Th>등록일</Th>
          <Th>상태</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((item, idx) => (
          <TableRow key={idx}>
            <Td>{item.no}</Td>
            <Td onClick={() => handleEdit(item.styleCode)}>
              <StyleCodeText title={item.styleCode}>
                {item.styleCode}
              </StyleCodeText>
            </Td>
            <Td title={item.brand}>{item.brand}</Td>
            <Td title={item.category}>{item.category}</Td>
            <Td title={item.color}>{item.color}</Td>
            <Td title={item.size}>{item.size}</Td>
            <Td title={`${item.retailPrice.toLocaleString()}원`}>
              {item.retailPrice.toLocaleString()}원
            </Td>
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
        {/* 빈 행 렌더링 (10행 맞추기) */}
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

export default ProductTable;

/* ====================== Styled Components ====================== */

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin-bottom: 20px;
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
  ${ellipsis}
`;

const StyleCodeText = styled.span`
  font-size: 12px;
  cursor: pointer;
  color: #007bff;

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
