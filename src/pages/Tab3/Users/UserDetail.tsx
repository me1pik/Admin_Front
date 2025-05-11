// src/pages/UserDetail.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import Holidays from 'date-holidays';
import 'react-datepicker/dist/react-datepicker.css';
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
import PaymentMethodTable, {
  PaymentMethodRow,
} from '../../../components/Table/user/PaymentMethodTable';
import LicenseHistoryTable, {
  LicenseHistoryRow,
} from '../../../components/Table/user/LicenseHistoryTable';
import Pagination from '../../../components/Pagination';
import {
  getUserByEmail,
  getUserClosetByEmail,
  UserDetail as UserDetailModel,
  ClosetItem,
} from '../../../api/adminUser';

// 한글 로케일 등록
registerLocale('ko', ko);
// date-holidays 초기화 (KR 공휴일)
const hd = new Holidays('KR');

// 요일·공휴일 색 지정
const GlobalStyle = createGlobalStyle`
  .day-holiday { color: red !important; }
  .day-sunday  { color: red !important; }
  .day-saturday{ color: blue !important; }
`;

// --- 더미 데이터 ---
const dummyProducts = [{ no: 5 }];

const shippingTabs = [
  '배송지 설정',
  '이용내역',
  '포인트 내역',
  '추가목록',
  '개인평가',
  '결재수단',
  '이용권 내역',
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
const dummyPaymentMethods: PaymentMethodRow[] = [
  {
    no: 3,
    cardCompany: '신한',
    cardNumber: '2025 - ○○○○ - ○○○○ - 1234',
    status: '이용중',
    registeredDate: '2025-05-01',
  },
  {
    no: 2,
    cardCompany: 'KB국민',
    cardNumber: '2025 - ○○○○ - ○○○○ - 1234',
    status: '사용불가',
    registeredDate: '2025-05-01',
  },
  {
    no: 1,
    cardCompany: '삼성',
    cardNumber: '2025 - ○○○○ - ○○○○ - 1234',
    status: '사용불가',
    registeredDate: '2025-05-01',
  },
];

const dummyLicenseHistory: LicenseHistoryRow[] = [
  {
    no: 3,
    type: '정기 구독권',
    paymentDate: '2025-05-01',
    nextPaymentDate: '2025-06-01',
    code: 'GPX42NABZ2O6NFHY',
    period: '2025-05-01 ~ 2025-05-31',
    amount: '120,000',
    status: '이용중',
    cancelRequestDate: undefined,
  },
  {
    no: 2,
    type: '1회 이용권',
    paymentDate: '2025-05-01',
    nextPaymentDate: undefined,
    code: '25HYX9YMFXBBFSOP',
    period: undefined,
    amount: '50,000',
    status: '취소',
    cancelRequestDate: '2025-05-01',
  },
  {
    no: 1,
    type: '1회 이용권',
    paymentDate: '2025-04-21',
    nextPaymentDate: undefined,
    code: '00ZVNTTTB25HJT9Z',
    period: '2025-04-21 ~ 2025-05-20',
    amount: '50,000',
    status: '이용완료',
    cancelRequestDate: undefined,
  },
];

const UserDetail: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const pageSize = 10;

  // 사용자 상세 정보
  const [userDetail, setUserDetail] = useState<UserDetailModel | null>(null);
  // 찜목록
  const [closetItems, setClosetItems] = useState<AdditionalListRow[]>([]);
  // 탭
  const [activeTab, setActiveTab] = useState<number>(0);

  // 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [licenseType, setLicenseType] = useState<string>('1회 이용권');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  );
  const [licenseCode, setLicenseCode] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const detailSubHeaderProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: () => navigate(-1),
    editLabel: '정보수정',
    onEditClick: () => alert('정보수정!'),
    endLabel: '종료처리',
    onEndClick: () => alert('종료처리!'),
  };

  // 사용자 정보 조회
  useEffect(() => {
    if (!email) return;
    (async () => {
      try {
        const data = await getUserByEmail(decodeURIComponent(email));
        setUserDetail(data);
      } catch (err) {
        console.error('사용자 정보 조회 실패', err);
      }
    })();
  }, [email]);

  // 찜목록 조회
  useEffect(() => {
    if (!email) return;
    (async () => {
      try {
        const res = await getUserClosetByEmail(decodeURIComponent(email));
        const mapped = res.items.map((item: ClosetItem, idx: number) => ({
          no: idx + 1,
          registeredDate: item.registration_date,
          style: item.name,
          brand: item.brand,
          category: item.category,
          color: item.color,
          purchaseSize: '',
          retailPrice: item.price.toString(),
        }));
        setClosetItems(mapped);
      } catch (err) {
        console.error('찜목록 조회 실패', err);
      }
    })();
  }, [email]);

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  const activeData =
    [
      dummyShippingData,
      dummyUsageHistory,
      dummyPointHistory,
      closetItems,
      dummyEvaluations,
      dummyPaymentMethods,
      dummyLicenseHistory,
    ][activeTab] || [];

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
      case 5:
        return <PaymentMethodTable data={slicedData as PaymentMethodRow[]} />;
      case 6:
        return <LicenseHistoryTable data={slicedData as LicenseHistoryRow[]} />;
      default:
        return null;
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsCalendarOpen(false);
  };
  const handleAddLicense = () => {
    console.log({
      licenseType,
      period: `${format(startDate!, 'yyyy.MM.dd')} ~ ${format(endDate!, 'yyyy.MM.dd')}`,
      code: licenseCode,
    });
    closeModal();
  };

  return (
    <Container>
      <GlobalStyle />
      {/* 헤더 */}
      <HeaderRow>
        <Title>제품관리</Title>
      </HeaderRow>
      <ListButtonDetailSubHeader {...detailSubHeaderProps} />

      {/* 제품 번호 */}
      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{dummyProducts[0].no}</ProductNumberValue>
      </ProductNumberWrapper>

      {/* 사용자 정보 */}
      {userDetail ? (
        <UserDetailTopBoxes email={userDetail.email} />
      ) : (
        <LoadingText>사용자 정보를 불러오는 중...</LoadingText>
      )}

      <MiddleDivider />

      {/* 탭바 */}
      <ShippingTabBar
        tabs={shippingTabs}
        activeIndex={activeTab}
        onTabClick={handleTabClick}
      />

      {/* 데이터 테이블 */}
      {renderTable()}

      {/* 페이지네이션 & 버튼 */}
      <FooterRow>
        {activeTab === 6 && (
          <AddButton onClick={openModal}>이용권 추가</AddButton>
        )}
        <Pagination totalPages={totalPages} />
      </FooterRow>

      {/* 모달 */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            {/* 모달 헤더 */}
            <ModalHeader>
              <ModalTitle>이용권 추가</ModalTitle>
              <CloseButton onClick={closeModal}>×</CloseButton>
            </ModalHeader>
            <Divider />

            {/* 이용권 종류 */}
            <FieldGroup>
              <FieldLabel>이용권 종류 설정</FieldLabel>
              <StyledSelect
                value={licenseType}
                onChange={(e) => setLicenseType(e.target.value)}
              >
                <option>1회 이용권</option>
                <option>정기 구독권</option>
              </StyledSelect>
            </FieldGroup>
            <Divider />

            {/* 이용기간 설정 */}
            <FieldGroup>
              <FieldLabel>이용기간 설정</FieldLabel>
              <DatePreviewContainer>
                <DatePreviewText>
                  {startDate ? format(startDate, 'yyyy.MM.dd') : '시작일 선택'}{' '}
                  ~ {endDate ? format(endDate, 'yyyy.MM.dd') : '종료일 선택'}
                </DatePreviewText>
                <ChangeButton
                  onClick={() => setIsCalendarOpen((prev) => !prev)}
                >
                  설정변경
                </ChangeButton>
              </DatePreviewContainer>

              {isCalendarOpen && (
                <CalendarContainer>
                  <DatePicker
                    locale='ko'
                    inline
                    monthsShown={2}
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    selected={startDate}
                    onChange={(d) => {
                      if (Array.isArray(d)) {
                        const [newStart, newEnd] = d;
                        setStartDate(newStart ?? undefined);
                        setEndDate(newEnd ?? undefined);
                        // 종료일까지 선택되면 캘린더 자동 숨김
                        if (newEnd) {
                          setIsCalendarOpen(false);
                        }
                      }
                    }}
                    dayClassName={(date) => {
                      if (hd.isHoliday(date)) return 'day-holiday';
                      if (date.getDay() === 0) return 'day-sunday';
                      if (date.getDay() === 6) return 'day-saturday';
                      return '';
                    }}
                  />
                </CalendarContainer>
              )}

              <FieldLabel>이용권 코드</FieldLabel>
              <CodeInput
                placeholder='Code | PASSI3Y8OTXFXTSG'
                value={licenseCode}
                onChange={(e) => setLicenseCode(e.target.value)}
              />
            </FieldGroup>

            <SubmitButton onClick={handleAddLicense}>추가하기</SubmitButton>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default UserDetail;

/* Styled Components */
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
  border-top: 1px dashed #ddd;
  margin: 30px 0;
`;
const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;
const AddButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 14px;
  font-weight: 700;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
`;
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalBox = styled.div`
  max-width: 600px;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;
const ModalHeader = styled.div`
  position: relative;
  padding: 16px 24px;
`;
const ModalTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #000;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 24px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;
const Divider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid #ddd;
`;
const FieldGroup = styled.div`
  padding: 16px 24px;
`;
const FieldLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 8px;
`;
const StyledSelect = styled.select`
  width: 100%;
  height: 57px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 800;
  border: 1px solid #000;
  border-radius: 4px;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg fill='black' height='10' viewBox='0 0 10 10'><path d='M0 0 L5 5 L10 0 Z'/></svg>")
    no-repeat right 12px center #fff;
`;
const DatePreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 0 12px;
  height: 57px;
  margin-bottom: 12px;
`;
const DatePreviewText = styled.div`
  font-size: 13px;
  font-weight: 800;
`;
const ChangeButton = styled.button`
  background: #000;
  color: #fff;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
// 기존 CalendarContainer를 아래처럼 교체

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 스택 */
  align-items: center;
  background: #fff;
  border-radius: 8px;
  margin: 30px 0;

  /* react-datepicker가 monthsShown={2}일 때 기본 float 스타일을 없애고, 블록으로 세로 배치 */
  .react-datepicker__month-container {
    float: none !important;
    display: block !important;
    margin: 0 auto 16px; /* 아래 월과의 간격 */
  }

  /* 마지막 달에는 아래 마진 제거 */
  .react-datepicker__month-container:last-child {
    margin-bottom: 0;
  }

  /* 필요시, 월별 헤더 가운데 정렬 추가 */
  .react-datepicker__current-month {
    text-align: center;
    width: 100%;
  }
`;

const CodeInput = styled.input`
  width: 100%;
  height: 57px;
  padding: 0 12px;
  font-size: 13px;
  color: #999;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 12px;
  box-sizing: border-box;
`;
const SubmitButton = styled.button`
  display: block;
  width: calc(100% - 48px); /* 좌우 24px 여백 제외 */
  height: 56px;
  background: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  border: none;
  cursor: pointer;
  margin: 24px auto; /* 상하 24px, 자동 가운데 정렬 */
  border-radius: 4px;
`;
