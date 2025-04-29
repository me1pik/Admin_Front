import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

/** User 인터페이스 (이미지에 맞춰 필드 변경) */
export interface User {
  no: number;
  grade: string;
  name: string;
  nickname: string;
  instagram: string;
  season: string;
  contentsCount: string;
  submitCount: string;
  average: number;
  totalSum: number;
}

/** PageTable 컴포넌트 Props */
interface PageTableProps {
  /** 전체 사용자 데이터 */
  data: User[];
  /** 편집 버튼 클릭 시 호출될 콜백 */
  handleEdit: (no: number) => void;
  /** 한 페이지당 항목 수 (기본값: 10) */
  pageSize?: number;
}

const PageTable: React.FC<PageTableProps> = ({
  data,
  handleEdit,
  pageSize = 10,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // URL ?page= 에서 현재 페이지를 읽되, 없으면 1
  const currentPage = Number(searchParams.get('page') ?? '1');

  // 전체 페이지 수 계산
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  // 현재 페이지에 해당하는 데이터 슬라이스
  const slicedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Table>
        <colgroup>
          <col style={{ width: '60px' }} />
          <col style={{ width: '60px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '150px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '80px' }} />
        </colgroup>
        <thead>
          <TableRow>
            <Th>No.</Th>
            <Th>등급</Th>
            <Th>이름</Th>
            <Th>닉네임</Th>
            <Th>계정(인스타)</Th>
            <Th>시즌 진행상태</Th>
            <Th>컨텐츠 수</Th>
            <Th>등록 제출 수</Th>
            <Th>1회 평균</Th>
            <Th>총 합</Th>
          </TableRow>
        </thead>
        <tbody>
          {slicedData.map((user, idx) => (
            <TableRow key={idx}>
              <Td>{user.no}</Td>
              <Td>{user.grade}</Td>
              <Td>{user.name}</Td>
              <Td>{user.nickname}</Td>
              <TdLeft>
                <InstaContainer>
                  <Avatar />
                  <InstaText onClick={() => handleEdit(user.no)}>
                    {user.instagram}
                  </InstaText>
                </InstaContainer>
              </TdLeft>
              <Td>{user.season}</Td>
              <Td>{user.contentsCount}</Td>
              <Td>{user.submitCount}</Td>
              <Td>{user.average}</Td>
              <Td>{user.totalSum}</Td>
            </TableRow>
          ))}

          {/* 빈 행 채우기 */}
          {slicedData.length < pageSize &&
            Array.from({ length: pageSize - slicedData.length }).map((_, i) => (
              <TableRow key={`empty-${i}`}>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <TdLeft>&nbsp;</TdLeft>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
                <Td>&nbsp;</Td>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default PageTable;

/* ================= Styled Components ================= */
const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  height: 44px;
`;

const Th = styled.th`
  text-align: center;
  vertical-align: middle;
  background: #eee;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 12px;
  border: 1px solid #ddd;
  white-space: nowrap;
`;

const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-size: 12px;
  border: 1px solid #ddd;
  white-space: nowrap;
`;

const TdLeft = styled(Td)`
  text-align: left;
`;

const InstaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;
`;

const Avatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ccc;
`;

const InstaText = styled.span`
  cursor: pointer;
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;
