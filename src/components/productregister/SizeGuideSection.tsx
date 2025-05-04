import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';
import { SizeRow } from '../../api/adminProduct';

type Column = { key: string; label: string };
type RowData = Record<string, string>;

export interface SizeGuideSectionProps {
  sizes: SizeRow[];
  onSizesChange?: (sizes: SizeRow[]) => void;
}

// 44->S, 55->M, 66->L, 77->XL 매핑
const SIZE_LABELS: Record<string, string> = {
  '44': 'S',
  '55': 'M',
  '66': 'L',
  '77': 'XL',
};

const defaultSizes = ['44', '55', '66', '77', 'Free'];

const SizeGuideSection: React.FC<SizeGuideSectionProps> = ({
  sizes,
  onSizesChange,
}) => {
  const [columns, setColumns] = useState<Column[]>([
    { key: 'size', label: '사이즈' },
  ]);
  const [rows, setRows] = useState<RowData[]>([]);

  // 사이즈 문자열에 라벨을 붙여 포맷
  const formatSizeValue = (raw: string) => {
    if (/free/i.test(raw)) return 'Free';
    const num = raw.replace(/[^0-9]/g, '');
    const label = SIZE_LABELS[num];
    return label ? `${num}(${label})` : num;
  };

  // 1) sizes 전체에서 모든 measurement 키를 모아 헤더 구성 (라벨 알파벳 순 정렬)
  useEffect(() => {
    if (sizes && sizes.length > 0) {
      const allKeys = Array.from(
        new Set(sizes.flatMap((item) => Object.keys(item.measurements)))
      );
      const measureCols: Column[] = allKeys.map((k) => ({ key: k, label: k }));
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
              row.size = formatSizeValue(item.size);
            } else {
              const v = item.measurements[col.key] ?? 0;
              row[col.key] = v === 0 ? '' : String(v);
            }
          });
          return row;
        })
        .sort((a, b) => {
          const na =
            a.size === 'Free' ? Infinity : Number(a.size.replace(/\D/g, ''));
          const nb =
            b.size === 'Free' ? Infinity : Number(b.size.replace(/\D/g, ''));
          return na - nb;
        });
    } else {
      return defaultSizes.map((sz) => {
        const row: RowData = {};
        columns.forEach((col) => {
          if (col.key === 'size') row.size = formatSizeValue(sz);
          else row[col.key] = '';
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
      // size column에서 숫자만 추출하여 SizeRow 타입에 맞춤
      const rawSize = r.size;
      const sizeOnly = /free/i.test(rawSize)
        ? 'Free'
        : rawSize.replace(/\D/g, '');
      return { size: sizeOnly, measurements };
    });
    onSizesChange?.(out);
  };

  // 4) 셀 변경 핸들러
  const handleCellChange = (
    rowIndex: number,
    key: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    const next = rows.map((r, i) =>
      i === rowIndex ? { ...r, [key]: val } : r
    );
    setRows(next);
    emitChange(next);
  };

  // (열 추가/삭제 기능 제거)

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
