import React from 'react';
import styled from 'styled-components';

/** User 인터페이스 */
export interface User {
  no: number;
  email: string;
  status: string;
  grade: string;
  name: string;
  nickname: string;
  instagram: string;
  followingFollower: string;
  serviceArea: string;
  joinDate: string;
}

interface UserTableProps {
  filteredData: User[];
  handleEdit: (no: number) => void;
  selectedRows: Set<number>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const UserTable: React.FC<UserTableProps> = ({
  filteredData,
  handleEdit,
  selectedRows,
  setSelectedRows,
}) => {
  const allSelected =
    filteredData.length > 0 && selectedRows.size === filteredData.length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(filteredData.map((user) => user.no)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (no: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(no)) newSet.delete(no);
      else newSet.add(no);
      return newSet;
    });
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: '40px' }} />
        <col style={{ width: '50px' }} />
        <col style={{ width: '50px' }} />
        <col style={{ width: '50px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: '150px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '100px' }} />
        <col style={{ width: '100px' }} />
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
          <Th>계정(이메일)</Th>
          <Th>팔로잉/팔로우</Th>
          <Th>서비스 지역</Th>
          <Th>가입일자</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((user) => (
          <TableRow key={user.no}>
            <Td>
              <input
                type='checkbox'
                checked={selectedRows.has(user.no)}
                onChange={() => handleRowSelect(user.no)}
              />
            </Td>
            <Td>{user.no}</Td>
            <Td>{user.status}</Td>
            <Td>{user.grade}</Td>
            <Td>{user.name}</Td>
            <Td>{user.nickname}</Td>
            <TdLeft>
              <InstaContainer>
                <Avatar />
                <InstaText onClick={() => handleEdit(user.no)}>
                  {user.email}
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
              {Array(10).fill(<Td>&nbsp;</Td>)}
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default UserTable;

/* Styled Components */
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
  & > span {
    flex: 1;
    min-width: 0;
  }
`;
const Avatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #cccccc;
`;
const InstaText = styled.span`
  cursor: pointer;
  color: #007bff;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    color: #0056b3;
  }
`;
