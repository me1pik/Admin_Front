// src/pages/UserDetail.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import ListButtonDetailSubHeader, {
  DetailSubHeaderProps,
} from '../components/Header/ListButtonDetailSubHeader';
import DetailTopBoxes from '../components/DetailTopBoxes';
import ShippingTabBar from '../components/TabBar';
import ShippingAddressTable, {
  ShippingRow,
} from '../components/Table/user/ShippingAddressTable';
import UsageHistoryTable, {
  UsageHistoryRow,
} from '../components/Table/user/UsageHistoryTable';
import PointHistoryTable, {
  PointHistoryRow,
} from '../components/Table/user/PointHistoryTable';
import AdditionalListTable, {
  AdditionalListRow,
} from '../components/Table/user/AdditionalListTable';
import PersonalEvaluationTable, {
  PersonalEvaluationRow,
} from '../components/Table/user/PersonalEvaluationTable';
import Pagination from '../components/Pagination';

// 예시 제품 번호
const dummyProducts = [
  {
    no: 13486,
  },
];

// 탭 목록
const shippingTabs = [
  '배송지 설정',
  '이용내역',
  '포인트 내역',
  '추가목록',
  '개인평가',
];

// 각 테이블에 전달할 더미 데이터 (데이터가 10행 이하인 경우 나머지는 빈 행으로 표시됨)
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
];

const dummyUsageHistory: UsageHistoryRow[] = [
  {
    date: '2025-03-01',
    orderNumber: 'ORD12345',
    productName: '상품 A',
    status: '완료',
    amount: '120,000원',
  },
  {
    date: '2025-02-27',
    orderNumber: 'ORD12346',
    productName: '상품 B',
    status: '취소',
    amount: '80,000원',
  },
  {
    date: '2025-02-25',
    orderNumber: 'ORD12347',
    productName: '상품 C',
    status: '진행중',
    amount: '150,000원',
  },
];

const dummyPointHistory: PointHistoryRow[] = [
  {
    date: '2025-03-01',
    description: '구매 적립',
    points: '+50',
  },
  {
    date: '2025-02-28',
    description: '포인트 사용',
    points: '-30',
  },
];

const dummyAdditionalList: AdditionalListRow[] = [
  {
    item: '추가 항목 1',
    detail: '세부 내용 1',
    status: '활성',
  },
  {
    item: '추가 항목 2',
    detail: '세부 내용 2',
    status: '비활성',
  },
];

const dummyEvaluations: PersonalEvaluationRow[] = [
  {
    item: '서비스 품질',
    score: 4,
    comment: '전반적으로 만족합니다.',
  },
  {
    item: '배송 속도',
    score: 5,
    comment: '매우 빠릅니다!',
  },
];

const UserDetail: React.FC = () => {
  // 현재 활성화된 탭 인덱스와 페이지 상태 관리
  const [activeTab, setActiveTab] = useState<number>(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  /** 버튼 핸들러들 */
  const handleBackClick = () => {
    window.history.back();
  };

  const handleEditClick = () => {
    alert('정보가 수정되었습니다!');
  };

  const handleEndClick = () => {
    alert('종료 처리가 완료되었습니다!');
  };

  const detailSubHeaderProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: handleBackClick,
    editLabel: '정보수정',
    onEditClick: handleEditClick,
    endLabel: '종료처리',
    onEndClick: handleEndClick,
  };

  // 탭 클릭 시 페이지를 1로 초기화
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setPage(1);
  };

  // 현재 활성 탭에 해당하는 전체 데이터 반환
  const getActiveData = (): any[] => {
    switch (activeTab) {
      case 0:
        return dummyShippingData;
      case 1:
        return dummyUsageHistory;
      case 2:
        return dummyPointHistory;
      case 3:
        return dummyAdditionalList;
      case 4:
        return dummyEvaluations;
      default:
        return [];
    }
  };

  const activeData = getActiveData();
  const totalPages = Math.max(1, Math.ceil(activeData.length / pageSize));

  // 현재 페이지에 해당하는 데이터 슬라이스
  const sliceData = (data: any[]) =>
    data.slice((page - 1) * pageSize, page * pageSize);

  const renderTable = () => {
    const slicedData = sliceData(activeData);
    switch (activeTab) {
      case 0:
        return <ShippingAddressTable data={slicedData} />;
      case 1:
        return <UsageHistoryTable data={slicedData} />;
      case 2:
        return <PointHistoryTable data={slicedData} />;
      case 3:
        return <AdditionalListTable data={slicedData} />;
      case 4:
        return <PersonalEvaluationTable data={slicedData} />;
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

      <ShippingTabBar
        tabs={shippingTabs}
        activeIndex={activeTab}
        onTabClick={handleTabClick}
      />

      {renderTable()}

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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
