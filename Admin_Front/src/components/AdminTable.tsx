// src/components/AdminTable.tsx
import React from 'react';
import styled from 'styled-components';

interface Admin {
  no: number;
  status: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminTableProps {
  filteredData: Admin[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
  filteredData,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>No.</th>
          <th>상태</th>
          <th>아이디</th>
          <th>이름</th>
          <th>이메일</th>
          <th>권한등급</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((manager, index) => (
          <tr key={index}>
            <td>{manager.no}</td>
            <td>{manager.status}</td>
            <td>{manager.id}</td>
            <td>{manager.name}</td>
            <EmailCell onClick={() => handleEdit(manager.id)}>
              {manager.email}
            </EmailCell>
            <td>{manager.role}</td>
            <td>
              <ActionButton onClick={() => handleEdit(manager.id)}>
                수정
              </ActionButton>
              <ActionButton onClick={() => handleDelete(manager.id)}>
                삭제
              </ActionButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminTable;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 1px solid #dddddd;

  th,
  td {
    padding: 12px;
    text-align: center;
    vertical-align: middle;
    border: none;
  }

  th {
    background-color: #eeeeee;
    font-family: 'NanumSquare Neo OTF', sans-serif;
    font-weight: 800;
    font-size: 12px;
    line-height: 13px;
    color: #000000;
  }

  td {
    font-family: 'NanumSquare Neo OTF', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    color: #000000;
  }

  th:first-child,
  td:first-child {
    width: 40px;
  }

  tr {
    border: 1px solid #dddddd;
    &:last-child td {
      border-bottom: none;
    }
  }
`;

const EmailCell = styled.td`
  cursor: pointer;
  color: #007bff;
  display: inline-block;
  vertical-align: middle;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: #0056b3;
  }
`;

const ActionButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #eeeeee;
  color: #000000;
  border: 1px solid #dddddd;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
    color: #ffffff;
  }
`;
