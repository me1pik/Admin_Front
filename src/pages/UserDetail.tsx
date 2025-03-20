// src/pages/UserDetail.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import ListButtonDetailSubHeader, {
  DetailSubHeaderProps,
} from '../components/Header/ListButtonDetailSubHeader';
import DetailTopBoxes from '../components/DetailTopBoxes';
import ShippingTabBar from '../components/TabBar';
import ShippingAddressTable from '../components/ShippingAddressTable';
import UsageHistoryTable from '../components/Table/user/UsageHistoryTable';
import PointHistoryTable from '../components/Table/user/PointHistoryTable';
import AdditionalListTable from '../components/Table/user/AdditionalListTable';
import PersonalEvaluationTable from '../components/Table/user/PersonalEvaluationTable';

// 더미 데이터에서 번호를 가져오기 (예시로 첫번째 제품의 번호 사용)
const dummyProducts = [
  {
    no: 13486,
    // 기타 필드 생략
  },
];

// 탭 목록 배열
const shippingTabs = [
  '배송지 설정',
  '이용내역',
  '포인트 내역',
  '추가목록',
  '개인평가',
];

const UserDetail: React.FC = () => {
  // 현재 활성화된 탭 인덱스 관리
  const [activeTab, setActiveTab] = useState<number>(0);

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

  // 상단 (목록이동/정보수정/종료처리) 버튼 프롭스
  const detailSubHeaderProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: handleBackClick,
    editLabel: '정보수정',
    onEditClick: handleEditClick,
    endLabel: '종료처리',
    onEndClick: handleEndClick,
  };

  // 탭 클릭 핸들러
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  // 활성 탭에 따라 보여줄 테이블 컴포넌트 결정
  const renderTable = () => {
    switch (activeTab) {
      case 0:
        return <ShippingAddressTable />;
      case 1:
        return <UsageHistoryTable />;
      case 2:
        return <PointHistoryTable />;
      case 3:
        return <AdditionalListTable />;
      case 4:
        return <PersonalEvaluationTable />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <HeaderRow>
        <Title>제품관리</Title>
      </HeaderRow>

      <ListButtonDetailSubHeader {...detailSubHeaderProps} />

      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{dummyProducts[0].no}</ProductNumberValue>
      </ProductNumberWrapper>

      <DetailTopBoxes />

      <MiddleDivider />

      {/* 탭 버튼: activeTab과 handleTabClick 전달 */}
      <ShippingTabBar
        tabs={shippingTabs}
        activeIndex={activeTab}
        onTabClick={handleTabClick}
      />

      {/* 활성 탭에 따른 테이블 렌더링 */}
      {renderTable()}
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
