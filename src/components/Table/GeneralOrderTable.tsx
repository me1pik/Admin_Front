// src/components/GeneralOrderDetailTable.tsx
import React from 'react';
import styled from 'styled-components';

/** 일반주문 아이템 인터페이스 */
export interface GeneralOrderDetailItem {
  no: number; // No.
  orderDate: string; // 주문일
  buyerAccount: string; // 주문자(계정)
  brand: string; // 브랜드
  styleCode: string; // 스타일(품번)
  size: string; // 사이즈
  color: string; // 제품색상
  paymentMethod: string; // 결제방식
  paymentStatus: string; // 결제상태
}

/** GeneralOrderDetailTable Props */
interface GeneralOrderDetailTableProps {
  filteredData: GeneralOrderDetailItem[];
  handleEdit: (account: string) => void; // 주문자(계정) 클릭 시 이벤트
}

const GeneralOrderDetailTable: React.FC<GeneralOrderDetailTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  // 결제상태 컬러 박스와 레이블 반환 (이미지 예시에 맞춰 색상 지정)
  const getPaymentStyle = (status: string) => {
    switch (status) {
      case '결제완료':
        // 예: 초록
        return { background: '#4AA361', label: '결제완료' };
      case '취소요청':
        // 예: 검정
        return { background: '#000000', label: '취소요청' };
      case '환불 진행중':
        // 예: 벽돌색 or 파랑
        // 예시로 벽돌색(#CD5542) 사용
        return { background: '#CD5542', label: '환불 진행중' };
      case '환불완료':
        // 예: 주황
        return { background: '#F39C12', label: '환불완료' };
      case '결제실패':
        // 예: 회색
        return { background: '#AAAAAA', label: '결제실패' };
      // 필요 시 추가 상태 정의
      default:
        // 기본값 (회색)
        return { background: '#6c757d', label: status };
    }
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: '50px' }} /> {/* No. */}
        <col style={{ width: '100px' }} /> {/* 주문일 */}
        <col style={{ width: '150px' }} /> {/* 주문자(계정) */}
        <col style={{ width: '120px' }} /> {/* 브랜드 */}
        <col style={{ width: '100px' }} /> {/* 스타일(품번) */}
        <col style={{ width: '100px' }} /> {/* 사이즈 */}
        <col style={{ width: '80px' }} /> {/* 제품색상 */}
        <col style={{ width: '80px' }} /> {/* 결제방식 */}
        <col style={{ width: '80px' }} /> {/* 결제상태 */}
      </colgroup>
      <thead>
        <TableRow>
          <Th>No.</Th>
          <Th>주문일</Th>
          <Th>주문자(계정)</Th>
          <Th>브랜드</Th>
          <Th>스타일(품번)</Th>
          <Th>사이즈</Th>
          <Th>제품색상</Th>
          <Th>결제방식</Th>
          <Th>결제상태</Th>
        </TableRow>
      </thead>
      <tbody>
        {filteredData.map((item, idx) => {
          const paymentInfo = getPaymentStyle(item.paymentStatus);
          return (
            <TableRow key={idx}>
              <Td>{item.no}</Td>
              <Td>{item.orderDate}</Td>
              {/* 주문자(계정) 셀: 프로필 이미지와 계정명 */}
              <TdLeft onClick={() => handleEdit(item.buyerAccount)}>
                <AccountContainer>
                  <ProfileCircle />
                  <AccountText>{item.buyerAccount}</AccountText>
                </AccountContainer>
              </TdLeft>
              <Td>{item.brand}</Td>
              <Td>{item.styleCode}</Td>
              <Td>{item.size}</Td>
              <Td>{item.color}</Td>
              <Td>{item.paymentMethod}</Td>
              <Td>
                <StatusBadge
                  style={{ backgroundColor: paymentInfo.background }}
                >
                  {paymentInfo.label}
                </StatusBadge>
              </Td>
            </TableRow>
          );
        })}
        {/* 빈 행 렌더링 */}
        {filteredData.length < 10 &&
          Array.from({ length: 10 - filteredData.length }).map((_, i) => (
            <TableRow key={`empty-${i}`}>
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

export default GeneralOrderDetailTable;

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

/** 주문자 공용 컨테이너 */
const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;
`;

/** 프로필 이미지 (회색 원) */
const ProfileCircle = styled.div`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #cccccc;
`;

/** 주문자 텍스트 */
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
