// src/components/productregister/SizeGuideSection.tsx
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { SizeRow } from '../../api/adminProduct';

type Column = { key: string; label: string };
type RowData = Record<string, string>;

export interface SizeGuideSectionProps {
  sizes: SizeRow[];
  onSizesChange?: (sizes: SizeRow[]) => void;
}

const defaultSizes = ['44', '55', '66', '77', 'Free'];

const SizeGuideSection: React.FC<SizeGuideSectionProps> = ({
  sizes,
  onSizesChange,
}) => {
  const [columns, setColumns] = useState<Column[]>([
    { key: 'size', label: '사이즈' },
  ]);
  const [rows, setRows] = useState<RowData[]>([]);

  // 1) sizes 전체에서 모든 measurement 키를 모아 헤더 구성 (라벨 알파벳 순 정렬)
  useEffect(() => {
    if (sizes && sizes.length > 0) {
      const allKeys = Array.from(
        new Set(sizes.flatMap((item) => Object.keys(item.measurements)))
      );
      // 측정값 컬럼 생성
      const measureCols: Column[] = allKeys.map((k) => ({ key: k, label: k }));
      // 라벨 기준 정렬
      measureCols.sort((a, b) => a.label.localeCompare(b.label));
      setColumns([{ key: 'size', label: '사이즈' }, ...measureCols]);
    } else {
      setColumns([{ key: 'size', label: '사이즈' }]);
    }
  }, [sizes]);

  // 2) rows 생성
  const makeInitialRows = useCallback((): RowData[] => {
    if (sizes.length > 0) {
      return sizes
        .map((item) => {
          const row: RowData = {};
          columns.forEach((col) => {
            if (col.key === 'size') {
              row.size = /free/i.test(item.size)
                ? 'Free'
                : item.size.replace(/[^0-9]/g, '');
            } else {
              const v = item.measurements[col.key] ?? 0;
              row[col.key] = v === 0 ? '' : String(v);
            }
          });
          return row;
        })
        .sort((a, b) => {
          const na = a.size === 'Free' ? Infinity : Number(a.size);
          const nb = b.size === 'Free' ? Infinity : Number(b.size);
          return na - nb;
        });
    } else {
      return defaultSizes.map((sz) => {
        const row: RowData = {};
        columns.forEach((col) => {
          row[col.key] = col.key === 'size' ? sz : '';
        });
        return row;
      });
    }
  }, [sizes, columns]);

  useEffect(() => {
    setRows(makeInitialRows());
  }, [makeInitialRows]);

  // 3) 변경 내역 전달
  const emitChange = (newRows: RowData[]) => {
    const out: SizeRow[] = newRows.map((r) => {
      const measurements: Record<string, number> = {};
      columns.forEach((col) => {
        if (col.key !== 'size') {
          measurements[col.key] = r[col.key] !== '' ? Number(r[col.key]) : 0;
        }
      });
      return { size: r.size, measurements };
    });
    onSizesChange?.(out);
  };

  // 4) 셀 변경 핸들러
  const handleCellChange = (
    rowIndex: number,
    key: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const val =
      key === 'size' ? e.target.value.replace(/[^0-9]/g, '') : e.target.value;
    const next = rows.map((r, i) =>
      i === rowIndex ? { ...r, [key]: val } : r
    );
    setRows(next);
    emitChange(next);
  };

  // (옵션) 컬럼 추가/삭제/레이블 변경 (사용자 커스텀 컬럼도 정렬 대상에 포함하려면, 여기에 정렬 로직 추가)
  const handleAddColumn = () => {
    const newKey = `col_${Date.now()}`;
    setColumns((c) => [...c, { key: newKey, label: '열 이름' }]);
    setRows((rs) => rs.map((r) => ({ ...r, [newKey]: '' })));
  };
  const handleDeleteColumn = (idx: number) => {
    const delKey = columns[idx].key;
    setColumns((c) => c.filter((_, i) => i !== idx));
    setRows((rs) =>
      rs.map((r) => {
        const { [delKey]: _, ...rest } = r;
        return rest;
      })
    );
  };
  const handleLabelChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    setColumns((c) => {
      const copy = [...c];
      copy[idx] = { ...copy[idx], label };
      return copy;
    });
  };

  return (
    <SectionBox>
      <Header>
        <Bullet />
        <Title>사이즈 가이드</Title>
        <AddColButton type='button' onClick={handleAddColumn}>
          <FaPlus /> 열 추가
        </AddColButton>
      </Header>
      <Line />
      <Table>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <Th key={col.key}>
                <LabelInput
                  value={col.label}
                  onChange={(e) => handleLabelChange(i, e)}
                />
                {col.key !== 'size' && (
                  <DelColButton onClick={() => handleDeleteColumn(i)}>
                    <FaTimes />
                  </DelColButton>
                )}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {columns.map((col) => (
                <Td key={`${ri}-${col.key}`}>
                  <CellInput
                    value={row[col.key] || ''}
                    onChange={(e) => handleCellChange(ri, col.key, e)}
                  />
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </SectionBox>
  );
};

export default SizeGuideSection;

// styled-components
const SectionBox = styled.div`
  position: relative;
  padding-left: 20px;
  margin-bottom: 20px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Bullet = styled.div`
  position: absolute;
  left: -7px;
  top: 0;
  width: 14px;
  height: 14px;
  border: 1px solid #ddd;
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
const Title = styled.div`
  font-weight: 800;
  font-size: 14px;
  margin-left: 10px;
`;
const AddColButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  & svg {
    margin-right: 4px;
  }
`;
const Line = styled.div`
  position: absolute;
  left: 0;
  top: 15px;
  bottom: 0;
  width: 1px;
  background: #ddd;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  th,
  td {
    border: 1px solid #ddd;
    text-align: center;
    padding: 4px;
    font-size: 12px;
  }
`;
const Th = styled.th`
  padding: 0;
  position: relative;
`;
const LabelInput = styled.input`
  width: calc(100% - 24px);
  border: none;
  text-align: center;
  font-weight: 900;
  font-size: 12px;
  background: transparent;
  &:focus {
    outline: none;
  }
`;
const DelColButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: none;
  border: none;
  cursor: pointer;
`;
const Td = styled.td``;
const CellInput = styled.input`
  width: 50px;
  height: 28px;
  border: 1px solid #ddd;
  font-size: 12px;
  text-align: center;
`;
