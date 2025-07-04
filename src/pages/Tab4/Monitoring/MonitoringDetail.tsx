// src/pages/Tab4/Monitoring/MonitoringDetail.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import SettingsDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/SettingsDetailSubHeader';
import OrderDetailTopBoxes from '../../../components/OrderDetailTopBoxes';
import ReusableModal2 from '../../../components/OneButtonModal';
import Spinner from '../../../components/Spinner';

import {
  getRentalScheduleDetail,
  updateRentalScheduleStatus,
  RentalScheduleAdminDetailResponse,
  UpdateRentalStatusRequest,
  changeRentalSchedulePeriod,
} from '../../../api/RentalSchedule/RentalScheduleApi';

import {
  getRentalScheduleByRentalId,
  RentalScheduleAdminByRentalIdResponse,
} from '../../../api/RentalSchedule/RentalScheduleApi';

interface MonitoringDetailProps {
  isCreate?: boolean;
}

const MonitoringDetail: React.FC<MonitoringDetailProps> = ({
  isCreate = false,
}) => {
  const navigate = useNavigate();
  const { no } = useParams<{ no: string }>();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const numericNo = isCreate ? undefined : Number(no);

  // ─── 헤더 정보 state ───
  const [headerInfo, setHeaderInfo] =
    useState<RentalScheduleAdminByRentalIdResponse | null>(null);

  // ─── 대여상세 state ───
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<
    '결제완료' | '취소요청' | '취소완료'
  >('결제완료');

  // ─── 대여일자 범위 state ───
  const [rentalDates, setRentalDates] = useState<
    [Date | undefined, Date | undefined]
  >([undefined, undefined]);
  const [originalDates, setOriginalDates] = useState<
    [Date | undefined, Date | undefined]
  >([undefined, undefined]);

  // ─── 배송정보 state ───
  const [recipient, setRecipient] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingDetail, setShippingDetail] = useState('');
  const [message, setMessage] = useState('');

  // ─── 회수정보 state ───
  const [returnAddress, setReturnAddress] = useState('');
  const [returnDetail, setReturnDetail] = useState('');
  const [returnPhone, setReturnPhone] = useState('');

  // ─── 기타 state ───
  const [deliveryStatus, setDeliveryStatus] = useState<
    | '신청완료'
    | '배송준비'
    | '배송중'
    | '배송완료'
    | '배송취소'
    | '반납중'
    | '반납완료'
  >('신청완료');
  const [isCleaned, setIsCleaned] = useState(false);
  const [isRepaired, setIsRepaired] = useState(false);

  // ─── 공통 state ───
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 상세 조회
  useEffect(() => {
    if (!isCreate && numericNo) {
      setLoading(true);
      // 헤더 정보 조회
      getRentalScheduleByRentalId(numericNo)
        .then((hdr) => setHeaderInfo(hdr))
        .catch((err) => {
          console.error('헤더 정보 조회 실패', err);
        });

      // 상세 조회
      getRentalScheduleDetail(numericNo)
        .then((data: RentalScheduleAdminDetailResponse) => {
          setBrand(data.brand);
          setAmount(data.ticketName);
          setProductName(data.productNum);
          setColor(data.color);
          setSize(data.size);
          setPaymentStatus(data.paymentStatus ?? '결제완료');
          setShippingMethod(data.deliveryInfo.shipping.deliveryMethod);

          const [startStr, endStr] = data.rentalPeriod.split(' ~ ');
          const startDate = new Date(startStr);
          const endDate = new Date(endStr);
          setRentalDates([startDate, endDate]);
          setOriginalDates([startDate, endDate]);

          setRecipient(data.deliveryInfo.shipping.receiver);
          setRecipientPhone(data.deliveryInfo.shipping.phone);
          setShippingAddress(data.deliveryInfo.shipping.address);
          setShippingDetail(data.deliveryInfo.shipping.detailAddress);
          setMessage(data.deliveryInfo.shipping.message);

          setReturnAddress(data.deliveryInfo.return.address);
          setReturnDetail(data.deliveryInfo.return.detailAddress);
          setReturnPhone(data.deliveryInfo.return.phone);

          setDeliveryStatus(data.deliveryStatus!);
          setIsCleaned(data.isCleaned);
          setIsRepaired(data.isRepaired);
        })
        .catch((err) => {
          console.error('상세 조회 실패', err);
          setModalTitle('오류');
          setModalMessage('상세 정보를 불러오지 못했습니다.');
          setIsModalOpen(true);
        })
        .finally(() => setLoading(false));
    }
  }, [isCreate, numericNo]);

  // 뒤로가기 핸들러
  const handleBack = () => {
    navigate(`/monitoringlist?page=${page}`);
  };

  // 저장 처리
  const handleSave = async () => {
    if (!isCreate && numericNo) {
      setLoading(true);
      try {
        // 날짜 변경 확인
        const [origStart, origEnd] = originalDates;
        const [newStart, newEnd] = rentalDates;
        let dateChanged = false;
        let formattedStart = '';
        let formattedEnd = '';

        if (
          newStart instanceof Date &&
          newEnd instanceof Date &&
          origStart instanceof Date &&
          origEnd instanceof Date &&
          (newStart.getTime() !== origStart.getTime() ||
            newEnd.getTime() !== origEnd.getTime())
        ) {
          dateChanged = true;
          formattedStart = newStart.toISOString().split('T')[0];
          formattedEnd = newEnd.toISOString().split('T')[0];
        } else if (
          newStart instanceof Date &&
          newEnd instanceof Date &&
          (origStart === undefined || origEnd === undefined)
        ) {
          dateChanged = true;
          formattedStart = newStart.toISOString().split('T')[0];
          formattedEnd = newEnd.toISOString().split('T')[0];
        }

        if (dateChanged) {
          await changeRentalSchedulePeriod(numericNo, {
            startDate: formattedStart,
            endDate: formattedEnd,
          });
          setOriginalDates([newStart!, newEnd!]);
        }

        const payload: UpdateRentalStatusRequest = {
          paymentStatus,
          deliveryStatus,
          isCleaned,
          isRepaired,
        };
        await updateRentalScheduleStatus(numericNo, payload);

        setModalTitle('변경 완료');
        setModalMessage(
          dateChanged
            ? '대여 기간 및 기타 변경 내용을 성공적으로 저장했습니다.'
            : '변경 내용을 성공적으로 저장했습니다.'
        );
        setIsModalOpen(true);
      } catch (err) {
        console.error('저장 실패', err);
        setModalTitle('오류');
        setModalMessage('변경 내용 저장에 실패했습니다.');
        setIsModalOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  // 삭제 핸들러
  const handleDelete = () => {
    setModalTitle('삭제');
    setModalMessage('대여를 정말 삭제하시겠습니까?');
    setIsModalOpen(true);
  };

  // 모달 확인
  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  // DatePicker 변경 핸들러
  const handleDateChange: ReactDatePickerProps['onChange'] = (dates) => {
    if (!Array.isArray(dates)) {
      setRentalDates([undefined, undefined]);
      return;
    }
    const [start, end] = dates as [Date | null, Date | null];
    setRentalDates([start ?? undefined, end ?? undefined]);
  };

  const detailProps: DetailSubHeaderProps = {
    backLabel: '목록으로',
    onBackClick: handleBack,
    editLabel: isCreate ? '등록하기' : '변경저장',
    onEditClick: handleSave,
    endLabel: isCreate ? '취소' : '삭제',
    onEndClick: isCreate ? handleBack : handleDelete,
  };

  if (loading) return <Spinner />;

  return (
    <Container>
      <HeaderRow>
        <Title>{isCreate ? '대여 등록' : `대여 상세 (${numericNo})`}</Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      <ProductNumber>
        <strong>번호</strong>
        <span>{numericNo ?? '-'}</span>
      </ProductNumber>

      {headerInfo && (
        <OrderDetailTopBoxes
          userName={headerInfo.userName}
          nickname={headerInfo.nickname}
          userEmail={headerInfo.userEmail}
          userMembership={headerInfo.userMembership}
          createAt={headerInfo.createAt}
          orderNum={headerInfo.orderNum}
          cancelAt={headerInfo.cancelAt}
          pointUsed={headerInfo.pointUsed}
          extraCharge={headerInfo.extraCharge}
        />
      )}

      <DividerDashed />

      {/* 주문상세 */}
      <SessionHeader>주문상세</SessionHeader>
      <FormBox>
        <Row>
          <Field>
            <label>제품명</label>
            <input value={productName} readOnly />
          </Field>
          <Field>
            <label>브랜드</label>
            <input value={brand} readOnly />
          </Field>
          <Field>
            <label>색상</label>
            <input value={color} readOnly />
          </Field>
        </Row>
        <Row>
          <Field>
            <label>사이즈</label>
            <input value={size} readOnly />
          </Field>
          <Field>
            <label>배송방법</label>
            <InputGroup>
              <MethodPart>{shippingMethod}</MethodPart>
            </InputGroup>
          </Field>
          <Field>
            <label>이용권</label>
            <input value={amount} readOnly />
          </Field>
        </Row>
        <Row>
          <Field>
            <label>대여일자</label>
            <DatePickerContainer>
              <FaCalendarAlt />
              <StyledDatePicker
                selectsRange
                startDate={rentalDates[0]}
                endDate={rentalDates[1]}
                onChange={handleDateChange}
                dateFormat='yyyy.MM.dd'
                placeholderText='YYYY.MM.DD ~ YYYY.MM.DD'
              />
            </DatePickerContainer>
          </Field>
          <Field>
            <label>결제상태</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as any)}
              disabled={paymentStatus === '취소완료'}
            >
              <option value='결제완료'>결제완료</option>
              <option value='취소요청'>취소요청</option>
              <option value='취소완료'>취소완료</option>
            </select>
          </Field>
        </Row>
      </FormBox>

      {/* 배송/회수 */}
      <SessionHeader>배송/회수</SessionHeader>
      <FormBox>
        <Row>
          <Field>
            <label>수령인</label>
            <input value={recipient} readOnly />
          </Field>
          <Field>
            <label>연락처</label>
            <input value={recipientPhone} readOnly />
          </Field>
          <Field flex={2}>
            <label>메시지</label>
            <input value={message} readOnly />
          </Field>
        </Row>
        <Row>
          <Field>
            <label>배송지</label>
            <input value={shippingAddress} readOnly />
          </Field>
          <Field>
            <label>배송상세</label>
            <input value={shippingDetail} readOnly />
          </Field>
        </Row>
        <Row>
          <Field>
            <label>배송상태</label>
            <select
              value={deliveryStatus}
              onChange={(e) => setDeliveryStatus(e.target.value as any)}
            >
              <option value='신청완료'>신청완료</option>
              <option value='배송준비'>배송준비</option>
              <option value='배송중'>배송중</option>
              <option value='배송완료'>배송완료</option>
              <option value='배송취소'>배송취소</option>
              <option value='반납중'>반납중</option>
              <option value='반납완료'>반납완료</option>
            </select>
          </Field>
          <Field>
            <label>연락처</label>
            <input value={returnPhone} readOnly />
          </Field>
        </Row>
        <Row>
          <Field>
            <label>회수지</label>
            <input value={returnAddress} readOnly />
          </Field>
          <Field>
            <label>회수상세</label>
            <input value={returnDetail} readOnly />
          </Field>
        </Row>
        <Row>
          <Field>
            <label>세탁여부</label>
            <select
              value={isCleaned ? '있음' : '없음'}
              onChange={(e) => setIsCleaned(e.target.value === '있음')}
            >
              <option value='있음'>있음</option>
              <option value='없음'>없음</option>
            </select>
          </Field>
          <Field>
            <label>수선여부</label>
            <select
              value={isRepaired ? '있음' : '없음'}
              onChange={(e) => setIsRepaired(e.target.value === '있음')}
            >
              <option value='있음'>있음</option>
              <option value='없음'>없음</option>
            </select>
          </Field>
        </Row>
      </FormBox>

      <ReusableModal2
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={modalTitle}
      >
        {modalMessage}
      </ReusableModal2>
    </Container>
  );
};

export default MonitoringDetail;

/* ===== styled-components ===== */
const Container = styled.div`
  width: 100%;
  min-width: 1000px;
  padding: 20px;
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

const ProductNumber = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: 10px 0 24px;
  strong {
    font-size: 12px;
    font-weight: 700;
  }
  span {
    font-size: 12px;
    font-weight: 900;
  }
`;

const DividerDashed = styled.hr`
  border-top: 1px dashed #ddd;
  margin: 24px 0;
`;

interface FieldProps {
  flex?: number;
}

/* ─── SessionHeader 스타일 ─────────────────────────────────────────────────────────────── */
const SessionHeader = styled.div`
  box-sizing: border-box;
  background: #eeeeee;
  border: 1px solid #dddddd;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 16px 20px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  color: #000;
  margin-top: 24px;
  margin-bottom: -1px;
  width: fit-content;
`;

const FormBox = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0 4px 4px 4px;
  margin-bottom: 40px;
`;

const Row = styled.div`
  display: flex;
  & + & {
    border-top: 1px solid #ddd;
  }
`;

const Field = styled.div<FieldProps>`
  flex: ${(p) => p.flex ?? 1};
  min-width: 0;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  box-sizing: border-box;
  &:not(:last-child) {
    border-right: 1px solid #ddd;
  }
  label {
    width: 80px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    margin-right: 8px;
  }
  input[readonly],
  select:disabled,
  input:disabled {
    background: #f5f5f5;
    color: #666;
  }
  input,
  select {
    flex: 1;
    height: 36px;
    max-width: 300px;
    padding: 0 8px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  min-width: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const MethodPart = styled.div`
  text-align: center;
  font-size: 12px;
  padding: 0 8px;
`;

const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 12px;
  height: 36px;
  width: 200px;
  svg {
    margin-right: 8px;
    color: #666;
  }
  input {
    border: none;
    outline: none;
    font-size: 12px;
    width: 100%;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  border: none;
  outline: none;
  font-size: 12px;
  width: 100%;
`;
