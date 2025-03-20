// src/components/productregister/SizeGuideSection.tsx
import React from 'react';
import styled from 'styled-components';

const SizeGuideSection: React.FC = () => {
  return (
    <SectionBox style={{ flex: '0 0 400px' }}>
      <SectionHeader>
        <Bullet />
        <SectionTitle>사이즈 가이드</SectionTitle>
      </SectionHeader>
      <VerticalLine />
      <SizeGuideTable>
        <thead>
          <tr>
            <th />
            <th>A(어깨)</th>
            <th>B(가슴)</th>
            <th>C(허리)</th>
            <th>D(팔길이)</th>
            <th>E(총길이)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>44(S)</td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
          </tr>
          <tr>
            <td>55(M)</td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
          </tr>
          <tr>
            <td>66(L)</td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
          </tr>
          <tr>
            <td>77(XL)</td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
          </tr>
          <tr>
            <td>Free(F)</td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
            <td>
              <InputSmall placeholder='-' />
            </td>
          </tr>
        </tbody>
      </SizeGuideTable>
    </SectionBox>
  );
};

export default SizeGuideSection;

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

const SizeGuideTable = styled.table`
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
    line-height: 13px;
    color: #000000;
    padding: 4px;
    position: relative;
  }
  th:first-child,
  td:first-child {
    padding-left: 10px;
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

const InputSmall = styled.input`
  width: 50px;
  height: 28px;
  border: 1px solid #ddd;
  font-size: 12px;
  text-align: center;
`;
