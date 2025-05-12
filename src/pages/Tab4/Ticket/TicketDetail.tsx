// src/pages/List/Order/TicketDetail.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import SettingsDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/SettingsDetailSubHeader';
import ReusableModal2 from '../../../components/OneButtonModal';

interface TicketDetailProps {
  isCreate?: boolean;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ isCreate = false }) => {
  const navigate = useNavigate();
  const { no } = useParams<{ no: string }>();
  const numericNo = isCreate ? undefined : Number(no);

  // ─── 티켓 상세 state ───
  const [paymentDate] = useState('2025-05-01');
  const [userName] = useState('안소천(솔린)');
  const [ticketType] = useState('정기 구독권 (무제한)');
  const [nextPaymentDate] = useState('2025-06-01');
  const [usagePeriod] = useState('2025.05.01 - 2025.05.31');
  const [usageCount] = useState('∞ / 2');
  const [status, setStatus] = useState('결제완료');

  // ─── 공통 state ───
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleBack = () => navigate(-1);
  const handleSave = () => {
    setModalTitle(isCreate ? '등록 완료' : '변경 완료');
    setModalMessage(
      isCreate ? '새 티켓을 등록하시겠습니까?' : '변경 내용을 저장하시겠습니까?'
    );
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    setModalTitle('삭제 완료');
    setModalMessage('티켓을 삭제하시겠습니까?');
    setIsModalOpen(true);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  const detailProps: DetailSubHeaderProps = {
    backLabel: '목록 이동',
    onBackClick: handleBack,
    editLabel: isCreate ? '등록하기' : '변경저장',
    onEditClick: handleSave,
    endLabel: isCreate ? '취소' : '삭제',
    onEndClick: isCreate ? handleBack : handleDelete,
  };

  return (
    <Container>
      <HeaderRow>
        <Title>{isCreate ? '티켓 등록' : `티켓 상세 (${numericNo})`}</Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      <TicketNumber>
        <strong>번호</strong>
        <span>{numericNo ?? '-'}</span>
      </TicketNumber>

      <FormBox>
        <Row>
          <Field>
            <label>결제일</label>
            <input value={paymentDate} readOnly />
          </Field>
          <Field>
            <label>이용자</label>
            <input value={userName} readOnly />
          </Field>
          <Field>
            <label>종류</label>
            <input value={ticketType} readOnly />
          </Field>
        </Row>
        <Row>
          <Field>
            <label>다음결제일</label>
            <input value={nextPaymentDate} readOnly />
          </Field>
          <Field>
            <label>이용기간</label>
            <input value={usagePeriod} readOnly />
          </Field>
          <Field>
            <label>이용횟수</label>
            <input value={usageCount} readOnly />
          </Field>
        </Row>
        <Row>
          <Field style={{ flex: 1 }}>
            <label>상태</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>결제완료</option>
              <option>결제대기</option>
              <option>취소요청</option>
              <option>취소완료</option>
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

export default TicketDetail;

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

const TicketNumber = styled.div`
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
  flex: 1;
  min-width: 200px;

  display: flex;
  align-items: center;
  padding: 12px 16px;
  box-sizing: border-box;

  &:not(:last-child) {
    border-right: 1px solid #ddd;
  }

  label {
    width: 100px;
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
    border: 1px solid #ddd;
    border-radius: 4px;
    max-width: 200px;
  }
`;
