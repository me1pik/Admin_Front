import React from 'react';
import styled, { css } from 'styled-components';

/** 숫자 사이즈 라벨 매핑 */
const SIZE_LABELS: Record<string, string> = {
  '44': 'S',
  '55': 'M',
  '66': 'L',
  '77': 'XL',
};

/** 제품 아이템 인터페이스 */
export interface ProductItem {
  no: number;
  styleCode: string;
  brand: string;
  category: string;
  color: string;
  size: string; // 사이즈 (예: "SIZE 55 / SIZE 66" 또는 "Free")
  price: number;
  registerDate: string;
  status: string;
}

/** ProductTable Props */
interface ProductTableProps {
  filteredData: ProductItem[];
  handleEdit: (styleCode: string, no: number) => void;
  startNo?: number;
}

// ellipsis 스타일
const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductTable: React.FC<ProductTableProps> = ({
  filteredData,
  handleEdit,
  startNo = 0,
}) => {
  // 상태별 배경색
  const getStatusColor = (status: string) => {
    switch (status) {
      case '등록완료':
        return '#4AA361';
      case '등록대기':
        return '#3071B2';
      case '판매종료':
        return '#CD5542';
      default:
        return '#6c757d';
    }
  };

  // 사이즈 매핑 함수
  const formatSize = (raw: string) => {
    // Free 처리
    if (/free/i.test(raw)) return 'Free';
    // 숫자만 추출
    const parts = raw.match(/\d+/g);
    if (!parts) return raw;
    const mapped = parts.map((num) => {
      const label = SIZE_LABELS[num];
      return label ? `${num}(${label})` : num;
    });
    return mapped.join(' / ');
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: '50px' }} />
        <col style={{ width: '150px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '80px' }} />
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>스타일(품번)</Th>
          <Th>브랜드</Th>
          <Th>분류</Th>
          <Th>색상</Th>
          <Th>사이즈</Th>
          <Th>가격</Th>
          <Th>등록일</Th>
          <Th>상태</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((item, idx) => (
          <TableRow key={idx}>
            <Td>{startNo + idx + 1}</Td>
            <Td onClick={() => handleEdit(item.styleCode, item.no)}>
              <StyleCodeText title={item.styleCode}>
                {item.styleCode}
              </StyleCodeText>
            </Td>
            <Td title={item.brand}>{item.brand}</Td>
            <Td title={item.category}>{item.category}</Td>
            <Td title={item.color}>{item.color}</Td>
            <Td title={item.size}>{formatSize(item.size)}</Td>
            <Td title={`${item.price.toLocaleString()}원`}>
              {item.price.toLocaleString()}원
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

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #ddd;
`;
const TableRow = styled.tr`
  height: 44px;
`;
const Th = styled.th`
  text-align: center;
  vertical-align: middle;
  background-color: #eee;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 12px;
  color: #000;
  border: 1px solid #ddd;
  ${ellipsis}
`;
const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  color: #000;
  border: 1px solid #ddd;
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
  color: #fff;
  text-align: center;
  vertical-align: middle;
  ${ellipsis}
`;
