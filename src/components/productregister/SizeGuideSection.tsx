// SizeGuideSection.tsx
import React, { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { ProductDetailResponse } from '../../api/adminProduct';

export interface SizeGuideSectionProps {
  product: ProductDetailResponse;
  onSizesChange?: (
    sizes: {
      size: string;
      measurements: { 어깨: number; 가슴: number; 총장: number };
    }[]
  ) => void;
}

export interface SizeRow {
  size: string;
  어깨: string;
  가슴: string;
  허리: string; // measurements 총장을 '허리'로 사용
  팔길이: string;
  총길이: string;
}

interface Headers {
  size: string;
  어깨: string;
  가슴: string;
  허리: string;
  팔길이: string;
  총길이: string;
}

const SizeGuideSection: React.FC<SizeGuideSectionProps> = ({
  product,
  onSizesChange,
}) => {
  const defaultRows: SizeRow[] = [
    { size: '44', 어깨: '', 가슴: '', 허리: '', 팔길이: '', 총길이: '' },
    { size: '55', 어깨: '', 가슴: '', 허리: '', 팔길이: '', 총길이: '' },
    { size: '66', 어깨: '', 가슴: '', 허리: '', 팔길이: '', 총길이: '' },
    { size: '77', 어깨: '', 가슴: '', 허리: '', 팔길이: '', 총길이: '' },
    { size: 'Free', 어깨: '', 가슴: '', 허리: '', 팔길이: '', 총길이: '' },
  ];

  const initialRows: SizeRow[] =
    product.sizes && product.sizes.length > 0
      ? product.sizes.map((item) => ({
          size:
            item.size.toLowerCase().includes('free') ||
            item.size.trim().toLowerCase() === 'free'
              ? 'Free'
              : item.size.replace(/[^0-9]/g, ''),
          어깨: item.measurements?.어깨?.toString() || '',
          가슴: item.measurements?.가슴?.toString() || '',
          허리: item.measurements?.총장?.toString() || '',
          팔길이: '',
          총길이: '',
        }))
      : defaultRows;

  const [sizeData, setSizeData] = useState<SizeRow[]>(initialRows);
  const [headers, setHeaders] = useState<Headers>({
    size: '사이즈',
    어깨: 'A(어깨)',
    가슴: 'B(가슴)',
    허리: 'C(허리)',
    팔길이: 'D(팔길이)',
    총길이: 'E(총길이)',
  });

  useEffect(() => {
    if (onSizesChange) {
      const sizes = sizeData.map((row) => ({
        size: row.size,
        measurements: {
          어깨: Number(row.어깨) || 0,
          가슴: Number(row.가슴) || 0,
          총장: Number(row.허리) || 0,
        },
      }));
      onSizesChange(sizes);
    }
    // sizeData 변경시에만 실행
  }, [sizeData]);

  const handleCellChange = (
    rowIndex: number,
    field: keyof SizeRow,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let newValue = e.target.value;
    if (field === 'size') {
      newValue = newValue.replace(/[^0-9]/g, '');
    }
    setSizeData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = { ...newData[rowIndex], [field]: newValue };
      return newData;
    });
  };

  const handleHeaderChange = (
    field: keyof Headers,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setHeaders((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleAddRow = () => {
    const newRow: SizeRow = {
      size: '',
      어깨: '',
      가슴: '',
      허리: '',
      팔길이: '',
      총길이: '',
    };
    setSizeData((prev) => [...prev, newRow]);
  };

  const handleDeleteRow = (rowIndex: number) => {
    setSizeData((prev) => prev.filter((_, idx) => idx !== rowIndex));
  };

  const preventEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <SectionBox>
      <SectionHeaderContainer>
        <Bullet />
        <SectionTitle>사이즈 가이드</SectionTitle>
      </SectionHeaderContainer>
      <VerticalLine />
      <SizeGuideTable>
        <thead>
          <tr>
            <EditableTh>
              <HeaderInput
                value={headers.size}
                onChange={(e) => handleHeaderChange('size', e)}
                onKeyDown={preventEnter}
              />
            </EditableTh>
            <EditableTh>
              <HeaderInput
                value={headers.어깨}
                onChange={(e) => handleHeaderChange('어깨', e)}
                onKeyDown={preventEnter}
              />
            </EditableTh>
            <EditableTh>
              <HeaderInput
                value={headers.가슴}
                onChange={(e) => handleHeaderChange('가슴', e)}
                onKeyDown={preventEnter}
              />
            </EditableTh>
            <EditableTh>
              <HeaderInput
                value={headers.허리}
                onChange={(e) => handleHeaderChange('허리', e)}
                onKeyDown={preventEnter}
              />
            </EditableTh>
            <EditableTh>
              <HeaderInput
                value={headers.팔길이}
                onChange={(e) => handleHeaderChange('팔길이', e)}
                onKeyDown={preventEnter}
              />
            </EditableTh>
            <EditableTh>
              <HeaderInput
                value={headers.총길이}
                onChange={(e) => handleHeaderChange('총길이', e)}
                onKeyDown={preventEnter}
              />
            </EditableTh>
            <Th>관리</Th>
          </tr>
        </thead>
        <tbody>
          {sizeData.map((row, idx) => (
            <tr key={idx}>
              <Td>
                <InputSmall
                  value={row.size}
                  onChange={(e) => handleCellChange(idx, 'size', e)}
                  onKeyDown={preventEnter}
                />
              </Td>
              <Td>
                <InputSmall
                  value={row.어깨}
                  onChange={(e) => handleCellChange(idx, '어깨', e)}
                  onKeyDown={preventEnter}
                />
              </Td>
              <Td>
                <InputSmall
                  value={row.가슴}
                  onChange={(e) => handleCellChange(idx, '가슴', e)}
                  onKeyDown={preventEnter}
                />
              </Td>
              <Td>
                <InputSmall
                  value={row.허리}
                  onChange={(e) => handleCellChange(idx, '허리', e)}
                  onKeyDown={preventEnter}
                />
              </Td>
              <Td>
                <InputSmall
                  value={row.팔길이}
                  onChange={(e) => handleCellChange(idx, '팔길이', e)}
                  onKeyDown={preventEnter}
                />
              </Td>
              <Td>
                <InputSmall
                  value={row.총길이}
                  onChange={(e) => handleCellChange(idx, '총길이', e)}
                  onKeyDown={preventEnter}
                />
              </Td>
              <Td>
                <IconButton
                  onClick={() => handleDeleteRow(idx)}
                  title='행 삭제'
                >
                  <FaTimes size={16} color='#d32f2f' />
                </IconButton>
              </Td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TfootCell colSpan={7}>
              <IconButton onClick={handleAddRow} title='행 추가'>
                <FaPlus size={16} color='#0026fc' /> <AddText>행 추가</AddText>
              </IconButton>
            </TfootCell>
          </tr>
        </tfoot>
      </SizeGuideTable>
    </SectionBox>
  );
};

export default SizeGuideSection;

/* Styled Components */
const SectionBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 20px;
`;
const SectionHeaderContainer = styled.div`
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
  bottom: 55px;
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
const EditableTh = styled.th`
  padding: 0;
`;
const Th = styled.th``;
const Td = styled.td``;
const InputSmall = styled.input`
  width: 50px;
  height: 28px;
  border: 1px solid #ddd;
  font-size: 12px;
  text-align: center;
`;
const HeaderInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 900;
  font-size: 12px;
  background: transparent;
  &:focus {
    outline: none;
  }
`;
const IconButton = styled.button`
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s,
    opacity 0.2s;
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;
const TfootCell = styled.td`
  padding: 10px;
  text-align: center;
`;
const AddText = styled.span`
  margin-left: 6px;
  font-size: 14px;
  font-family: 'NanumSquare Neo OTF';
`;
