import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ProductDetailResponse } from '../../api/adminProduct';

interface FabricInfoSectionProps {
  product: ProductDetailResponse;
  onChange?: (data: Partial<ProductDetailResponse>) => void;
}

const fabricKeys = ['겉감', '안감', '배색', '부속'] as const;
const COLUMN_COUNT = 4;

const FabricInfoSection: React.FC<FabricInfoSectionProps> = ({
  product,
  onChange,
}) => {
  const [slots, setSlots] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const init: Record<string, string[]> = {};
    const compMap = product.fabricComposition as
      | Record<string, string>
      | undefined;

    fabricKeys.forEach((key) => {
      const raw = compMap?.[key] ?? '';
      const parts = raw.split(/\s*,\s*/).filter((s) => s);
      init[key] = Array.from(
        { length: COLUMN_COUNT },
        (_, i) => parts[i] || ''
      );
    });

    setSlots(init);
  }, [product.fabricComposition]);

  const handleInputChange = (key: string, idx: number, value: string) => {
    const updated = {
      ...slots,
      [key]: slots[key].map((v, i) => (i === idx ? value : v)),
    };
    setSlots(updated);

    const newComp: Record<string, string> = {};
    fabricKeys.forEach((k) => {
      newComp[k] = updated[k].filter((v) => v.trim()).join(', ');
    });
    onChange?.({ fabricComposition: newComp });
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
              {slots[key]?.map((val, idx) => (
                <td key={idx}>
                  <Input
                    value={val}
                    placeholder='-'
                    onChange={(e) =>
                      handleInputChange(key, idx, e.target.value)
                    }
                  />
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
    min-width: 50px;
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

const Input = styled.input`
  flex: 1;
  height: 40px;
  max-width: 120px;
  border: 1px solid #ddd;
  padding: 0 8px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  text-align: center;
`;
