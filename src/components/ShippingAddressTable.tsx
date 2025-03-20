// src/components/userdetail/ShippingAddressTable.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

/** 배송지 정보 타입(예시) */
interface ShippingRow {
  type: string; // 수령지 (자택, 기타 등)
  name: string; // 수령인
  address: string; // 배송지
  phone1: string; // 연락처1
  phone2: string; // 연락처2
  isDefault: boolean; // 기본설정 여부
}

/** 예시 데이터 하드코딩 */
const dummyShippingData: ShippingRow[] = [
  {
    type: '자택',
    name: '홍길동',
    address: '서울 금천구 디지털로9길 41, 삼성IT해링턴타워 1008호',
    phone1: '010-1234-5678',
    phone2: '010-1234-5678',
    isDefault: true,
  },
  {
    type: '자택',
    name: '홍길동',
    address: '서울 금천구 디지털로9길 41, 삼성IT해링턴타워 1008호',
    phone1: '010-1234-5678',
    phone2: '010-1234-5678',
    isDefault: false,
  },
  {
    type: '자택',
    name: '홍길동',
    address: '서울 금천구 디지털로9길 41, 삼성IT해링턴타워 1008호',
    phone1: '010-1234-5678',
    phone2: '010-1234-5678',
    isDefault: false,
  },
  {
    type: '자택',
    name: '홍길동',
    address: '서울 금천구 디지털로9길 41, 삼성IT해링턴타워 1008호',
    phone1: '010-1234-5678',
    phone2: '010-1234-5678',
    isDefault: false,
  },
  {
    type: '자택',
    name: '홍길동',
    address: '서울 금천구 디지털로9길 41, 삼성IT해링턴타워 1008호',
    phone1: '010-1234-5678',
    phone2: '010-1234-5678',
    isDefault: false,
  },
  {
    type: '기타',
    name: '홍길동',
    address: '대구 달성군 다사읍 달구벌대로 842-7 강창훼밀리아파트 103동 906호',
    phone1: '010-1234-5678',
    phone2: '010-1234-5678',
    isDefault: false,
  },
  {
    type: '자택',
    name: '홍길동',
    address: '서울 금천구 디지털로9길 41, 삼성IT해링턴타워 1008호',
    phone1: '010-1234-5678',
    phone2: '010-1234-5678',
    isDefault: false,
  },
];

const ShippingAddressTable: React.FC = () => {
  // 각 행의 선택 상태를 저장하는 상태 (행의 인덱스를 Set으로 관리)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const allSelected =
    dummyShippingData.length > 0 &&
    selectedRows.size === dummyShippingData.length;

  // 헤더 전체 선택 체크박스 핸들러
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // 모든 행 선택
      setSelectedRows(new Set(dummyShippingData.map((_, idx) => idx)));
    } else {
      // 전체 해제
      setSelectedRows(new Set());
    }
  };

  // 개별 행 선택 체크박스 핸들러
  const handleRowSelect = (idx: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  return (
    <TableContainer>
      <StyledTable>
        <colgroup>
          <col style={{ width: '40px' }} /> {/* 체크박스 열 */}
          <col style={{ width: '80px' }} /> {/* 수령지 */}
          <col style={{ width: '80px' }} /> {/* 이름 */}
          <col style={{ width: '300px' }} /> {/* 배송지 */}
          <col style={{ width: '100px' }} /> {/* 연락처1 */}
          <col style={{ width: '100px' }} /> {/* 연락처2 */}
          <col style={{ width: '80px' }} /> {/* 기본설정 */}
        </colgroup>
        <thead>
          <tr>
            <ThCheckbox>
              <input
                type='checkbox'
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </ThCheckbox>
            <Th>수령지</Th>
            <Th>이름</Th>
            <Th>배송지</Th>
            <Th>연락처1</Th>
            <Th>연락처2</Th>
            <Th>기본설정</Th>
          </tr>
        </thead>
        <tbody>
          {dummyShippingData.map((row, idx) => (
            <tr key={idx}>
              <TdCheckbox>
                <input
                  type='checkbox'
                  checked={selectedRows.has(idx)}
                  onChange={() => handleRowSelect(idx)}
                />
              </TdCheckbox>
              <Td>{row.type}</Td>
              <Td>{row.name}</Td>
              <Td>{row.address}</Td>
              <Td>{row.phone1}</Td>
              <Td>{row.phone2}</Td>
              <Td>{row.isDefault ? 'Y' : 'N'}</Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default ShippingAddressTable;

/* ====================== Styled Components ====================== */

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;

  border: 1px solid #dddddd;
  border-radius: 4px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  background-color: #ffffff;
`;

const Th = styled.th`
  height: 40px;
  border: 1px solid #dddddd;
  background-color: #eeeeee;
  font-weight: 800;
  font-size: 12px;
  color: #000000;
  text-align: center;
`;

const ThCheckbox = styled(Th)`
  width: 40px;
`;

const Td = styled.td`
  height: 44px;
  border: 1px solid #dddddd;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  text-align: center;
  vertical-align: middle;
`;

const TdCheckbox = styled(Td)`
  width: 40px;
`;
