// src/components/productregister/SizeGuideSection.tsx
import React, { ChangeEvent, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { SizeRow } from '../../api/adminProduct';
import { sizeGuideConfig } from '../../config/sizeGuideConfig';
// SVG 아이콘을 import (Webpack 또는 CRA 기준)
import BulletIcon from '../../assets/BulletIcon.svg';

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
  //
  // 1) config에서 초기 라벨 맵 가져오기
  //
  const initialLabels = useMemo(
    () => sizeGuideConfig[category]?.labels ?? {},
    [category]
  );

  // 2) 로컬 상태로 라벨 관리 (읽기 전용)
  const [labelMap, setLabelMap] =
    useState<Record<string, string>>(initialLabels);

  // 카테고리가 바뀔 때마다 라벨 초기화
  useEffect(() => {
    setLabelMap(initialLabels);
  }, [initialLabels]);

  // 라벨 변경 시 상위로 전달
  useEffect(() => {
    onLabelChange?.(labelMap);
  }, [labelMap, onLabelChange]);

  //
  // 3) 컬럼 정의 (첫 번째는 빈 헤더, 나머지는 labelMap 기반)
  //
  const columns: Column[] = useMemo(() => {
    return [
      { key: 'size', label: '' },
      ...Object.entries(labelMap).map(([k, v]) => ({ key: k, label: v })),
    ];
  }, [labelMap]);

  //
  // 4) “44 → 55 → 66 → 77 → Free” 순서로 정렬된 rows 상태 생성
  //
  const [rows, setRows] = useState<RowData[]>([]);
  useEffect(() => {
    // 우선순위에 따른 사이즈 순서
    const sizeOrder = ['44', '55', '66', '77', 'Free'];

    // sizes 배열을 복사한 뒤, sizeOrder에 따라 정렬
    const sortedSizes: SizeRow[] = [...sizes].sort((a, b) => {
      const ia = sizeOrder.indexOf(a.size);
      const ib = sizeOrder.indexOf(b.size);
      // 만약 둘 중 하나가 순서 배열에 없다면, 뒤로 보내도록 Infinity 처리
      const rankA = ia === -1 ? Infinity : ia;
      const rankB = ib === -1 ? Infinity : ib;
      return rankA - rankB;
    });

    // 정렬된 순서대로 rows 객체 생성
    const newRows = sortedSizes.map((item) => {
      const row: RowData = { size: item.size };
      Object.keys(labelMap).forEach((k) => {
        // measurement 키는 "A 어깨넓이" 등으로 시작한다고 가정
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

  //
  // 5) 셀 변경 핸들러
  //
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

  //
  // 6) 사이즈를 “44(S)”, “55(M)” 등으로 포맷팅
  //
  const formatSizeLabel = (size: string) => {
    switch (size) {
      case '44':
        return '44(S)';
      case '55':
        return '55(M)';
      case '66':
        return '66(L)';
      case '77':
        return '77(XL)';
      case 'Free':
      case 'free':
      case 'FREE':
        return 'Free(F)';
      default:
        return size;
    }
  };

  return (
    <SectionBox>
      {/* ──────────────────────────────────────────────────────── */}
      <Header>
        {/* BulletIcon으로 대체 */}
        <BulletIconImage src={BulletIcon} alt='Bullet Icon' />
        <Title>사이즈 가이드</Title>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              {columns.map((col) => (
                <Th key={col.key}>
                  <HeaderStatic>{col.label}</HeaderStatic>
                </Th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, ri) => (
              <Tr key={ri} even={ri % 2 === 1}>
                {columns.map((col) => (
                  <Td key={`${ri}-${col.key}`}>
                    {col.key === 'size' ? (
                      <CellSize>{formatSizeLabel(row.size)}</CellSize>
                    ) : (
                      <CellInput
                        value={row[col.key] || ''}
                        placeholder='-'
                        onChange={(e) =>
                          handleCellChange(ri, col.key, e.target.value)
                        }
                      />
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </SectionBox>
  );
};

export default SizeGuideSection;

/* ===== Styled Components ===== */
const SectionBox = styled.div`
  position: relative;
  padding-bottom: 20px;
  margin-bottom: 30px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

// 기존 Bullet 대신 img 태그 스타일링
const BulletIconImage = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 8px;
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 14px;
`;

const TableContainer = styled.div`
  margin-top: 10px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;

  th,
  td {
    text-align: center;
    padding: 6px 8px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

const Th = styled.th`
  background: #f9f9f9;
  position: sticky;
  top: 0;
  z-index: 2;
  font-weight: 700;
`;

const HeaderStatic = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  color: #333;
`;

const Tr = styled.tr<{ even: boolean }>`
  background: ${({ even }) => (even ? '#fafafa' : 'transparent')};
`;

const Td = styled.td``;

const CellSize = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #000;
`;

const CellInput = styled.input`
  width: 60px;
  height: 28px;
  border: 1px solid #ddd;
  font-size: 12px;
  text-align: center;

  &:focus {
    outline: 2px solid #f6ae24;
  }

  &::placeholder {
    color: #bbb;
  }
`;
