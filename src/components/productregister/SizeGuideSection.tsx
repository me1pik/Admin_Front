// src/components/productregister/SizeGuideSection.tsx
import React, { ChangeEvent, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { SizeRow } from '../../api/adminProduct';
import { sizeGuideConfig } from '../../config/sizeGuideConfig'; // <-- 분리된 매핑 import

interface Column {
  key: string;
  label: string;
}
type RowData = Record<string, string>;

export interface SizeGuideSectionProps {
  category: string;
  sizes: SizeRow[];
  onSizesChange?: (sizes: SizeRow[]) => void;
}

const SizeGuideSection: React.FC<SizeGuideSectionProps> = ({
  category,
  sizes,
  onSizesChange,
}) => {
  const columns: Column[] = useMemo(() => {
    const labels = sizeGuideConfig[category]?.labels ?? {};
    return [
      { key: 'size', label: '사이즈' },
      ...Object.entries(labels).map(([k, v]) => ({ key: k, label: v })),
    ];
  }, [category]);

  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    const newRows = sizes.map((item) => {
      const row: RowData = { size: item.size };
      columns.forEach((col) => {
        if (col.key === 'size') return;
        const mKey = Object.keys(item.measurements).find((k) =>
          k.startsWith(col.key + ' ')
        );
        const rawKey = mKey ?? col.key;
        const val = item.measurements[rawKey];
        row[col.key] = val != null && val !== 0 ? String(val) : '';
      });
      return row;
    });
    setRows(newRows);
  }, [sizes, columns]);

  const handleCellChange = (ri: number, key: string, value: string) => {
    const updatedRows = rows.map((r, i) =>
      i === ri ? { ...r, [key]: value } : r
    );
    setRows(updatedRows);
    onSizesChange?.(
      updatedRows.map((r) => ({
        size: r.size,
        measurements: Object.entries(r).reduce<Record<string, number>>(
          (acc, [k, v]) => {
            if (k !== 'size') acc[k] = v ? Number(v) : 0;
            return acc;
          },
          {}
        ),
      }))
    );
  };

  return (
    <SectionBox>
      <Header>
        <Bullet />
        <Title>사이즈 가이드</Title>
      </Header>
      <Line />
      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <Th key={col.key}>
                <LabelInput value={col.label} readOnly />
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleCellChange(ri, col.key, e.target.value)
                    }
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

/* ---- styled-components ---- */
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
  width: 100%;
  border: none;
  text-align: center;
  font-weight: 900;
  font-size: 12px;
  background: transparent;
  &:focus {
    outline: none;
  }
`;
const Td = styled.td``;
const CellInput = styled.input`
  width: 50px;
  height: 28px;
  border: 1px solid #ddd;
  font-size: 12px;
  text-align: center;
`;
