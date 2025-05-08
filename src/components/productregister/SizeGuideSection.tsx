// src/components/productregister/SizeGuideSection.tsx
import React, { ChangeEvent, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { SizeRow } from '../../api/adminProduct';
import { sizeGuideConfig } from '../../config/sizeGuideConfig';

interface Column {
  key: string;
  label: string;
}
type RowData = Record<string, string>;

export interface SizeGuideSectionProps {
  category: string;
  sizes: SizeRow[];
  onSizesChange?: (sizes: SizeRow[]) => void;
  /** 변경된 라벨을 부모로 전달 */
  onLabelChange?: (labels: Record<string, string>) => void;
}

const SizeGuideSection: React.FC<SizeGuideSectionProps> = ({
  category,
  sizes,
  onSizesChange,
  onLabelChange,
}) => {
  // 1) config에서 초기 라벨 맵 가져오기
  const initialLabels = useMemo(
    () => sizeGuideConfig[category]?.labels ?? {},
    [category]
  );

  // 2) 로컬 상태로 라벨 관리
  const [labelMap, setLabelMap] =
    useState<Record<string, string>>(initialLabels);

  // category 변경 시 라벨 초기화
  useEffect(() => {
    setLabelMap(initialLabels);
  }, [initialLabels]);

  // 라벨 변경 시 상위로 전달
  useEffect(() => {
    onLabelChange?.(labelMap);
  }, [labelMap, onLabelChange]);

  // 3) 컬럼 정의 (size는 고정, 나머지는 labelMap 기반)
  const columns: Column[] = useMemo(() => {
    return [
      { key: 'size', label: '사이즈' },
      ...Object.entries(labelMap).map(([k, v]) => ({ key: k, label: v })),
    ];
  }, [labelMap]);

  // 4) 로우 데이터 변환 (기존 로직)
  const [rows, setRows] = useState<RowData[]>([]);
  useEffect(() => {
    const newRows = sizes.map((item) => {
      const row: RowData = { size: item.size };
      Object.keys(labelMap).forEach((k) => {
        // measurements 키 중 "A 어깨" 같은 경우 매칭
        const mKey = Object.keys(item.measurements).find((mk) =>
          mk.startsWith(k + ' ')
        );
        const rawKey = mKey ?? k;
        const val = item.measurements[rawKey];
        row[k] = val != null && val !== 0 ? String(val) : '';
      });
      return row;
    });
    setRows(newRows);
  }, [sizes, labelMap]);

  // 5) 셀 변경 핸들러 (기존 로직)
  const handleCellChange = (ri: number, key: string, value: string) => {
    const updated = rows.map((r, i) => (i === ri ? { ...r, [key]: value } : r));
    setRows(updated);
    onSizesChange?.(
      updated.map((r) => ({
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

  // 6) 헤더 라벨 직접 수정 핸들러
  const handleLabelInput = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    const next = { ...labelMap, [key]: e.target.value };
    setLabelMap(next);
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
                {col.key === 'size' ? (
                  <LabelStatic>{col.label}</LabelStatic>
                ) : (
                  <LabelInput
                    value={col.label}
                    onChange={(e) => handleLabelInput(col.key, e)}
                  />
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
                  {col.key === 'size' ? (
                    <CellStatic>{row.size}</CellStatic>
                  ) : (
                    <CellInput
                      value={row[col.key] || ''}
                      onChange={(e) =>
                        handleCellChange(ri, col.key, e.target.value)
                      }
                    />
                  )}
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
/* 수정 가능 라벨 */
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
/* 고정 라벨(사이즈) */
const LabelStatic = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 900;
  font-size: 12px;
`;
const Td = styled.td``;
/* 사이즈 셀 고정 텍스트 */
const CellStatic = styled.div`
  font-size: 12px;
  line-height: 28px;
`;
/* 측정값 입력 */
const CellInput = styled.input`
  width: 50px;
  height: 28px;
  border: 1px solid #ddd;
  font-size: 12px;
  text-align: center;
`;
