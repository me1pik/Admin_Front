import React, { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaPlus } from 'react-icons/fa';

type Column = { key: string; label: string };
type RowData = Record<string, string>;

export interface SizeGuideSectionProps {
  sizes: Array<{
    size: string;
    measurements: { 어깨: number; 가슴: number; 총장: number };
  }>;
  onSizesChange?: (
    sizes: {
      size: string;
      measurements: { 어깨: number; 가슴: number; 총장: number };
    }[]
  ) => void;
}

const defaultSizes = ['44', '55', '66', '77', 'Free'];

const SizeGuideSection: React.FC<SizeGuideSectionProps> = ({
  sizes,
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
    if (sizes && sizes.length > 0) {
      return sizes.map((item) => ({
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

  useEffect(() => {
    setRows(makeInitialRows());
  }, [sizes]);

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
    onSizesChange?.(
      newRows.map((r) => ({
        size: r.size,
        measurements: {
          어깨: Number(r['어깨']) || 0,
          가슴: Number(r['가슴']) || 0,
          총장: Number(r['허리']) || 0,
        },
      }))
    );
  };

  const handleAddColumn = () => {
    const newKey = `col${Date.now()}`;
    setColumns((prev) => [...prev, { key: newKey, label: '' }]);
    setRows((prev) => prev.map((r) => ({ ...r, [newKey]: '' })));
  };

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

  const handleLabelChange = (
    colIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newLabel = e.target.value;
    setColumns((prev) => {
      const copy = [...prev];
      copy[colIndex] = { ...copy[colIndex], label: newLabel };
      return copy;
    });
  };

  return (
    <SectionBox>
      <Header>
        <Bullet />
        <Title>사이즈 가이드</Title>
        <AddColButton onClick={handleAddColumn}>
          <FaPlus /> 열 추가
        </AddColButton>
      </Header>

      <Line />
      <Table>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <Th key={col.key}>
                <LabelInput
                  value={col.label}
                  placeholder='열 이름'
                  onChange={(e) => handleLabelChange(idx, e)}
                />
                {idx > 0 && (
                  <DelColButton onClick={() => handleDeleteColumn(idx)}>
                    <FaTimes />
                  </DelColButton>
                )}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {columns.map((col) => (
                <Td key={`${rIdx}-${col.key}`}>
                  <CellInput
                    value={row[col.key]}
                    onChange={(e) => handleCellChange(rIdx, col.key, e)}
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

/* styled-components */
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
  left: -27px;
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
  top: 28px;
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
