// src/components/Table/UserTable.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

/** User 인터페이스 */
export interface User {
  no: number;
  status: string; // 상태 (예: 인증, 블럭 등)
  grade: string; // 등급 (예: 일반, 우수 등)
  name: string; // 이름
  nickname: string; // 닉네임
  instagram: string; // 계정(인스타)
  followingFollower: string; // 팔로잉/팔로우 정보
  serviceArea: string; // 서비스 지역
  joinDate: string; // 가입일자
}

/** UserTable 컴포넌트 Props */
interface UserTableProps {
  filteredData: User[];
  handleEdit: (no: number) => void; // 이제 유저 번호(no)를 인자로 받음
}

const UserTable: React.FC<UserTableProps> = ({ filteredData, handleEdit }) => {
  // 선택된 행의 no 값을 저장하는 상태 (체크박스 선택)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // 모든 행이 선택되었는지 여부
  const allSelected =
    filteredData.length > 0 && selectedIds.size === filteredData.length;

  // 헤더 전체 선택 체크박스 변경 핸들러
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // 모든 행 선택
      const all = new Set(filteredData.map((user) => user.no));
      setSelectedIds(all);
    } else {
      // 전체 해제
      setSelectedIds(new Set());
    }
  };

  // 개별 행 선택 체크박스 변경 핸들러
  const handleRowSelect = (no: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(no)) {
        newSet.delete(no);
      } else {
        newSet.add(no);
      }
      return newSet;
    });
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: '40px' }} /> {/* 체크박스 */}
        <col style={{ width: '50px' }} /> {/* No. */}
        <col style={{ width: '50px' }} /> {/* 상태 */}
        <col style={{ width: '50px' }} /> {/* 등급 */}
        <col style={{ width: '80px' }} /> {/* 이름 */}
        <col style={{ width: '80px' }} /> {/* 닉네임 */}
        <col style={{ width: '150px' }} /> {/* 계정(인스타) */}
        <col style={{ width: '100px' }} /> {/* 팔로잉/팔로우 */}
        <col style={{ width: '100px' }} /> {/* 서비스 지역 */}
        <col style={{ width: '100px' }} /> {/* 가입일자 */}
      </colgroup>
      <thead>
        <TableRow>
          <Th>
            <input
              type='checkbox'
              onChange={handleSelectAll}
              checked={allSelected}
              disabled={filteredData.length === 0}
            />
          </Th>
          <Th>No.</Th>
          <Th>상태</Th>
          <Th>등급</Th>
          <Th>이름</Th>
          <Th>닉네임</Th>
          <Th>계정(인스타)</Th>
          <Th>팔로잉/팔로우</Th>
          <Th>서비스 지역</Th>
          <Th>가입일자</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((user, index) => (
          <TableRow key={index}>
            <Td>
              <input
                type='checkbox'
                checked={selectedIds.has(user.no)}
                onChange={() => handleRowSelect(user.no)}
              />
            </Td>
            <Td>{user.no}</Td>
            <Td>{user.status}</Td>
            <Td>{user.grade}</Td>
            <Td>{user.name}</Td>
            <Td>{user.nickname}</Td>
            {/* 인스타 계정: 아바타 + 텍스트를 가로로 배치, 좌측 정렬 */}
            <TdLeft>
              <InstaContainer>
                <Avatar />
                {/* 클릭 시 handleEdit에 user.no 전달 */}
                <InstaText onClick={() => handleEdit(user.no)}>
                  {user.instagram}
                </InstaText>
              </InstaContainer>
            </TdLeft>
            <Td>{user.followingFollower}</Td>
            <Td>{user.serviceArea}</Td>
            <Td>{user.joinDate}</Td>
          </TableRow>
        ))}
        {filteredData.length < 10 &&
          Array.from({ length: 10 - filteredData.length }).map((_, i) => (
            <TableRow key={`empty-${i}`}>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <TdLeft>&nbsp;</TdLeft>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default UserTable;

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
