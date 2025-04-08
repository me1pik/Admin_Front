import React from 'react';
import styled from 'styled-components';

/** 공지사항 아이템 인터페이스 */
export interface NoticeItem {
  no: number; // No.
  type: string; // 구분 (공지 / 안내)
  content: string; // 내용
  author: string; // 작성자
  createdAt: string; // 등록일
}

/** NoticeTable Props */
interface NoticeTableProps {
  filteredData: NoticeItem[];
  handleEdit: (author: string) => void; // 작성자 클릭 시 이벤트
}

const NoticeTable: React.FC<NoticeTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  return (
    <Table>
      <colgroup>
        <col style={{ width: '60px' }} /> {/* No. */}
        <col style={{ width: '80px' }} /> {/* 구분 */}
        <col style={{ width: 'auto' }} /> {/* 내용 (가변) */}
        <col style={{ width: '120px' }} /> {/* 작성자 */}
        <col style={{ width: '100px' }} /> {/* 등록일 */}
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>구분</Th>
          <Th>내용</Th>
          <Th>작성자</Th>
          <Th>등록일</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((item, idx) => (
          <TableRow key={idx}>
            <Td>{item.no}</Td>
            <Td>{item.type}</Td>
            <TdLeft>{item.content}</TdLeft>
            {/* 작성자 셀 클릭 이벤트 */}
            <Td onClick={() => handleEdit(item.author)}>
              <AuthorText>{item.author}</AuthorText>
            </Td>
            <Td>{item.createdAt}</Td>
          </TableRow>
        ))}
        {/* 빈 행 렌더링 (10줄 고정) */}
        {filteredData.length < 10 &&
          Array.from({ length: 10 - filteredData.length }).map((_, i) => (
            <TableRow key={`empty-${i}`}>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <TdLeft>&nbsp;</TdLeft>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default NoticeTable;

/* ====================== Styled Components ====================== */

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #ffffff;
  border: 1px solid #dddddd;
`;

const TableRow = styled.tr`
  height: 44px;
`;

const Th = styled.th`
  text-align: center;
  vertical-align: middle;
  background-color: #eeeeee;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

/** 내용(가변폭) 셀: 왼쪽 정렬 */
const TdLeft = styled(Td)`
  text-align: left;
  padding-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** 작성자 텍스트 (클릭 시 이벤트) */
const AuthorText = styled.span`
  font-size: 12px;
  cursor: pointer;
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;
