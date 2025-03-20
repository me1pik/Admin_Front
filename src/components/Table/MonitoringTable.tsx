// src/components/MonitoringTable.tsx
import React from 'react';
import styled from 'styled-components';

/** 모니터링 아이템 인터페이스 */
export interface MonitoringItem {
  no: number; // No.
  orderDate: string; // 주문일
  name: string; // 이름
  buyerAccount: string; // 주문자(계정)
  brand: string; // 브랜드
  styleCode: string; // 스타일(행정)
  size: string; // 사이즈
  shippingMethod: string; // 배송방식
  shippingStatus: string; // 배송상태 (배송완료, 배송 준비중, 배송취소중, 배송 취소 등)
}

/** MonitoringTable Props */
interface MonitoringTableProps {
  filteredData: MonitoringItem[];
  handleEdit: (account: string) => void; // 주문자(계정) 클릭 시 이벤트
}

const MonitoringTable: React.FC<MonitoringTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  // 배송상태 컬러 박스와 레이블 반환
  const getShippingStyle = (status: string) => {
    switch (status) {
      case '배송완료':
        return { background: '#4AA361', label: '배송완료' };
      case '배송준비중':
        return { background: '#000000', label: '배송준비중' };
      case '배송취소중':
        return { background: '#CD5542', label: '배송취소중' };
      case '배송취소':
        return { background: '#AAAAAA', label: '배송취소' };
      case '배송중':
        return { background: '#3071B2', label: '배송중' };
      default:
        return { background: '#6c757d', label: status };
    }
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: '50px' }} /> {/* No. */}
        <col style={{ width: '100px' }} /> {/* 주문일 */}
        <col style={{ width: '80px' }} /> {/* 이름 */}
        <col style={{ width: '150px' }} /> {/* 주문자(계정) */}
        <col style={{ width: '120px' }} /> {/* 브랜드 */}
        <col style={{ width: '100px' }} /> {/* 스타일(행정) */}
        <col style={{ width: '100px' }} /> {/* 사이즈 */}
        <col style={{ width: '80px' }} /> {/* 배송방식 */}
        <col style={{ width: '80px' }} /> {/* 배송상태 */}
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>주문일</Th>
          <Th>이름</Th>
          <Th>주문자(계정)</Th>
          <Th>브랜드</Th>
          <Th>스타일(코드)</Th>
          <Th>사이즈</Th>
          <Th>배송방식</Th>
          <Th>배송상태</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((item, idx) => {
          const shippingInfo = getShippingStyle(item.shippingStatus);
          return (
            <TableRow key={idx}>
              <Td>{item.no}</Td>
              <Td>{item.orderDate}</Td>
              <Td>{item.name}</Td>
              {/* 주문자(계정) 셀: 프로필 이미지 없이 AccountContainer와 AccountText만 */}
              <TdLeft onClick={() => handleEdit(item.buyerAccount)}>
                <AccountContainer>
                  <ProfileCircle />
                  <AccountText>{item.buyerAccount}</AccountText>
                </AccountContainer>
              </TdLeft>
              <Td>{item.brand}</Td>
              <Td>{item.styleCode}</Td>
              <Td>{item.size}</Td>
              <Td>{item.shippingMethod}</Td>
              <Td>
                <StatusBadge
                  style={{ backgroundColor: shippingInfo.background }}
                >
                  {shippingInfo.label}
                </StatusBadge>
              </Td>
            </TableRow>
          );
        })}
        {/* 빈 행 렌더링 시, 주문자 셀은 프로필 이미지 없이 빈 텍스트 */}
        {filteredData.length < 10 &&
          Array.from({ length: 10 - filteredData.length }).map((_, i) => (
            <TableRow key={`empty-${i}`}>
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
  );
};

export default MonitoringTable;

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

/** 주문자(계정) 셀: 왼쪽 정렬 */
const TdLeft = styled(Td)`
  text-align: left;
`;

/** 주문자 및 인스타 계정 공용 컨테이너 */
const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;
`;

/** 프로필 이미지 (회색 원) - shrink 방지 */
const ProfileCircle = styled.div`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #cccccc;
`;

/** 주문자 텍스트: 최소 3글자 이상 보이고, 공간 부족 시 "..." 처리 */
const AccountText = styled.span`
  display: inline-block;
  min-width: 3ch;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  cursor: pointer;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

/** 배송상태 박스 (흰색 텍스트) */
const StatusBadge = styled.div`
  display: inline-block;
  border-radius: 4px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  font-size: 10px;
  font-weight: 800;
  color: #ffffff;
  text-align: center;
  vertical-align: middle;
`;
