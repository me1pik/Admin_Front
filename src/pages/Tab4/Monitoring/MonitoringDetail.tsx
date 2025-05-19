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
  const [shippingMethod] = useState('매니저 배송');
  const [amount] = useState('정기 이용권 (무제한)');
  const [expectedDate, setExpectedDate] = useState<Date>(
    new Date('2025-04-10')
  );
  const [paymentStatus, setPaymentStatus] = useState('결제상태');

  // ─── 배송정보 state ───
  const [sender] = useState('홍길순');
  const [senderPhone] = useState('010-1111-2222');
  const [receiver] = useState('홍길동');
  const [receiverPhone] = useState('010-1234-5678');
  const [message, setMessage] = useState('문 앞에 전달해주세요.');
  const [deliveryAddress] = useState(
    '(06205) 서울 강남구 대치동 922-4 디엠빌딩 401호'
  );
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [returnAddress] = useState(
    '(06205) 서울 강남구 대치동 922-4 디엠빌딩 401호'
  );

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
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option>결제완료</option>
                <option>취소요청</option>
                <option>취소완료</option>
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
                onChange={(e) => setDeliveryStatus(e.target.value)}
              >
                <option>배송준비</option>
                <option>배송중</option>
                <option>배송완료</option>
                <option>배송취소</option>
                <option>반납중</option>
                <option>반납완료</option>
              </select>
            </Field>
          </Row>
          <Row>
            <Field>
              <label>반납인</label>
              <input value={receiver} readOnly />
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
              <select>
                <option>있음</option>
                <option>없음</option>
              </select>
            </Field>
            <Field>
              <label>수선여부</label>
              <select>
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
    white-space: nowrap;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    display: inline-block;
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
  font-weight: 400;
`;
const DatePickerContainer = styled.div`display:flex;align-items:center;border:1px solid #ddd;border-radius:4px;padding:0 12px;height:36px;svg{margin-right:8px;color:#666;}input{border:none;outline:none;font-size:12px;}}`;
const StyledDatePicker = styled(DatePicker)`
  border: none;
  outline: none;
  font-size: 12px;
  width: 100px;
`;
