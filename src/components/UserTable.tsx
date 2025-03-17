// src/components/UserTable.tsx
import React, { useState } from "react";
import styled from "styled-components";

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
  handleEdit: (id: string) => void; // 예: 클릭 시 상세 페이지로 이동 등
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
        <col style={{ width: "40px" }} /> {/* 체크박스 */}
        <col style={{ width: "60px" }} /> {/* No. */}
        <col style={{ width: "60px" }} /> {/* 상태 */}
        <col style={{ width: "60px" }} /> {/* 등급 */}
        <col style={{ width: "100px" }} /> {/* 이름 */}
        <col style={{ width: "100px" }} /> {/* 닉네임 */}
        <col style={{ width: "200px" }} /> {/* 계정(인스타) */}
        <col style={{ width: "120px" }} /> {/* 팔로잉/팔로우 */}
        <col style={{ width: "100px" }} /> {/* 서비스 지역 */}
        <col style={{ width: "100px" }} /> {/* 가입일자 */}
      </colgroup>
      <thead>
        {/* 테이블 헤더 */}
        <TableRow>
          <Th>
            <input
              type="checkbox"
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
                type="checkbox"
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
                <InstaText onClick={() => handleEdit(user.instagram)}>
                  {user.instagram}
                </InstaText>
              </InstaContainer>
            </TdLeft>
            <Td>{user.followingFollower}</Td>
            <Td>{user.serviceArea}</Td>
            <Td>{user.joinDate}</Td>
          </TableRow>
        ))}

        {/* 데이터가 10개 미만이면 빈 행을 추가 */}
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

/** 공통 테이블 스타일 */
const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
`;

/** 행 높이를 44px로 고정 */
const TableRow = styled.tr`
  height: 44px;
`;

const Th = styled.th`
  text-align: center;
  vertical-align: middle;
  background-color: #eeeeee;
  font-family: "NanumSquare Neo OTF", sans-serif;
  font-weight: 800;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  font-family: "NanumSquare Neo OTF", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

/** 인스타 계정 셀만 왼쪽 정렬하고 싶다면 Td에서 상속받아 text-align: left 적용 */
const TdLeft = styled(Td)`
  text-align: left;
`;

/** 인스타 계정 셀(아바타 + 텍스트) */
const InstaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 20px;
`;

/** 아바타(회색 원) */
const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #cccccc; /* 회색 원 */
`;

/** 인스타 계정 텍스트 */
const InstaText = styled.span`
  cursor: pointer;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;
