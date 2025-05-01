// src/pages/List/Order/MonitoringDetail.tsx

import React, { useState } from 'react';
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
  const [productName] = useState('울 더블 버튼 페플럼 원피스');
  const [brand] = useState('MICHAA');
  const [color] = useState('Green');
  const [size] = useState('M (66)');
  const [shippingMethod] = useState('택배');
  const [tracking] = useState('6909-3074-9676');
  const [amount] = useState('55,000');
  const [expectedDate, setExpectedDate] = useState<Date>(
    new Date('2025-04-10')
  );
  const [paymentStatus, setPaymentStatus] = useState('결제완료');

  // ─── 배송정보 state ───
  const [receiver] = useState('홍길동');
  const [phone] = useState('010-1234-5678');
  const [message, setMessage] = useState('문 앞에 전달해주세요.');
  const [address] = useState('(18139) 경기 오산시 대원로 47, 101동 903호');
  const [deliveryStatus, setDeliveryStatus] = useState('배송 준비중');

  // ─── 공통 state ───
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleBack = () => navigate(-1);
  const handleSave = () => {
    setModalTitle(isCreate ? '등록 완료' : '변경 완료');
    setModalMessage(
      isCreate ? '새 주문을 등록하시겠습니까?' : '변경 내용을 저장하시겠습니까?'
    );
    setIsModalOpen(true);
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

  // onChange 오류 해결: ReactDatePickerProps['onChange'] 사용
  const handleDateChange: ReactDatePickerProps['onChange'] = (date, _e) => {
    if (date instanceof Date) {
      setExpectedDate(date);
    }
    // range 선택 시 array 처리도 가능
  };

  const detailProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: handleBack,
    editLabel: isCreate ? '등록하기' : '변경저장',
    onEditClick: handleSave,
    endLabel: isCreate ? '취소' : '삭제',
    onEndClick: isCreate ? handleBack : handleDelete,
  };

  return (
    <Container>
      <HeaderRow>
        <Title>{isCreate ? '주문 등록' : `주문 상세 (${numericNo})`}</Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      <ProductNumber>
        <strong>번호</strong>
        <span>{numericNo ?? '-'}</span>
      </ProductNumber>

      <OrderDetailTopBoxes />
      <DividerDashed />

      <ShippingTabBar
        tabs={['주문상세', '배송정보']}
        activeIndex={activeTab}
        onTabClick={setActiveTab}
      />

      {activeTab === 0 && (
        <FormBox>
          {/* 주문상세 폼 내용 */}
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
                <Divider />
                <TrackingPart>{tracking}</TrackingPart>
              </InputGroup>
            </Field>
            <Field>
              <label>금액</label>
              <input value={amount} readOnly />
            </Field>
          </Row>

          <Row>
            <Field>
              <label>발송예정</label>
              <DatePickerContainer>
                <FaCalendarAlt />
                <StyledDatePicker
                  selected={expectedDate}
                  onChange={handleDateChange}
                  dateFormat='yyyy.MM.dd'
                />
              </DatePickerContainer>
              <Hint>(제품 신청일로부터 3일 이내)</Hint>
            </Field>
            <Field>
              <label>결제상태</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option>결제완료</option>
                <option>결제대기</option>
                <option>취소요청</option>
              </select>
            </Field>
          </Row>
        </FormBox>
      )}

      {activeTab === 1 && (
        <FormBox>
          {/* 배송정보 폼 내용 */}
          <Row>
            <Field>
              <label>수령인</label>
              <input value={receiver} readOnly />
            </Field>
            <Field>
              <label>연락처</label>
              <input value={phone} readOnly />
            </Field>
            <Field>
              <label>메시지</label>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>
          </Row>

          <Row>
            <Field style={{ minWidth: '100%' }}>
              <label>배송지</label>
              <input value={address} readOnly style={{ width: '100%' }} />
            </Field>
          </Row>

          <Row>
            <Field>
              <label>배송상태</label>
              <select
                value={deliveryStatus}
                onChange={(e) => setDeliveryStatus(e.target.value)}
              >
                <option>배송 준비중</option>
                <option>배송 중</option>
                <option>배송 완료</option>
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
  font-family: 'NanumSquare Neo OTF', sans-serif;
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

const FormBox = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0 4px 4px 4px;
`;

const Row = styled.div`
  display: flex;
  & + & {
    border-top: 1px solid #ddd;
  }
`;

const Field = styled.div`
  width: 100%;
  min-width: 300px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  box-sizing: border-box;

  &:not(:last-child) {
    border-right: 1px solid #ddd;
  }

  label {
    width: 80px;
    font-size: 12px;
    font-weight: 700;
    margin-right: 8px;
    text-align: center;
  }

  input,
  select {
    flex: 1;
    height: 36px;
    padding: 0 8px;
    font-size: 12px;
    max-width: 300px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
`;

const MethodPart = styled.div`
  flex: 0 0 60px;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background: #ddd;
`;

const TrackingPart = styled.div`
  flex: 1;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 12px;
  height: 36px;
  min-width: 140px;

  svg {
    margin-right: 8px;
    color: #666;
  }

  input {
    border: none;
    outline: none;
    font-size: 12px;
    height: 100%;
    min-width: 80px;
  }
`;

// 제네릭 완전히 제거했습니다
const StyledDatePicker = styled(DatePicker)`
  border: none;
  outline: none;
  font-size: 12px;
  height: 100%;
`;

const Hint = styled.div`
  margin-left: 8px;
  font-size: 10px;
  color: #999;
`;
