// src/components/productregister/FabricInfoSection.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProductDetailResponse } from '../../api/adminProduct';

interface FabricInfoSectionProps {
  product: ProductDetailResponse;
  onChange?: (data: Partial<ProductDetailResponse>) => void;
}

// --- 상수 정의
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
      const arr = updated[key]
        .filter((s) => s.material && s.percent)
        .map((s) => `${s.material} ${s.percent}`);
      if (arr.length) comp[key] = arr.join(', ');
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
              <td>{key}</td>
              {slots[key].map((slot, idx) => (
                <td key={idx}>
                  <CellRow>
                    <Select
                      value={slot.material}
                      onChange={(e) => handleMaterial(key, idx, e.target.value)}
                    >
                      <option value=''>선택</option>
                      {MATERIAL_OPTIONS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </Select>

                    <PercentWrapper>
                      <NumberInput
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
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FabricInfoSection;

/* ========== Styled Components ========== */
const Container = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 20px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Bullet = styled.div`
  position: absolute;
  left: -27px;
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
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 14px;
  margin-left: 10px;
`;
const Divider = styled.div`
  position: absolute;
  left: 0;
  top: 14px;
  bottom: 20px;
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
    font-family: 'NanumSquare Neo OTF';
    font-weight: 900;
    font-size: 12px;
    padding: 4px;
    min-width: 60px;
  }
  th {
    background: #f9f9f9;
  }
  td:first-child {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 1px;
      background: #ddd;
    }
  }
`;
const CellRow = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;
const Select = styled.select`
  flex: 1;
  height: 30px;
  font-size: 12px;
  padding: 0 6px;
`;
const PercentWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const NumberInput = styled.input`
  width: 50px;
  height: 30px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #ddd;
  background: #fff;
`;
const Suffix = styled.span`
  margin-left: 2px;
  font-size: 12px;
`;
