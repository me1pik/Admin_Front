// src/components/Table/ProductEvaluationTable.tsx
import React from 'react';
import styled from 'styled-components';

/** User 인터페이스 */
export interface User {
  no: number;
  grade: string;
  name: string;
  nickname: string;
  instagram: string;
  productStatus: string; // 제품상태
  serviceQuality: string; // 서비스 품질
  productReview: string; // 제품후기
  registeredAt: string; // 등록일자
}

interface ProductEvaluationTableProps {
  filteredData: User[];
  handleEdit: (no: number) => void;
}

const ProductEvaluationTable: React.FC<ProductEvaluationTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  return (
    <Table>
      <colgroup>
        <col style={{ width: '60px' }} /> {/* No. */}
        <col style={{ width: '60px' }} /> {/* 등급 */}
        <col style={{ width: '80px' }} /> {/* 이름 */}
        <col style={{ width: '80px' }} /> {/* 닉네임 */}
        <col style={{ width: '150px' }} /> {/* 계정(인스타) */}
        <col style={{ width: '80px' }} /> {/* 제품상태 */}
        <col style={{ width: '80px' }} /> {/* 서비스 품질 */}
        <col style={{ width: '200px' }} /> {/* 제품후기 */}
        <col style={{ width: '100px' }} /> {/* 등록일자 */}
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>등급</Th>
          <Th>이름</Th>
          <Th>닉네임</Th>
          <Th>계정(인스타)</Th>
          <Th>제품상태</Th>
          <Th>서비스 품질</Th>
          <Th>제품후기</Th>
          <Th>등록일자</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((user, index) => (
          <TableRow key={index}>
            <Td>{user.no}</Td>
            <Td>{user.grade}</Td>
            <Td>{user.name}</Td>
            <Td>{user.nickname}</Td>
            {/* 인스타: 아바타 + 텍스트 (클릭 시 handleEdit) */}
            <TdLeft>
              <InstaContainer>
                <Avatar />
                <InstaText onClick={() => handleEdit(user.no)}>
                  {user.instagram}
                </InstaText>
              </InstaContainer>
            </TdLeft>
            <Td>{user.productStatus}</Td>
            <Td>{user.serviceQuality}</Td>
            {/* 제품후기는 왼쪽 정렬 */}
            <TdLeft>{user.productReview}</TdLeft>
            <Td>{user.registeredAt}</Td>
          </TableRow>
        ))}

        {/* 빈 행을 10행으로 고정 (각 셀 개별 생성) */}
        {filteredData.length < 10 &&
          Array.from({ length: 10 - filteredData.length }).map((_, i) => (
            <TableRow key={`empty-${i}`}>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <TdLeft>&nbsp;</TdLeft>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <TdLeft>&nbsp;</TdLeft>
              <Td>&nbsp;</Td>
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default ProductEvaluationTable;

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

  font-weight: 800;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const Td = styled.td`
  text-align: center;
  vertical-align: middle;

  font-weight: 400;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
  padding: 0 8px;
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
  flex-shrink: 0;
  background-color: #cccccc;
`;

const InstaText = styled.span`
  cursor: pointer;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;
