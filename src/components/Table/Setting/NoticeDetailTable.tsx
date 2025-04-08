// src/components/Table/Setting/NoticeDetailTable.tsx
import React from 'react';
import styled from 'styled-components';

/** 노티스 디테일에 필요한 필드 (제목, 구분, 내용) */
export interface NoticeDetailRow {
  title: string; // 제목
  category: string; // 구분 (예: "개인정보처리방침", "공지", "안내" 등)
  content: string; // 내용 (여러 줄)
}

/** Props: 배열 형태로 받되, 실제론 1개의 데이터만 사용한다고 가정 */
interface NoticeDetailTableProps {
  data: NoticeDetailRow[];
}

const NoticeDetailTable: React.FC<NoticeDetailTableProps> = ({ data }) => {
  // 첫 번째 아이템만 표시 (없으면 빈 문자열로 처리)
  const row = data[0] ?? {
    title: '',
    category: '',
    content: '',
  };

  return (
    <TableContainer>
      <StyledTable>
        <tbody>
          {/* 1) 제목 */}
          <TableRow>
            <Th>제목</Th>
            <Td>
              <InputBox type='text' value={row.title} readOnly />
            </Td>
          </TableRow>

          {/* 2) 구분 */}
          <TableRow>
            <Th>구분</Th>
            <Td>
              <SelectBox value={row.category} disabled>
                <option value='개인정보처리방침'>개인정보처리방침</option>
                <option value='공지'>공지</option>
                <option value='안내'>안내</option>
                {/* 필요한 옵션은 자유롭게 추가 */}
              </SelectBox>
            </Td>
          </TableRow>

          {/* 3) 내용 */}
          <TableRow>
            <Th>내용</Th>
            <Td>
              <TextArea value={row.content} readOnly />
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

/** 컨테이너: 테두리와 패딩으로 테이블 둘레를 감싸며, 내부는 별도의 테두리 없음 */
const TableContainer = styled.div`
  width: 100%;
  min-width: 1000px; /* 필요에 따라 조정 */
  box-sizing: border-box;

  /* 외곽 테두리 */
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse; /* 또는 separate + border-spacing: 0; */
  background-color: #ffffff;
  ${commonFontStyles}/* 폰트 스타일 전체 적용 */
`;

const TableRow = styled.tr`
  /* 각 행 사이에만 선을 보이도록 */
  border-bottom: 1px solid #dddddd;

  /* 마지막 행의 선 제거 */
  &:last-child {
    border-bottom: none;
  }
`;

const Th = styled.th`
  /* 개별 셀 테두리는 없앰 */
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
  width: 98%;
  height: 32px;
  padding: 5px;
  border: 1px solid #dddddd;
  margin: 5px 0;
  box-sizing: border-box;
`;

/** 구분 Select */
const SelectBox = styled.select`
  ${commonFontStyles}
  width: 160px;
  height: 32px;
  margin: 5px 0;
  border: 1px solid #000000;
  box-sizing: border-box;
`;

/** 내용 TextArea */
const TextArea = styled.textarea`
  ${commonFontStyles}
  width: 98%;
  min-height: 300px; /* 요청하신 최소 높이 1000px */
  padding: 5px;
  margin: 5px 0;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  resize: none;
`;
