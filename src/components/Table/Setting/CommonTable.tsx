import styled from 'styled-components';

/** 모든 테이블 아이템이 가져야 할 공통 필드 */
export interface BaseTableItem {
  no: number; // 게시글 번호
  type: string; // 구분 (예: 공지, 안내, 서비스 정책 등)
  content: string; // 내용
  author: string; // 작성자
  createdAt: string; // 등록일
}

/** CommonTable의 Props */
interface CommonTableProps<T extends BaseTableItem> {
  data: T[];
  /** 작성자 클릭 시 호출할 함수 (작성자명, 게시글 번호 전달) */
  onAuthorClick: (author: string, no: number) => void;
}

export function CommonTable<T extends BaseTableItem>({
  data,
  onAuthorClick,
}: CommonTableProps<T>) {
  // 10행 고정 처리
  const emptyRowsCount = Math.max(0, 10 - data.length);

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
        {data.map((item, idx) => (
          <TableRow key={idx}>
            <Td>{item.no}</Td>
            <Td>{item.type}</Td>
            <TdLeft>{item.content}</TdLeft>
            <Td
              onClick={() => onAuthorClick(item.author, item.no)}
              style={{ cursor: 'pointer', color: '#007bff' }}
            >
              {item.author}
            </Td>
            <Td>{item.createdAt}</Td>
          </TableRow>
        ))}
        {Array.from({ length: emptyRowsCount }).map((_, i) => (
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
}

/* ============== Styled Components ============== */

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

const TdLeft = styled(Td)`
  text-align: left;
  padding-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
