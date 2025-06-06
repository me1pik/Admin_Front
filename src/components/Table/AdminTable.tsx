// src/components/Table/AdminTable.tsx

import React from 'react';
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

  // 아래 3가지 props 추가
  selectedIds: Set<number>;
  onSelectChange: (no: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
  filteredData,
  handleEdit,
  selectedIds,
  onSelectChange,
  onSelectAll,
}) => {
  // 모두 선택되었는지 여부
  const allSelected =
    filteredData.length > 0 &&
    filteredData.every((mgr) => selectedIds.has(mgr.no));

  // 접속 기록이 없는 경우 '-'로 표시
  const getLastLogin = (lastLogin: string) => {
    return lastLogin && lastLogin.trim() !== '' ? lastLogin : '-';
  };

  return (
    <Table>
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
              onChange={(e) => onSelectAll(e.target.checked)}
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
        {filteredData.map((manager) => (
          <tr key={manager.no}>
            <Td>
              <input
                type='checkbox'
                checked={selectedIds.has(manager.no)}
                onChange={(e) => onSelectChange(manager.no, e.target.checked)}
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
