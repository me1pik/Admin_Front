// src/components/Table/Setting/SettingsDetailTable.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TabItem } from '../../Header/SearchSubHeader';

export interface SettingsDetailRow {
  title: string;
  category: string;
  content: string;
}

interface SettingsDetailTableProps {
  data: SettingsDetailRow[];
  onChange?: (row: SettingsDetailRow) => void;
  // 부모에서 전달받은 TabItem 배열을 통해 SelectBox 옵션 구성 (프롭스로 반드시 전달)
  selectOptions: TabItem[];
}

const SettingsDetailTable: React.FC<SettingsDetailTableProps> = ({
  data,
  onChange,
  selectOptions,
}) => {
  const [row, setRow] = useState<SettingsDetailRow>(
    data[0] ?? { title: '', category: '', content: '' }
  );

  useEffect(() => {
    if (data[0]) {
      setRow(data[0]);
    }
  }, [data]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedRow = { ...row, title: e.target.value };
    setRow(updatedRow);
    if (onChange) onChange(updatedRow);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedRow = { ...row, category: e.target.value };
    setRow(updatedRow);
    if (onChange) onChange(updatedRow);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedRow = { ...row, content: e.target.value };
    setRow(updatedRow);
    if (onChange) onChange(updatedRow);
  };

  return (
    <TableContainer>
      <StyledTable>
        <tbody>
          {/* 1) 제목 */}
          <TableRow>
            <Th>제목</Th>
            <Td>
              <InputBox
                type='text'
                value={row.title}
                onChange={handleTitleChange}
              />
            </Td>
          </TableRow>

          {/* 2) 구분 - 부모에서 전달받은 selectOptions 사용 */}
          <TableRow>
            <Th>구분</Th>
            <Td>
              <SelectBox value={row.category} onChange={handleCategoryChange}>
                {selectOptions.map((option) => (
                  <Option key={option.label} value={option.label}>
                    {option.label}
                  </Option>
                ))}
              </SelectBox>
            </Td>
          </TableRow>

          {/* 3) 내용 */}
          <TableRow>
            <Th>내용</Th>
            <Td>
              <TextArea value={row.content} onChange={handleContentChange} />
            </Td>
          </TableRow>
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default SettingsDetailTable;

/* ====================== Styled Components ====================== */

const TableContainer = styled.div`
  width: 100%;
  min-width: 1000px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  font-family: 'NanumSquare Neo OTF';
  font-size: 12px;
  line-height: 23px;
  color: #000000;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #dddddd;
  &:last-child {
    border-bottom: none;
  }
`;

const Th = styled.th`
  padding: 0 20px;
  white-space: nowrap;
  font-weight: 800;
  width: 50px;
`;

const Td = styled.td`
  padding: 0 10px;
  vertical-align: middle;
`;

const InputBox = styled.input`
  width: 100%;
  height: 32px;
  padding: 10px;
  border: 1px solid #dddddd;
  margin: 10px 0;
  box-sizing: border-box;
`;

const SelectBox = styled.select`
  width: 160px;
  height: 32px;
  margin: 10px 0;
  border: 1px solid #000000;
  box-sizing: border-box;
`;

const Option = styled.option`
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  resize: none;
`;
