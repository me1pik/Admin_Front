// src/pages/Tab4/Monitoring/MonitoringDetail.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import SettingsDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/SettingsDetailSubHeader';
import OrderDetailTopBoxes from '../../../components/OrderDetailTopBoxes';
import ShippingTabBar from '../../../components/TabBar';
import ReusableModal2 from '../../../components/OneButtonModal';
import Spinner from '../../../components/Spinner';

import {
  getRentalScheduleDetail,
  updateRentalScheduleStatus,
  RentalScheduleAdminDetailResponse,
  UpdateRentalStatusRequest,
} from '../../../api/RentalSchedule/RentalScheduleApi';

interface MonitoringDetailProps {
  isCreate?: boolean;
}

const MonitoringDetail: React.FC<MonitoringDetailProps> = ({
  isCreate = false,
}) => {
  const navigate = useNavigate();
  const { no } = useParams<{ no: string }>();
  const numericNo = isCreate ? undefined : Number(no);

  // ─── 주문상세 state ───
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [expectedDate, setExpectedDate] = useState<Date>(new Date());
  const [paymentStatus, setPaymentStatus] = useState<
    '결제완료' | '결제대기' | '환불완료'
  >('결제완료');

  // ─── 배송정보 state ───
  const [sender, setSender] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [receiverDetail, setReceiverDetail] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [returnAddress, setReturnAddress] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<
    '배송준비중' | '배송중' | '배송완료'
  >('배송준비중');
  const [isCleaned, setIsCleaned] = useState(false);
  const [isRepaired, setIsRepaired] = useState(false);

  // ─── 공통 state ───
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 상세 조회
  useEffect(() => {
    if (!isCreate && numericNo) {
      setLoading(true);
      getRentalScheduleDetail(numericNo)
        .then((data: RentalScheduleAdminDetailResponse) => {
          // 주문상세
          setBrand(data.brand);
          setAmount(data.ticketName);
          setProductName(`${data.brand} ${data.ticketName}`);
          setColor(data.color);
          setSize(data.size);
          setPaymentStatus(data.paymentStatus || '결제완료');
          setShippingMethod(data.deliveryInfo.shipping.deliveryMethod);

          // 기간 parsing
          const [start] = data.rentalPeriod.split(' ~ ');
          setExpectedDate(new Date(start));

          // 배송정보
          setSender(data.deliveryInfo.shipping.receiver);
          setSenderPhone(data.deliveryInfo.shipping.phone);
          setDeliveryAddress(data.deliveryInfo.shipping.address);
          setMessage(data.deliveryInfo.shipping.message);

          // 회수정보
          setReceiverDetail(data.deliveryInfo.return.detailAddress);
          setReceiverPhone(data.deliveryInfo.return.phone);
          setReturnAddress(data.deliveryInfo.return.address);

          setDeliveryStatus(data.deliveryStatus);
          setIsCleaned(data.isCleaned);
          setIsRepaired(data.isRepaired);
        })
        .catch((err: any) => {
          console.error('상세 조회 실패', err);
          setModalTitle('오류');
          setModalMessage('상세 정보를 불러오지 못했습니다.');
          setIsModalOpen(true);
        })
        .finally(() => setLoading(false));
    }
  }, [isCreate, numericNo]);

  const handleBack = () => navigate(-1);

  const handleSave = async () => {
    if (!isCreate && numericNo) {
      const payload: UpdateRentalStatusRequest = {
        paymentStatus,
        deliveryStatus,
        isCleaned,
        isRepaired,
      };
      try {
        setLoading(true);
        await updateRentalScheduleStatus(numericNo, payload);
        setModalTitle('변경 완료');
        setModalMessage('변경 내용을 성공적으로 저장했습니다.');
        setIsModalOpen(true);
      } catch (err: any) {
        console.error('수정 실패', err);
        setModalTitle('오류');
        setModalMessage('변경 내용 저장에 실패했습니다. 다시 시도해주세요.');
        setIsModalOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = () => {
    setModalTitle('삭제 완료');
    setModalMessage('주문을 삭제하시겠습니까?');
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  const handleDateChange: ReactDatePickerProps['onChange'] = (date) => {
    if (date instanceof Date) setExpectedDate(date);
  };

  const detailProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
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
        <Title>{isCreate ? '주문 등록' : `대여내역 (${numericNo})`}</Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      <ProductNumber>
        <strong>번호</strong>
        <span>{numericNo ?? '-'}</span>
      </ProductNumber>

      <OrderDetailTopBoxes />
      <DividerDashed />

      <ShippingTabBar
        tabs={['주문상세', '배송/회수']}
        activeIndex={activeTab}
        onTabClick={setActiveTab}
      />

      {activeTab === 0 && (
        <FormBox>
          {/* 주문상세 */}
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
                  selected={expectedDate}
                  onChange={handleDateChange}
                  dateFormat='yyyy.MM.dd'
                />
              </DatePickerContainer>
            </Field>
            <Field>
              <label>결제상태</label>
              <select
                value={paymentStatus}
                onChange={(e) =>
                  setPaymentStatus(
                    e.target.value as '결제완료' | '결제대기' | '환불완료'
                  )
                }
              >
                <option>결제완료</option>
                <option>결제대기</option>
                <option>환불완료</option>
              </select>
            </Field>
          </Row>
        </FormBox>
      )}

      {activeTab === 1 && (
        <FormBox>
          {/* 배송/회수 */}
          <Row>
            <Field>
              <label>수령인</label>
              <input value={sender} readOnly />
            </Field>
            <Field>
              <label>연락처</label>
              <input value={senderPhone} readOnly />
            </Field>
            <Field flex={2}>
              <label>메시지</label>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <label>배송지</label>
              <input value={deliveryAddress} readOnly />
            </Field>
            <Field>
              <label>배송상태</label>
              <select
                value={deliveryStatus}
                onChange={(e) => setDeliveryStatus(e.target.value as any)}
              >
                <option>배송준비중</option>
                <option>배송중</option>
                <option>배송완료</option>
              </select>
            </Field>
          </Row>
          <Row>
            <Field>
              <label>반납인 상세</label>
              <input value={receiverDetail} readOnly />
            </Field>
            <Field>
              <label>연락처</label>
              <input value={receiverPhone} readOnly />
            </Field>
          </Row>
          <Row>
            <Field>
              <label>회수지</label>
              <input value={returnAddress} readOnly />
            </Field>
          </Row>
          <Row>
            <Field>
              <label>세탁여부</label>
              <select
                value={isCleaned ? '있음' : '없음'}
                onChange={(e) => setIsCleaned(e.target.value === '있음')}
              >
                <option>있음</option>
                <option>없음</option>
              </select>
            </Field>
            <Field>
              <label>수선여부</label>
              <select
                value={isRepaired ? '있음' : '없음'}
                onChange={(e) => setIsRepaired(e.target.value === '있음')}
              >
                <option>있음</option>
                <option>없음</option>
              </select>
            </Field>
          </Row>
        </FormBox>
      )}

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
  flex: 0 0 80px;
  text-align: center;
  font-size: 12px;
`;
const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 12px;
  height: 36px;
  svg {
    margin-right: 8px;
    color: #666;
  }
  input {
    border: none;
    outline: none;
    font-size: 12px;
    width: 100px;
  }
`;
const StyledDatePicker = styled(DatePicker)`
  border: none;
  outline: none;
  font-size: 12px;
  width: 100px;
`;
