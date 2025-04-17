import React, { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { ProductDetailResponse } from '../../api/adminProduct';

type Column = { key: string; label: string };
type RowData = Record<string, string>;

export interface SizeGuideSectionProps {
  product: ProductDetailResponse;
  onSizesChange?: (
    sizes: {
      size: string;
      measurements: { 어깨: number; 가슴: number; 총장: number };
    }[]
  ) => void;
}

const defaultSizes = ['44', '55', '66', '77', 'Free'];

const SizeGuideSection: React.FC<SizeGuideSectionProps> = ({
  product,
  onSizesChange,
}) => {
  const initialColumns: Column[] = [
    { key: 'size', label: '사이즈' },
    { key: '어깨', label: 'A(어깨)' },
    { key: '가슴', label: 'B(가슴)' },
    { key: '허리', label: 'C(허리)' },
    { key: '팔길이', label: 'D(팔길이)' },
    { key: '총길이', label: 'E(총길이)' },
  ];

  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [rows, setRows] = useState<RowData[]>([]);

  const makeInitialRows = (): RowData[] => {
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes.map((item) => ({
        size: item.size.toLowerCase().includes('free')
          ? 'Free'
          : item.size.replace(/[^0-9]/g, ''),
        어깨: item.measurements?.어깨?.toString() || '',
        가슴: item.measurements?.가슴?.toString() || '',
        허리: item.measurements?.총장?.toString() || '',
        팔길이: '',
        총길이: '',
      }));
    }
    return defaultSizes.map((sz) => {
      const row: RowData = {};
      initialColumns.forEach((col) => {
        row[col.key] = col.key === 'size' ? sz : '';
      });
      return row;
    });
  };

  // product.sizes 변경 시 rows 동기화
  useEffect(() => {
    setRows(makeInitialRows());
  }, [product.sizes]);

  // 셀 편집 핸들러
  const handleCellChange = (
    rowIndex: number,
    key: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      key === 'size' ? e.target.value.replace(/[^0-9]/g, '') : e.target.value;
    const newRows = rows.map((r, i) =>
      i === rowIndex ? { ...r, [key]: value } : r
    );
    setRows(newRows);

    // 수정된 행을 상위에 전달
    onSizesChange?.(
      newRows.map((r) => ({
        size: r['size'],
        measurements: {
          어깨: Number(r['어깨']) || 0,
          가슴: Number(r['가슴']) || 0,
          총장: Number(r['허리']) || 0,
        },
      }))
    );
  };

  // 열 추가 (사이즈 데이터 변경 아님)
  const handleAddColumn = () => {
    const newKey = `col${Date.now()}`;
    setColumns((prev) => [...prev, { key: newKey, label: '' }]);
    setRows((prev) => prev.map((r) => ({ ...r, [newKey]: '' })));
  };

  // 열 삭제
  const handleDeleteColumn = (colIndex: number) => {
    const keyToRemove = columns[colIndex].key;
    setColumns((prev) => prev.filter((_, i) => i !== colIndex));
    setRows((prev) =>
      prev.map((r) => {
        const { [keyToRemove]: _, ...rest } = r;
        return rest;
      })
    );
  };

  // 헤더 라벨 변경
  const handleLabelChange = (
    colIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newLabel = e.target.value;
    setColumns((prev) => {
      const newCols = [...prev];
      newCols[colIndex] = { ...newCols[colIndex], label: newLabel };
      return newCols;
    });
  };

  return (
    <SectionBox>
      <SectionHeader>
        <Bullet />
        <SectionTitle>사이즈 가이드</SectionTitle>
        <IconButton onClick={handleAddColumn} title='열 추가'>
          <FaPlus /> 열 추가
        </IconButton>
      </SectionHeader>
      <VerticalLine />
      <SizeGuideTable>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <EditableTh key={col.key}>
                <HeaderInput
                  value={col.label}
                  placeholder='열 이름'
                  onChange={(e) => handleLabelChange(idx, e)}
                />
                {idx > 0 && (
                  <DeleteColButton
                    onClick={() => handleDeleteColumn(idx)}
                    title='열 삭제'
                  >
                    <FaTimes />
                  </DeleteColButton>
                )}
              </EditableTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {columns.map((col) => (
                <Td key={`${rIdx}-${col.key}`}>
                  <InputSmall
                    value={row[col.key]}
                    onChange={(e) => handleCellChange(rIdx, col.key, e)}
                  />
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </SizeGuideTable>
    </SectionBox>
  );
};

export default SizeGuideSection;

/* Styled Components */
const SectionBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 20px;
`;
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Bullet = styled.div`
  position: absolute;
  left: -27px;
  top: 0;
  width: 14px;
  height: 14px;
  border: 1px solid #dddddd;
  border-radius: 50%;
  background: #fff;
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    background: #f6ae24;
    border-radius: 50%;
  }
`;
const SectionTitle = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  margin-left: 10px;
`;
const VerticalLine = styled.div`
  position: absolute;
  left: 0;
  top: 14px;
  bottom: 0;
  width: 1px;
  background: #dddddd;
`;
const SizeGuideTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  th,
  td {
    border: 1px solid #ddd;
    text-align: center;
    font-family: 'NanumSquare Neo OTF';
    font-weight: 900;
    font-size: 12px;
    line-height: 13px;
    color: #000;
    padding: 4px;
    position: relative;
  }
  th:first-child,
  td:first-child {
    padding-left: 10px;
  }
`;
const EditableTh = styled.th`
  padding: 0;
`;
const Td = styled.td``;
const InputSmall = styled.input`
  width: 100%;
  height: 28px;
  border: 1px solid #ddd;
  font-size: 12px;
  text-align: center;
`;
const HeaderInput = styled.input`
  width: calc(100% - 24px);
  height: 100%;
  border: none;
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 900;
  font-size: 12px;
  background: transparent;
  &:focus {
    outline: none;
  }
`;
const IconButton = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  margin-left: auto;
  & svg {
    margin-right: 4px;
  }
`;
const DeleteColButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 12px;
`;
