// src/components/AdminTable.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

/** Admin 인터페이스 (임시 데이터용) */
export interface Admin {
  no: number;
  status: string;
  id: string;
  team: string; // 팀장(또는 팀) 정보
  name: string;
  email: string;
  lastLogin: string; // 최근로그인
  registeredAt: string; // 등록일자
}

/** AdminTable 컴포넌트 Props */
interface AdminTableProps {
  filteredData: Admin[];
  handleEdit: (id: string) => void; // 이메일 클릭 시 수정/상세 페이지로 이동
}

const AdminTable: React.FC<AdminTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  // 선택된 행의 no 값을 저장하는 상태 (체크박스 선택)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const allSelected =
    filteredData.length > 0 && selectedIds.size === filteredData.length;

  // 헤더 전체 선택 체크박스 변경 핸들러
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const all = new Set(filteredData.map((manager) => manager.no));
      setSelectedIds(all);
    } else {
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

  // 접속 기록이 없는 경우 '-'로 표시
  const getLastLogin = (lastLogin: string) => {
    return lastLogin && lastLogin.trim() !== '' ? lastLogin : '-';
  };

  return (
    <Table>
      {/* colgroup을 사용하여 각 열에 개별 고정 너비 지정 */}
      <colgroup>
        <col style={{ width: '40px' }} /> {/* 체크박스 */}
        <col style={{ width: '50px' }} /> {/* No. */}
        <col style={{ width: '50px' }} /> {/* 상태 */}
        <col style={{ width: '100px' }} /> {/* 아이디 */}
        <col style={{ width: '80px' }} /> {/* 팀장 */}
        <col style={{ width: '80px' }} /> {/* 이름 */}
        <col style={{ width: '150px' }} /> {/* 이메일 */}
        <col style={{ width: '100px' }} /> {/* 최근로그인 */}
        <col style={{ width: '100px' }} /> {/* 등록일자 */}
      </colgroup>
      <thead>
        <tr>
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
          <Th>아이디</Th>
          <Th>팀장</Th>
          <Th>이름</Th>
          <Th>이메일</Th>
          <Th>최근로그인</Th>
          <Th>등록일자</Th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((manager, index) => (
          <tr key={index}>
            <Td>
              <input
                type='checkbox'
                checked={selectedIds.has(manager.no)}
                onChange={() => handleRowSelect(manager.no)}
              />
            </Td>
            <Td>{manager.no}</Td>
            <Td>{manager.status}</Td>
            <IdCell title={manager.id}>{manager.id}</IdCell>
            <Td title={manager.team}>{manager.team}</Td>
            <Td title={manager.name}>{manager.name}</Td>
            <EmailCell
              onClick={() => handleEdit(manager.id)}
              title={manager.email}
            >
              {manager.email}
            </EmailCell>
            <Td title={getLastLogin(manager.lastLogin)}>
              {getLastLogin(manager.lastLogin)}
            </Td>
            <Td title={manager.registeredAt}>{manager.registeredAt}</Td>
          </tr>
        ))}
        {filteredData.length < 10 &&
          Array.from({ length: 10 - filteredData.length }).map((_, i) => (
            <tr key={`empty-${i}`} style={{ height: '44px' }}>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
              <Td>&nbsp;</Td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default AdminTable;

/* ====================== Styled Components ====================== */

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #ffffff;
  border: 1px solid #dddddd;
`;

const Th = styled.th`
  padding: 12px;
  text-align: center;
  vertical-align: middle;
  background-color: #eeeeee;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 5ch;
`;

const Td = styled.td`
  padding: 12px;
  text-align: center;
  vertical-align: middle;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 5ch;
`;

const IdCell = styled(Td)`
  /* 추가적으로 최소 5글자 보장 */
  min-width: 5ch;
`;

const EmailCell = styled(Td)`
  cursor: pointer;
  color: #007bff;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 5ch;

  &:hover {
    color: #0056b3;
  }
`;
