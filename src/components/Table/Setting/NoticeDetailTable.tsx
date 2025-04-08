// src/components/Table/Setting/NoticeDetailTable.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

/** 노티스 디테일에 필요한 필드 (제목, 구분, 내용) */
export interface NoticeDetailRow {
  title: string;
  category: string;
  content: string;
}

/** Props: 배열 형태로 받되 실제론 1개의 데이터만 사용한다고 가정 */
interface NoticeDetailTableProps {
  data: NoticeDetailRow[];
  onChange?: (row: NoticeDetailRow) => void;
}

const NoticeDetailTable: React.FC<NoticeDetailTableProps> = ({
  data,
  onChange,
}) => {
  // 최초 값은 props의 첫번째 데이터
  const [row, setRow] = useState<NoticeDetailRow>(
    data[0] ?? { title: '', category: '', content: '' }
  );

  // 외부 데이터 변경 시 업데이트 (선택 사항)
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

          {/* 2) 구분 */}
          <TableRow>
            <Th>구분</Th>
            <Td>
              <SelectBox value={row.category} onChange={handleCategoryChange}>
                <Option value='개인정보처리방침'>개인정보처리방침</Option>
                <Option value='공지'>공지</Option>
                <Option value='안내'>안내</Option>
                {/* 추가 옵션 가능 */}
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

export default NoticeDetailTable;

/* ====================== Styled Components ====================== */

/** 공통 폰트 스타일 */
const commonFontStyles = `
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 23px;
  color: #000000;
`;

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
  ${commonFontStyles}
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #dddddd;
  &:last-child {
    border-bottom: none;
  }
`;

const Th = styled.th`
  border: none;
  text-align: left;
  padding: 0 20px;
  white-space: nowrap;
  font-weight: 800;
  width: 50px;
`;

const Td = styled.td`
  border: none;
  padding: 0 10px;
  vertical-align: middle;
`;

/** 제목 Input */
const InputBox = styled.input`
  ${commonFontStyles}
  width: 100%;
  height: 32px;
  padding: 10px;
  border: 1px solid #dddddd;
  margin: 10px 0;
  box-sizing: border-box;
`;

/** 구분 Select */
const SelectBox = styled.select`
  ${commonFontStyles}
  width: 160px;
  height: 32px;
  margin: 10px 0;
  border: 1px solid #000000;
  box-sizing: border-box;
`;

/** 옵션 텍스트에만 적용할 스타일 */
const Option = styled.option`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

/** 내용 TextArea */
const TextArea = styled.textarea`
  ${commonFontStyles}
  width: 100%;
  min-height: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  resize: none;
`;
