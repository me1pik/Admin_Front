// src/components/productregister/FabricInfoSection.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProductDetailResponse } from '../../api/adminProduct';

interface FabricInfoSectionProps {
  product: ProductDetailResponse;
  onChange?: (data: Partial<ProductDetailResponse>) => void;
}

// 상수 정의
const FABRIC_KEYS = ['겉감', '안감', '배색', '부속'] as const;
const COLUMN_COUNT = 5;
const MATERIAL_OPTIONS = [
  '폴리에스터',
  '나일론',
  '폴리우레탄',
  '아크릴',
  '레이온',
  '면',
  '모',
  '마',
  '캐시미어',
  '큐프로',
  '천연모피(밍크)',
  '천연모피(양)',
  '천연가죽(양)',
  '천연가죽(돼지)',
  '천연모피(여우)',
  '메탈',
  '금속성섬유',
  '거위솜털',
  '거위깃털',
  '아세테이트',
  '견',
] as const;

type SlotItem = { material: string; percent: string };

const FabricInfoSection: React.FC<FabricInfoSectionProps> = ({
  product,
  onChange,
}) => {
  const createEmptySlots = (): Record<string, SlotItem[]> =>
    FABRIC_KEYS.reduce(
      (acc, key) => {
        acc[key] = Array.from({ length: COLUMN_COUNT }, () => ({
          material: '',
          percent: '',
        }));
        return acc;
      },
      {} as Record<string, SlotItem[]>
    );

  const [slots, setSlots] =
    useState<Record<string, SlotItem[]>>(createEmptySlots);

  useEffect(() => {
    const compMap = (product.fabricComposition || {}) as Record<string, string>;
    const newSlots = createEmptySlots();

    FABRIC_KEYS.forEach((key) => {
      (compMap[key] || '')
        .split(/\s*,\s*/)
        .filter(Boolean)
        .forEach((part, idx) => {
          if (idx < COLUMN_COUNT) {
            const [material = '', percent = ''] = part.split(/\s+/);
            newSlots[key][idx] = { material, percent };
          }
        });
    });

    setSlots(newSlots);
  }, [product.fabricComposition]);

  const notifyChange = (updated: Record<string, SlotItem[]>) => {
    const comp: Record<string, string> = {};
    FABRIC_KEYS.forEach((key) => {
      const entries = updated[key]
        .filter((s) => s.material && s.percent)
        .map((s) => `${s.material} ${s.percent}`);
      if (entries.length) comp[key] = entries.join(', ');
    });
    onChange?.({ fabricComposition: comp } as any);
  };

  const handleMaterial = (key: string, idx: number, material: string) => {
    setSlots((prev) => {
      const updated = { ...prev };
      updated[key] = updated[key].map((s, i) =>
        i === idx ? { material, percent: '' } : s
      );
      return updated;
    });
  };

  const handlePercent = (key: string, idx: number, raw: string) => {
    const num = parseInt(raw.replace(/\D/g, ''), 10);
    const percent = isNaN(num) ? '' : `${num}%`;
    setSlots((prev) => {
      const updated = { ...prev };
      updated[key] = updated[key].map((s, i) =>
        i === idx ? { ...s, percent } : s
      );
      notifyChange(updated);
      return updated;
    });
  };

  return (
    <Container>
      <Header>
        <Bullet />
        <Title>제품 원단정보</Title>
      </Header>
      <Divider />

      <Table>
        <thead>
          <tr>
            <th>구분</th>
            {Array.from({ length: COLUMN_COUNT }, (_, i) => (
              <th key={i}>{i + 1}번</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FABRIC_KEYS.map((key) => (
            <tr key={key}>
              <td className='label'>{key}</td>
              {slots[key].map((slot, idx) => {
                const empty = !slot.material && !slot.percent;
                const listId = `options-${key}-${idx}`;
                return (
                  <CellTd key={idx} empty={empty}>
                    <CellRow>
                      <MaterialInput
                        empty={empty}
                        list={listId}
                        value={slot.material}
                        onChange={(e) =>
                          handleMaterial(key, idx, e.target.value)
                        }
                      />
                      <datalist id={listId}>
                        {MATERIAL_OPTIONS.map((m) => (
                          <option key={m} value={m} />
                        ))}
                      </datalist>
                      <PercentWrapper>
                        <NumberInput
                          empty={empty}
                          type='number'
                          value={slot.percent.replace('%', '')}
                          disabled={!slot.material}
                          onChange={(e) =>
                            handlePercent(key, idx, e.target.value)
                          }
                        />
                        <Suffix>%</Suffix>
                      </PercentWrapper>
                    </CellRow>
                  </CellTd>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FabricInfoSection;

/* 스타일드 컴포넌트 */
const Container = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 24px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
const Bullet = styled.div`
  position: absolute;
  left: -28px;
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
  font-weight: 700;
  font-size: 15px;
  margin-left: 12px;
`;
const Divider = styled.div`
  position: absolute;
  left: 0;
  top: 14px;
  bottom: 20px;
  width: 2px;
  background: #ddd;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;

  th,
  td {
    border: 1px solid #ccc;
    text-align: center;
    font-size: 13px;
    padding: 8px;
    min-width: 70px;
  }
  th {
    background: #f2f2f2;
    font-weight: 600;
  }
  td.label {
    background: #fafafa;
    font-weight: 600;
    color: #333;
  }
`;
const CellTd = styled.td<{ empty: boolean }>`
  background: ${({ empty }) => (empty ? '#f9f9f9' : '#fff')};
`;
const CellRow = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;
const MaterialInput = styled.input<{ empty: boolean }>`
  flex: 1;
  height: 32px;
  font-size: 13px;
  padding: 0 8px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #fff;
  outline: ${({ empty }) => (empty ? 'none' : '2px solid #f6ae24')};
  &:focus {
    outline: 2px solid #f6ae24;
  }
`;
const PercentWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const NumberInput = styled.input<{ empty: boolean }>`
  width: 60px;
  height: 32px;
  font-size: 13px;
  text-align: center;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: ${({ empty }) => (empty ? '#f9f9f9' : '#fff')};
  &:focus {
    outline: 2px solid #f6ae24;
  }
`;
const Suffix = styled.span`
  margin-left: 4px;
  font-size: 13px;
  color: #666;
`;
