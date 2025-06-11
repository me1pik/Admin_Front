import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import SettingsDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/SettingsDetailSubHeader';
import ReusableModal2 from '../../../components/OneButtonModal';
import Spinner from '../../../components/Spinner';
import {
  getAdminTicketById,
  changeTicketStatus,
  deleteAdminTicketById,
  AdminTicketItem,
} from '../../../api/Ticket/TicketApi';

interface TicketDetailProps {
  isCreate?: boolean;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ isCreate = false }) => {
  const navigate = useNavigate();
  const { no } = useParams<{ no: string }>();
  const numericNo = isCreate ? undefined : Number(no);

  // ─── 상태(state) 정의 ───
  const [ticket, setTicket] = useState<AdminTicketItem | null>(null);
  const [status, setStatus] = useState<string>(''); // 선택된 상태 (백엔드 값)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [pendingAction, setPendingAction] = useState<'save' | 'delete' | null>(
    null
  );

  // ─── 상세 조회 호출 ───
  useEffect(() => {
    if (!isCreate && numericNo != null) {
      fetchDetail(numericNo);
    }
    // isCreate일 경우 별도 초기화 로직 추가 가능
  }, [numericNo, isCreate]);

  const fetchDetail = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminTicketById(id);
      setTicket(data);
      setStatus(data.ticket_status);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 404) {
        setError(`ID ${id}에 해당하는 이용권을 찾을 수 없습니다.`);
      } else {
        setError('이용권 정보를 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 뒤로가기
  const handleBack = () => navigate(-1);

  // 저장 버튼 클릭 시
  const handleSave = () => {
    setModalTitle('변경 저장');
    setModalMessage('변경 내용을 저장하시겠습니까?');
    setPendingAction('save');
    setIsModalOpen(true);
  };

  // 삭제 버튼 클릭 시
  const handleDelete = () => {
    setModalTitle('삭제 확인');
    setModalMessage('이용권을 삭제하시겠습니까?');
    setPendingAction('delete');
    setIsModalOpen(true);
  };

  // 모달 확인 시
  const handleConfirm = async () => {
    setIsModalOpen(false);
    if (pendingAction === 'save' && ticket) {
      await performSave(ticket.id);
    } else if (pendingAction === 'delete' && ticket) {
      await performDelete(ticket.id);
    }
    setPendingAction(null);
  };

  const performSave = async (id: number) => {
    if (!ticket) return;
    // 상태가 변경되지 않았다면 뒤로 이동
    if (status === ticket.ticket_status) {
      navigate(-1);
      return;
    }
    setLoading(true);
    try {
      // isActive 판단: 예시로 status가 "CANCELLED" 일 때 비활성 처리, 아니면 활성
      const isActive = status !== 'CANCELLED';
      const updated = await changeTicketStatus(id, { status, isActive });
      setTicket(updated);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const performDelete = async (id: number) => {
    setLoading(true);
    try {
      await deleteAdminTicketById(id);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // ─── SubHeader props ───
  const detailProps: DetailSubHeaderProps = {
    backLabel: '목록 이동',
    onBackClick: handleBack,
    editLabel: isCreate ? '등록하기' : '변경저장',
    onEditClick: handleSave,
    endLabel: isCreate ? '취소' : '삭제',
    onEndClick: isCreate ? handleBack : handleDelete,
  };

  // ─── 렌더링 ───
  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <BackButton onClick={handleBack}>뒤로가기</BackButton>
      </Container>
    );
  }

  // isCreate인 경우 폼 UI 추가 필요 시 이곳에 구현
  return (
    <Container>
      <HeaderRow>
        <Title>{isCreate ? '이용권 등록' : `이용권 상세 (${numericNo})`}</Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      {!isCreate && ticket && (
        <>
          <TicketNumber>
            <strong>번호</strong>
            <span>{ticket.id}</span>
          </TicketNumber>

          <FormBox>
            <Row>
              <Field>
                <label>결제일</label>
                <input value={ticket.purchaseDate} readOnly />
              </Field>
              <Field>
                <label>이용자</label>
                <input value={ticket.user} readOnly />
              </Field>
              <Field>
                <label>종류</label>
                <input value={ticket.ticket_name} readOnly />
              </Field>
            </Row>
            <Row>
              <Field>
                <label>다음결제일</label>
                <input value={ticket.nextDate} readOnly />
              </Field>
              <Field>
                <label>이용기간</label>
                <input value={ticket.이용기간} readOnly />
              </Field>
              <Field>
                <label>이용횟수</label>
                <input value={ticket.ticket_count} readOnly />
              </Field>
            </Row>
            <Row>
              <Field style={{ flex: 1 }}>
                <label>상태</label>
                {/* 
                  백엔드가 반환하는 ticket_status 값 예: "ACTIVE", "PENDING", "CANCEL_REQUEST", "CANCELLED" 등
                  프론트에서 보여줄 선택지와 매핑이 필요하면 매핑 로직을 따로 두세요.
                  여기서는 간단히 백엔드 값 그대로 select 옵션으로 처리하는 예시입니다.
                */}
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {/* 
                    아래 옵션들은 예시입니다. 실제 백엔드 정의된 status 목록에 맞춰 수정하세요. 
                    예: 
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CANCEL_REQUEST">취소 요청</option>
                    <option value="CANCELLED">취소 완료</option>
                  */}
                  <option value={ticket.ticket_status}>
                    {ticket.ticket_status}
                  </option>
                  {/* 실제 상태 목록이 있다면 중복 제거 로직을 넣고, map으로 렌더링하는 방식이 좋습니다. */}
                </select>
              </Field>
            </Row>
          </FormBox>
        </>
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

const ErrorMessage = styled.div`
  color: red;
  padding: 20px;
  text-align: center;
`;

const BackButton = styled.button`
  margin-top: 16px;
  padding: 8px 12px;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;
