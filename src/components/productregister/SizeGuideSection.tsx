// src/components/productregister/SizeGuideSection.tsx
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { SizeRow } from '../../api/adminProduct';

type Column = { key: string; label: string };
type RowData = Record<string, string>; // size와 각 열 키에 대응하는 문자열 값

export interface SizeGuideSectionProps {
  sizes: SizeRow[];
  onSizesChange?: (sizes: SizeRow[]) => void;
}

const defaultSizes = ['44', '55', '66', '77', 'Free'];

const initialColumns: Column[] = [
  { key: 'size', label: '사이즈' },
  { key: '어깨', label: 'A(어깨)' },
  { key: '가슴', label: 'B(가슴)' },
  { key: '허리', label: 'C(허리)' },
  { key: '팔길이', label: 'D(팔길이)' },
  { key: '총길이', label: 'E(총길이)' },
];

const SizeGuideSection: React.FC<SizeGuideSectionProps> = ({
  sizes,
  onSizesChange,
}) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [rows, setRows] = useState<RowData[]>([]);

  // API에서 온 nested measurements를 풀어서 테이블용 RowData로 변환
  const makeInitialRows = useCallback((): RowData[] => {
    let initialRows: RowData[];
    if (sizes && sizes.length > 0) {
      initialRows = sizes.map((item) => {
        const row: RowData = {};
        columns.forEach((col) => {
          if (col.key === 'size') {
            const raw = item.size;
            row.size = /free/i.test(raw) ? 'Free' : raw.replace(/[^0-9]/g, '');
          } else {
            const m = item.measurements?.[col.key] ?? 0;
            row[col.key] = m === 0 ? '' : String(m);
          }
        });
        return row;
      });
    } else {
      initialRows = defaultSizes.map((sz) => {
        const row: RowData = {};
        columns.forEach((col) => {
          row[col.key] = col.key === 'size' ? sz : '';
        });
        return row;
      });
    }
    return initialRows.sort((a, b) => {
      const aval = a.size === 'Free' ? Infinity : Number(a.size);
      const bval = b.size === 'Free' ? Infinity : Number(b.size);
      return aval - bval;
    });
  }, [sizes, columns]);

  useEffect(() => {
    setRows(makeInitialRows());
  }, [makeInitialRows]);

  // RowData 배열을 SizeRow[] (nested measurements)로 변환하여 부모에 전달
  const emitChange = (newRows: RowData[]) => {
    const out: SizeRow[] = newRows.map((r) => {
      const measurements: Record<string, number> = {};
      columns.forEach((col) => {
        if (col.key === 'size') return;
        measurements[col.key] = r[col.key] !== '' ? Number(r[col.key]) : 0;
      });
      return { size: r.size, measurements };
    });
    onSizesChange?.(out);
  };

  const handleCellChange = (
    rowIndex: number,
    key: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const val =
      key === 'size' ? e.target.value.replace(/[^0-9]/g, '') : e.target.value;
    const newRows = rows.map((r, i) =>
      i === rowIndex ? { ...r, [key]: val } : r
    );
    setRows(newRows);
    emitChange(newRows);
  };

  const handleAddColumn = () => {
    const newKey = `col_${Date.now()}`;
    setColumns((cols) => [...cols, { key: newKey, label: '열 이름' }]);
    setRows((rs) => rs.map((r) => ({ ...r, [newKey]: '' })));
  };

  const handleDeleteColumn = (idx: number) => {
    const key = columns[idx].key;
    setColumns((cols) => cols.filter((_, i) => i !== idx));
    setRows((rs) =>
      rs.map((r) => {
        const { [key]: _, ...rest } = r;
        return rest;
      })
    );
  };

  const handleLabelChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
    const lbl = e.target.value;
    setColumns((cols) => {
      const copy = [...cols];
      copy[idx] = { ...copy[idx], label: lbl };
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
                {i > 0 && (
                  <DelColButton
                    type='button'
                    onClick={() => handleDeleteColumn(i)}
                  >
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
  padding-bottom: 10px;
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
  bottom: 112px;
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
    position: relative;
  }
  th:first-child,
  td:first-child {
    padding-left: 10px;
  }
  td:first-child::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    width: 20px;
    height: 1px;
    background: #ddd;
  }
`;

const Th = styled.th`
  padding: 0;
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
