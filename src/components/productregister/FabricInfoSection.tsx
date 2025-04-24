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
] as const;

type SlotItem = { material: string; percent: string };

const FabricInfoSection: React.FC<FabricInfoSectionProps> = ({
  product,
  onChange,
}) => {
  // 빈 슬롯 배열 생성
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

  // product.fabricComposition → slots 동기화
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

  // 변경 사항을 부모에 통보
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

  // 소재 선택: 그대로 해당 인덱스만 업데이트
  const handleMaterial = (key: string, idx: number, material: string) => {
    setSlots((prev) => {
      const updated = { ...prev };
      updated[key] = updated[key].map((s, i) =>
        i === idx ? { material, percent: '' } : s
      );
      return updated;
    });
  };

  // 퍼센트 입력: 그대로 해당 인덱스만 업데이트 + 통보
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
              {slots[key].map((slot, idx) => {
                const empty = !slot.material && !slot.percent;
                return (
                  <CellTd key={idx} empty={empty}>
                    <CellRow>
                      <Select
                        empty={empty}
                        value={slot.material}
                        onChange={(e) =>
                          handleMaterial(key, idx, e.target.value)
                        }
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
const CellTd = styled.td<{ empty: boolean }>`
  background: ${({ empty }) => (empty ? '#f5f5f5' : '#fff')};
`;
const CellRow = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;
const Select = styled.select<{ empty: boolean }>`
  flex: 1;
  height: 30px;
  font-size: 12px;
  padding: 0 6px;
  background: ${({ empty }) => (empty ? '#f5f5f5' : '#fff')};
`;
const PercentWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const NumberInput = styled.input<{ empty: boolean }>`
  width: 50px;
  height: 30px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #ddd;
  background: ${({ empty }) => (empty ? '#f5f5f5' : '#fff')};
`;
const Suffix = styled.span`
  margin-left: 2px;
  font-size: 12px;
`;
