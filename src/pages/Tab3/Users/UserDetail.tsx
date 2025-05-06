import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ListButtonDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/ListButtonDetailSubHeader';
import UserDetailTopBoxes from '../../../components/UserDetailTopBoxes';
import ShippingTabBar from '../../../components/TabBar';
import ShippingAddressTable, {
  ShippingRow,
} from '../../../components/Table/user/ShippingAddressTable';
import UsageHistoryTable, {
  UsageHistoryRow,
} from '../../../components/Table/user/UsageHistoryTable';
import PointHistoryTable, {
  PointHistoryRow,
} from '../../../components/Table/user/PointHistoryTable';
import AdditionalListTable, {
  AdditionalListRow,
} from '../../../components/Table/user/AdditionalListTable';
import PersonalEvaluationTable, {
  PersonalEvaluationRow,
} from '../../../components/Table/user/PersonalEvaluationTable';
import Pagination from '../../../components/Pagination';
import {
  getUserByEmail,
  UserDetail as UserDetailModel,
} from '../../../api/adminUser';

// 예시 제품 번호
const dummyProducts = [{ no: 5 }];

// 탭 목록
const shippingTabs = [
  '배송지 설정',
  '이용내역',
  '포인트 내역',
  '추가목록',
  '개인평가',
];

// ★ 배송지 설정 예시
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

// ★ 이용내역 예시
const dummyUsageHistory: UsageHistoryRow[] = [
  {
    no: 42,
    applicationDate: '2025-03-10',
    purpose: '대여',
    usagePeriod: '2025-03-04 ~ 2025-03-07 ',
    brand: 'CC Collect',
    style: 'C224MSE231',
    size: '55 (M)',
    color: 'BLACK',
    status: '배송완료',
  },
  {
    no: 41,
    applicationDate: '2025-03-10',
    purpose: '대여',
    usagePeriod: '2025-03-04 ~ 2025-03-07 ',
    brand: 'M.O.D.S/PHINE',
    style: '24/MSE09',
    size: '55 (M)',
    color: 'PINK',
    status: '배송준비중',
  },
  {
    no: 40,
    applicationDate: '2025-03-10',
    purpose: '구매',
    usagePeriod: '2025-03-04 ~ 2025-03-07 ',
    brand: 'M.O.D.S/PHINE',
    style: '24/MSE09',
    size: '55 (M)',
    color: 'BLACK',
    status: '주문취소중',
  },
  {
    no: 39,
    applicationDate: '2025-03-09',
    purpose: '대여',
    usagePeriod: '2025-03-04 ~ 2025-03-07 ',
    brand: 'SATIN',
    style: 'C244T63',
    size: '55 (M)',
    color: 'BLACK',
    status: '배송중',
  },
  {
    no: 38,
    applicationDate: '2025-03-09',
    purpose: '구매',
    usagePeriod: '2025-03-04 ~ 2025-03-07 ',
    brand: 'ZOOC',
    style: 'Z244MSE015',
    size: '55 (M)',
    color: 'PINK',
    status: '배송완료',
  },
  {
    no: 37,
    applicationDate: '2025-03-09',
    purpose: '구매',
    usagePeriod: '2025-03-04 ~ 2025-03-07 ',
    brand: 'ZOOC',
    style: '24/MSE009',
    size: '55 (M)',
    color: 'BLACK',
    status: '주문취소',
  },
  {
    no: 36,
    applicationDate: '2025-03-08',
    purpose: '대여',
    usagePeriod: '2025-03-04 ~ 2025-03-07 ',
    brand: 'ZOOC',
    style: 'Z244MSE015',
    size: '55 (M)',
    color: 'LIGHT BEIGE',
    status: '배송중',
  },
];

// ★ 포인트 내역 예시 (스크린샷과 유사한 형식)
const dummyPointHistory: PointHistoryRow[] = [
  {
    no: 42,
    date: '2025-03-10',
    kind: '적립',
    history: '[23044123980AUMU] 구매 - 포인트 적립',
    changedPoints: '500',
    remainingPoints: '2,500',
  },
  {
    no: 41,
    date: '2025-03-10',
    kind: '적립',
    history: '[23044123980AUMU] 구매 - 포인트 적립',
    changedPoints: '500',
    remainingPoints: '3,000',
  },
  {
    no: 40,
    date: '2025-03-10',
    kind: '차감',
    history: '[23044123980AUMU] 결제 - 포인트 사용',
    changedPoints: '500',
    remainingPoints: '2,500',
  },
  {
    no: 39,
    date: '2025-03-09',
    kind: '적립',
    history: '[23044123980AUMU] 구매 - 포인트 적립',
    changedPoints: '500',
    remainingPoints: '3,000',
  },
  {
    no: 38,
    date: '2025-03-09',
    kind: '차감',
    history: '[23044123980AUMU] 결제 - 포인트 사용',
    changedPoints: '500',
    remainingPoints: '2,500',
  },
  {
    no: 37,
    date: '2025-03-08',
    kind: '차감',
    history: '[23044123980AUMU] 결제 - 포인트 사용',
    changedPoints: '500',
    remainingPoints: '2,000',
  },
];

// ★ 추가 목록 예시
const dummyAdditionalList: AdditionalListRow[] = [
  {
    no: 42,
    registeredDate: '2025-03-10',
    style: 'C244MSE231',
    brand: 'CC Collect',
    category: '원피스',
    color: 'BLACK',
    purchaseSize: '55 (M) / 66 (L) / 77 (XL)',
    retailPrice: '540,000',
  },
  {
    no: 41,
    registeredDate: '2025-03-10',
    style: '24/MSE009',
    brand: 'M.O.D.S/PHINE',
    category: '원피스',
    color: 'PINK',
    purchaseSize: '55 (M) / 66 (L) / 77 (XL)',
    retailPrice: '540,000',
  },
  {
    no: 40,
    registeredDate: '2025-03-10',
    style: '24/MSE009',
    brand: 'M.O.D.S/PHINE',
    category: '원피스',
    color: 'BLACK',
    purchaseSize: '55 (M) / 66 (L) / 77 (XL)',
    retailPrice: '540,000',
  },
  {
    no: 39,
    registeredDate: '2025-03-09',
    style: 'C244T63',
    brand: 'SATIN',
    category: '원피스',
    color: 'BLACK',
    purchaseSize: '55 (M) / 66 (L) / 77 (XL)',
    retailPrice: '600,000',
  },
  {
    no: 38,
    registeredDate: '2025-03-09',
    style: 'Z244MSE015',
    brand: 'ZOOC',
    category: '원피스',
    color: 'PINK',
    purchaseSize: '55 (M) / 66 (L) / 77 (XL)',
    retailPrice: '540,000',
  },
  {
    no: 37,
    registeredDate: '2025-03-09',
    style: '24/MSE009',
    brand: 'ZOOC',
    category: '원피스',
    color: 'BLACK',
    purchaseSize: '55 (M) / 66 (L) / 77 (XL)',
    retailPrice: '500,000',
  },
  {
    no: 36,
    registeredDate: '2025-03-08',
    style: 'Z244MSE015',
    brand: 'ZOOC',
    category: '원피스',
    color: 'LIGHT BEIGE',
    purchaseSize: '55 (M) / 66 (L) / 77 (XL)',
    retailPrice: '540,000',
  },
];

// ★ 개인 평가 예시
const dummyEvaluations: PersonalEvaluationRow[] = [
  {
    no: 42,
    usageType: '대여',
    productNumber: '5',
    serviceQuality: '4점 (만족)',
    usagePeriod: '2025-03-04 ~ 2025-03-07',
    brand: 'CC Collect',
    style: 'C224MSE231',
    size: '55 (M)',
    color: 'BLACK',
  },
  {
    no: 41,
    usageType: '대여',
    productNumber: '5',
    serviceQuality: '5점 (매우만족)',
    usagePeriod: '2025-03-10 ~ 2025-03-14',
    brand: 'M.O.D.S/PHINE',
    style: '24/MSE009',
    size: '55 (M)',
    color: 'PINK',
  },
  {
    no: 40,
    usageType: '구매',
    productNumber: '5',
    serviceQuality: '3점 (보통)',
    usagePeriod: '2025-03-10 ~ 2025-03-14',
    brand: 'M.O.D.S/PHINE',
    style: '24/MSE009',
    size: '55 (M)',
    color: 'BLACK',
  },
];

const UserDetail: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const pageSize = 10;

  // ✅ 여기에 import한 UserDetailModel 타입을 사용
  const [userDetail, setUserDetail] = useState<UserDetailModel | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  // 서브헤더 버튼 핸들러
  const handleBackClick = () => navigate(-1);
  const handleEditClick = () => alert('정보가 수정되었습니다!');
  const handleEndClick = () => alert('종료 처리가 완료되었습니다!');

  const detailSubHeaderProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: handleBackClick,
    editLabel: '정보수정',
    onEditClick: handleEditClick,
    endLabel: '종료처리',
    onEndClick: handleEndClick,
  };

  // URL 파라미터로 넘어온 email로 API 호출
  useEffect(() => {
    if (!email) return;
    (async () => {
      try {
        const decoded = decodeURIComponent(email);
        const data = await getUserByEmail(decoded);
        setUserDetail(data);
      } catch (err) {
        console.error('사용자 상세정보 불러오기 실패:', err);
      }
    })();
  }, [email]);

  // 탭 클릭 시 page=1으로 리셋
  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  // 탭별 데이터 선택
  const activeData = (() => {
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
  })();

  const totalPages = Math.max(1, Math.ceil(activeData.length / pageSize));
  const slicedData = activeData.slice((page - 1) * pageSize, page * pageSize);

  const renderTable = () => {
    switch (activeTab) {
      case 0:
        return <ShippingAddressTable data={slicedData as ShippingRow[]} />;
      case 1:
        return <UsageHistoryTable data={slicedData as UsageHistoryRow[]} />;
      case 2:
        return <PointHistoryTable data={slicedData as PointHistoryRow[]} />;
      case 3:
        return <AdditionalListTable data={slicedData as AdditionalListRow[]} />;
      case 4:
        return (
          <PersonalEvaluationTable
            data={slicedData as PersonalEvaluationRow[]}
          />
        );
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

      {userDetail ? (
        <UserDetailTopBoxes email={userDetail.email} />
      ) : (
        <LoadingText>사용자 정보를 불러오는 중...</LoadingText>
      )}

      <MiddleDivider />

      <ShippingTabBar
        tabs={shippingTabs}
        activeIndex={activeTab}
        onTabClick={handleTabClick}
      />

      {renderTable()}

      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Container>
  );
};

export default UserDetail;

/* ======================= Styled Components ======================= */

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 16px;
`;

const ProductNumberWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin: 10px 0 34px;
`;

const ProductNumberLabel = styled.div`
  font-weight: 700;
  font-size: 12px;
`;

const ProductNumberValue = styled.div`
  font-weight: 900;
  font-size: 12px;
`;

const MiddleDivider = styled.hr`
  border: none;
  border-top: 1px dashed #dddddd;
  margin: 30px 0;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
`;
