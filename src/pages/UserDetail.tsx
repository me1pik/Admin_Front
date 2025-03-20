// src/pages/UserDetail.tsx
import React from 'react';
import styled from 'styled-components';
import ListButtonDetailSubHeader, {
  DetailSubHeaderProps,
} from '../components/Header/ListButtonDetailSubHeader';

import DetailTopBoxes from '../components/DetailTopBoxes';
import ShippingTabBar from '../components/ShippingTabBar';
import ShippingAddressTable from '../components/ShippingAddressTable';

// 더미 데이터에서 번호를 가져오기 (예시로 첫번째 제품의 번호 사용)
const dummyProducts = [
  {
    no: 13486,
    // 기타 필드 생략
  },
];

const UserDetail: React.FC = () => {
  /** 목록으로 버튼 클릭 시 */
  const handleBackClick = () => {
    console.log('목록으로 버튼 클릭됨');
    window.history.back();
  };

  /** 정보수정 버튼 클릭 시 */
  const handleEditClick = () => {
    console.log('정보수정 버튼 클릭 -> 정보 수정 로직 실행');
    alert('정보가 수정되었습니다!');
  };

  /** 종료처리 버튼 클릭 시 */
  const handleEndClick = () => {
    console.log('종료처리 버튼 클릭 -> 종료 처리 로직 실행');
    alert('종료 처리가 완료되었습니다!');
  };

  // 상단 (목록이동/정보수정/종료처리) 버튼
  const detailSubHeaderProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: handleBackClick,
    editLabel: '정보수정',
    onEditClick: handleEditClick,
    endLabel: '종료처리',
    onEndClick: handleEndClick,
  };

  return (
    <Container>
      {/* 상단 헤더 영역 */}
      <HeaderRow>
        <Title>제품관리</Title>
      </HeaderRow>

      {/* 목록이동 / 정보수정 / 종료처리 버튼 */}
      <ListButtonDetailSubHeader {...detailSubHeaderProps} />

      {/* 번호 표시 */}
      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{dummyProducts[0].no}</ProductNumberValue>
      </ProductNumberWrapper>

      {/* 상단 3박스 영역 */}
      <DetailTopBoxes />

      <MiddleDivider />

      {/* 탭 버튼: 배송지 설정 / 이용내역 / 포인트 내역 / 추가목록 / 개인평가 */}
      <ShippingTabBar activeIndex={0} />

      {/* 배송지 테이블 */}
      <ShippingAddressTable />
    </Container>
  );
};

export default UserDetail;

/* ====================== Styled Components ====================== */

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
`;

const ProductNumberWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin: 10px 0;
  margin-top: 34px;
`;

const ProductNumberLabel = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #000000;
`;

const ProductNumberValue = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
`;

const MiddleDivider = styled.hr`
  border: 0;
  border-top: 1px dashed #dddddd;
  margin: 30px 0;
`;
