// src/components/productregister/FabricInfoSection.tsx
import React from 'react';
import styled from 'styled-components';
import { ProductDetailResponse } from '../../api/adminProduct';

interface FabricInfoSectionProps {
  product: ProductDetailResponse;
  onChange?: (data: Partial<ProductDetailResponse>) => void;
}

const FabricInfoSection: React.FC<FabricInfoSectionProps> = ({
  product,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (onChange) {
      onChange({ [name]: value });
    }
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
            <th>1번</th>
            <th>2번</th>
            <th>3번</th>
            <th>4번</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>겉감</td>
            <td>
              <Input
                name='fabric_겉감_1'
                placeholder={product.fabricComposition.겉감 || '-'}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_겉감_2'
                placeholder={product.fabricComposition.겉감 || '-'}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_겉감_3'
                placeholder={product.fabricComposition.겉감 || '-'}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_겉감_4'
                placeholder={product.fabricComposition.겉감 || '-'}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>안감</td>
            <td>
              <Input
                name='fabric_안감_1'
                placeholder={product.fabricComposition.안감 || '-'}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_안감_2'
                placeholder={product.fabricComposition.안감 || '-'}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_안감_3'
                placeholder={product.fabricComposition.안감 || '-'}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_안감_4'
                placeholder={product.fabricComposition.안감 || '-'}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>배색</td>
            <td>
              <Input
                name='fabric_배색_1'
                placeholder='-'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_배색_2'
                placeholder='-'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_배색_3'
                placeholder='-'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_배색_4'
                placeholder='-'
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>부속</td>
            <td>
              <Input
                name='fabric_부속_1'
                placeholder='-'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_부속_2'
                placeholder='-'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_부속_3'
                placeholder='-'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Input
                name='fabric_부속_4'
                placeholder='-'
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </FabricTable>
    </SectionBox>
  );
};

export default FabricInfoSection;

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
