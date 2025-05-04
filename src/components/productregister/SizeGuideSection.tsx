// src/components/productregister/SizeGuideSection.tsx
import React, { ChangeEvent, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { SizeRow } from '../../api/adminProduct';

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

// 카테고리별 이미지·라벨 매핑
const sizeGuideConfig: Record<
  string,
  { image: string; labels: Record<string, string> }
> = {
  Entire: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  Top: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  Tshirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/25db6b65a4c2eccbe1ea546026389427.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Blouse: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  KnitTop: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/25db6b65a4c2eccbe1ea546026389427.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  ShirtTop: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  MiniSkirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/4a3564bd7e1095a189083bb62916349a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.밑단둘레',
      D: 'D.총길이',
    },
  },
  MidiSkirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/4a3564bd7e1095a189083bb62916349a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.밑단둘레',
      D: 'D.총길이',
    },
  },
  LongSkirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/4a3564bd7e1095a189083bb62916349a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.밑단둘레',
      D: 'D.총길이',
    },
  },
  Pants: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/59c6a4e2fb13d263e2799ab338f8674a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.허벅지둘레',
      D: 'D.밑위길이',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  MiniDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  MidiDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  LongDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  TowDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  JumpSuit: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/5ded97cf03063ebe34316355b36a419c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.총길이',
    },
  },
  Best: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/356a561aa2641c9a99a5fa22196a60fb.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Cardigan: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/88bf095e82d97c3fa1fbc85dea6fb58b.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Jacket: {
    image:
      'https://www.daehyuninside.com/_skin/daehyun_250205/img/etc/OUTER3.jpg',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.암홀',
      F: 'F.총길이',
      G: 'G.밑단둘레',
    },
  },
  Padding: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/88bf095e82d97c3fa1fbc85dea6fb58b.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Coat: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/c514aa235c2c74a8f6c9a4d6ee59e58e.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.암홀',
      F: 'F.총길이',
      G: 'G.밑단둘레',
    },
  },
};

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
        // measurementKey가 존재하면 그것, 아니면 코드 키 자체로도 시도
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
                    onChange={(e) =>
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
