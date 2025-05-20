// src/components/Table/ProductTable.tsx
import React from 'react';
import styled, { css } from 'styled-components';

/** 인라인 색상 옵션 — 분리 컴포넌트 없이 */
const colorOptions = [
  { label: '전체색상', value: '' },
  { label: '화이트', value: 'WHITE' },
  { label: '블랙', value: 'BLACK' },
  { label: '그레이', value: 'GRAY' },
  { label: '네이비', value: 'NAVY' },
  { label: '아이보리', value: 'IVORY' },
  { label: '베이지', value: 'BEIGE' },
  { label: '브라운', value: 'BROWN' },
  { label: '카키', value: 'KHAKI' },
  { label: '그린', value: 'GREEN' },
  { label: '블루', value: 'BLUE' },
  { label: '퍼플', value: 'PURPLE' },
  { label: '버건디', value: 'BURGUNDY' },
  { label: '레드', value: 'RED' },
  { label: '핑크', value: 'PINK' },
  { label: '옐로우', value: 'YELLOW' },
  { label: '오렌지', value: 'ORANGE' },
  { label: '마젠타', value: 'MAGENTA' },
  { label: '민트', value: 'MINT' },
] as const;

const SIZE_LABELS: Record<string, string> = {
  '44': 'S',
  '55': 'M',
  '66': 'L',
  '77': 'XL',
};

export interface ProductItem {
  no: number;
  styleCode: string;
  brand: string;
  category: string;
  color: string;
  size: string;
  price: number;
  registerDate: string;
  status: string;
}

interface ProductTableProps {
  filteredData: ProductItem[];
  handleEdit: (styleCode: string, no: number) => void;
  startNo?: number;
  selectedRows: Set<number>;
  toggleRow: (no: number) => void;
  toggleAll: () => void;
}

const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductTable: React.FC<ProductTableProps> = ({
  filteredData,
  handleEdit,
  startNo = 0,
  selectedRows,
  toggleRow,
  toggleAll,
}) => {
  const allSelected =
    filteredData.length > 0 && selectedRows.size === filteredData.length;

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

  const formatSize = (raw: string) => {
    if (/free/i.test(raw)) return 'Free';
    const parts = raw.match(/\d+/g);
    if (!parts) return raw;
    return parts
      .map((num) => {
        const label = SIZE_LABELS[num];
        return label ? `${num}(${label})` : num;
      })
      .join(' / ');
  };

  const getColorLabel = (value: string) =>
    colorOptions.find((o) => o.value === value)?.label || value;

  return (
    <Table>
      <colgroup>
        <col style={{ width: '40px' }} />
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
          <ThCheckbox>
            <input type='checkbox' checked={allSelected} onChange={toggleAll} />
          </ThCheckbox>
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
          <TableRow key={item.no}>
            <TdCheckbox>
              <input
                type='checkbox'
                checked={selectedRows.has(item.no)}
                onChange={() => toggleRow(item.no)}
              />
            </TdCheckbox>
            <Td>{startNo + idx + 1}</Td>
            <Td onClick={() => handleEdit(item.styleCode, item.no)}>
              <StyleCodeText title={item.styleCode}>
                {item.styleCode}
              </StyleCodeText>
            </Td>
            <Td title={item.brand}>{item.brand}</Td>
            <Td title={item.category}>{item.category}</Td>
            <Td title={item.color}>{getColorLabel(item.color)}</Td>
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
              {Array.from({ length: 10 }).map((_, j) => (
                <Td key={j}>&nbsp;</Td>
              ))}
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;

/* Styled Components */
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

  font-weight: 800;
  font-size: 12px;
  color: #000;
  border: 1px solid #ddd;
  ${ellipsis}
`;
const ThCheckbox = styled.th`
  text-align: center;
  vertical-align: middle;
  background-color: #eee;
  border: 1px solid #ddd;
`;
const Td = styled.td`
  text-align: center;
  vertical-align: middle;

  font-weight: 400;
  font-size: 12px;
  color: #000;
  border: 1px solid #ddd;
  ${ellipsis}
`;
const TdCheckbox = styled.td`
  text-align: center;
  vertical-align: middle;
  border: 1px solid #ddd;
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
