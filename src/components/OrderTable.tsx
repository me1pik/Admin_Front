// src/components/OrderTable.tsx
import React, { useState } from "react";
import styled from "styled-components";

/** 주문 인터페이스 */
export interface Order {
  no: number; // No.
  orderDate: string; // 주문일
  buyerAccount: string; // 주문자 (계정)
  brand: string; // 브랜드
  styleCode: string; // 스타일 (행정 코드)
  size: string; // 사이즈
  productOption: string; // 제품명/옵션
  paymentMethod: string; // 결제방법
  paymentStatus: string; // 결제상태 (결제 완료, 취소일정 등)
}

/** OrderTable Props */
interface OrderTableProps {
  filteredData: Order[];
  handleEdit: (account: string) => void; // 주문자(계정) 클릭 시 이벤트
}

const OrderTable: React.FC<OrderTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const allSelected =
    filteredData.length > 0 && selectedIds.size === filteredData.length;

  // 전체 선택/해제
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const all = new Set(filteredData.map((item) => item.no));
      setSelectedIds(all);
    } else {
      setSelectedIds(new Set());
    }
  };

  // 개별 행 선택
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

  // 결제상태 배경색 + 텍스트(흰색)
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "결제 완료":
        return { background: "#3071B2", label: "결제완료" };
      case "취소일정":
        return { background: "#000000", label: "취소일정" };
      case "환불 진행중":
        return { background: "#CD5542", label: "환불진행" };
      case "환불 완료":
        return { background: "#F69636", label: "환불완료" };
      case "결제실패":
        return { background: "#AAAAAA", label: "결제실패" };
      default:
        return { background: "#000000", label: status };
    }
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: "40px" }} /> {/* 체크박스 */}
        <col style={{ width: "70px" }} /> {/* No. */}
        <col style={{ width: "100px" }} /> {/* 주문일 */}
        <col style={{ width: "100px" }} /> {/* 주문자 (계정) */}
        <col style={{ width: "100px" }} /> {/* 브랜드 */}
        <col style={{ width: "120px" }} /> {/* 스타일(행정) */}
        <col style={{ width: "80px" }} /> {/* 사이즈 */}
        <col style={{ width: "80px" }} /> {/* 제품명/옵션 */}
        <col style={{ width: "80px" }} /> {/* 결제방법 */}
        <col style={{ width: "80px" }} /> {/* 결제상태 (맨 오른쪽) */}
      </colgroup>
      <thead>
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
          <Th>주문일</Th>
          <Th>주문자 (계정)</Th>
          <Th>브랜드</Th>
          <Th>스타일(행정)</Th>
          <Th>사이즈</Th>
          <Th>제품명/옵션</Th>
          <Th>결제방법</Th>
          <Th>결제상태</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((order, index) => {
          const statusInfo = getStatusStyle(order.paymentStatus);
          return (
            <TableRow key={index}>
              <Td>
                <input
                  type="checkbox"
                  checked={selectedIds.has(order.no)}
                  onChange={() => handleRowSelect(order.no)}
                />
              </Td>
              <Td>{order.no}</Td>
              <Td>{order.orderDate}</Td>
              {/* 주문자(계정) 셀: 프로필 이미지(회색 원) + 텍스트 */}
              <TdLeft onClick={() => handleEdit(order.buyerAccount)}>
                <AccountContainer>
                  <ProfileCircle />
                  <AccountText>{order.buyerAccount}</AccountText>
                </AccountContainer>
              </TdLeft>
              <Td>{order.brand}</Td>
              <Td>{order.styleCode}</Td>
              <Td>{order.size}</Td>
              <Td>{order.productOption}</Td>
              <Td>{order.paymentMethod}</Td>
              <Td>
                <StatusBadge style={{ backgroundColor: statusInfo.background }}>
                  {statusInfo.label}
                </StatusBadge>
              </Td>
            </TableRow>
          );
        })}

        {/* 빈 행 렌더링 시 주문자 셀에는 프로필 이미지 없이 빈 공간만 표시 */}
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
              <Td>&nbsp;</Td>
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default OrderTable;

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

/** 주문자(계정) 셀: 왼쪽 정렬 */
const TdLeft = styled(Td)`
  text-align: left;
`;

/** 주문자 및 인스타 계정 공용 컨테이너 */
const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 20px;
`;

/** 프로필 이미지 (회색 원) - shrink 방지 */
const ProfileCircle = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #cccccc;
`;

/** 계정 텍스트: 최소 3글자 이상 보이고, 공간 부족 시 "..." 처리 */
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

/** 결제상태 박스 (흰색 텍스트) */
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
