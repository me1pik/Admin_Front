// src/components/productregister/FabricInfoSection.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProductDetailResponse } from '../../api/adminProduct';

interface FabricInfoSectionProps {
  product: ProductDetailResponse;
  onChange?: (data: Partial<ProductDetailResponse>) => void;
}

type SlotItem = {
  material: string;
  percent: string;
};

const fabricKeys = ['겉감', '안감', '배색', '부속'] as const;
const COLUMN_COUNT = 4;

// 소재 옵션 리스트
const materials = [
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

const FabricInfoSection: React.FC<FabricInfoSectionProps> = ({
  product,
  onChange,
}) => {
  const [slots, setSlots] = useState<Record<string, SlotItem[]>>({});

  // --- 1) 초기화: product.fabricComposition → slots 배열 상태로 변환
  useEffect(() => {
    const init: Record<string, SlotItem[]> = {};
    const compMap = product.fabricComposition as
      | Record<string, string>
      | undefined;

    fabricKeys.forEach((key) => {
      const raw = compMap?.[key] ?? '';
      const parts = raw.split(/\s*,\s*/).filter((s) => s);
      init[key] = Array.from({ length: COLUMN_COUNT }, (_, i) => {
        const [material = '', percent = ''] = (parts[i] || '').split(/\s+/);
        return { material, percent };
      });
    });

    setSlots(init);
  }, [product.fabricComposition]);

  // --- 2) 변경 알림: slots 상태가 바뀔 때마다 onChange 에 업데이트된 composition 객체를 전송
  const notifyChange = (updated: Record<string, SlotItem[]>) => {
    setSlots(updated);

    const cleanedComp: Record<string, string> = {};
    fabricKeys.forEach((key) => {
      // material 이 있는 슬롯만, percent 가 있으면 "소재 퍼센트", 없으면 "소재" 형태로
      const parts = updated[key]
        .filter((item) => item.material)
        .map((item) =>
          item.percent ? `${item.material} ${item.percent}` : item.material
        );
      if (parts.length > 0) {
        cleanedComp[key] = parts.join(', ');
      }
    });

    onChange?.({ fabricComposition: cleanedComp } as any);
  };

  // --- 3) 핸들러들
  const handleMaterialChange = (key: string, idx: number, material: string) => {
    // 소재 선택 시 기존 percent 는 초기화
    const updated = {
      ...slots,
      [key]: slots[key].map((v, i) =>
        i === idx ? { ...v, material, percent: '' } : v
      ),
    };
    notifyChange(updated);
  };

  const handlePercentChange = (key: string, idx: number, rawValue: string) => {
    // 숫자만 뽑아서 0~100 제한
    const digits = rawValue.replace(/\D/g, '');
    let num = parseInt(digits, 10);
    if (isNaN(num)) num = 0;
    if (num > 100) num = 100;
    const percent = num ? `${num}%` : '';
    const updated = {
      ...slots,
      [key]: slots[key].map((v, i) => (i === idx ? { ...v, percent } : v)),
    };
    notifyChange(updated);
  };

  return (
    <SectionBox>
      <SectionHeader>
        <Bullet />
        <SectionTitle>제품 원단정보</SectionTitle>
      </SectionHeader>
      <VerticalLine />

      <FabricTable>
        <thead>
          <tr>
            <th>구분</th>
            {[1, 2, 3, 4].map((i) => (
              <th key={i}>{i}번</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fabricKeys.map((key) => (
            <tr key={key}>
              <td>{key}</td>
              {slots[key]?.map((slot, idx) => (
                <td key={idx}>
                  <Row>
                    <SelectBox
                      value={slot.material}
                      onChange={(e) =>
                        handleMaterialChange(key, idx, e.target.value)
                      }
                    >
                      <option value=''>선택</option>
                      {materials.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </SelectBox>

                    <PercentInput
                      value={slot.percent}
                      placeholder='%'
                      disabled={!slot.material}
                      required={!!slot.material}
                      onChange={(e) =>
                        handlePercentChange(key, idx, e.target.value)
                      }
                    />
                  </Row>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </FabricTable>
    </SectionBox>
  );
};

export default FabricInfoSection;

/* Styled Components */
const SectionBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

const Bullet = styled.div`
  position: absolute;
  left: -27px;
  top: 0;
  width: 14px;
  height: 14px;
  border: 1px solid #dddddd;
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

const SectionTitle = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  margin-left: 10px;
`;

const VerticalLine = styled.div`
  position: absolute;
  left: 0;
  top: 14px;
  bottom: 20px;
  width: 1px;
  background: #dddddd;
`;

const FabricTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  max-width: 766px;

  th,
  td {
    border: 1px solid #ddd;
    text-align: center;
    font-family: 'NanumSquare Neo OTF';
    font-weight: 900;
    font-size: 12px;
    line-height: 13px;
    color: #000;
    padding: 4px;
    min-width: 80px;
  }

  td:first-child {
    position: relative;
  }
  td:first-child::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 1px;
    background: #dddddd;
  }

  th {
    background-color: #f9f9f9;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

const SelectBox = styled.select`
  flex: 1;
  height: 30px;
  padding: 0 8px;
  font-family: 'NanumSquare Neo OTF';
  font-size: 12px;
`;

const PercentInput = styled.input<{ disabled?: boolean }>`
  width: 50px;
  height: 30px;
  border: 1px solid #ddd;
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-size: 12px;
  background: ${(props) => (props.disabled ? '#f5f5f5' : '#fff')};
`;
