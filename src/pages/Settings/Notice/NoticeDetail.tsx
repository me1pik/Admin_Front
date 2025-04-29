// src/pages/Settings/Notice/NoticeDetail.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SettingsDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/SettingsDetailSubHeader';
import SettingsDetailTopBoxes from '../../../components/SettingsDetailTopBoxes';
import ShippingTabBar from '../../../components/TabBar';
import SettingsDetailTable, {
  SettingsDetailRow,
} from '../../../components/Table/Setting/SettingsDetailTable';
import ReusableModal2 from '../../../components/OneButtonModal';
import { TabItem } from '../../../components/Header/SearchSubHeader';

interface NoticeDetailProps {
  isCreate?: boolean;
  selectOptions?: TabItem[];
}

const defaultNoticeOptions: TabItem[] = [
  { label: '공지', path: '' },
  { label: '안내', path: '' },
];

const NoticeDetail: React.FC<NoticeDetailProps> = ({
  isCreate = false,
  selectOptions: propOptions,
}) => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { selectOptions: TabItem[] } };
  const { no } = useParams<{ no: string }>();

  const options = isCreate
    ? (propOptions ?? defaultNoticeOptions)
    : (location.state?.selectOptions ?? defaultNoticeOptions);
  const numericNo = isCreate ? undefined : Number(no);

  const initialRow: SettingsDetailRow = isCreate
    ? { title: '', category: options[0].label, content: '' }
    : {
        title: '회사에서 제공하는 판매 서비스 사항',
        category: '공지사항',
        content: `본 약관은 주식회사 스타일윅스(이하 “회사”라 합니다.)가 제공하는 의류 및 잡화(이하 “제품”이라 합니다.) 대여 및 전자상거래에 관한 온/오프라인상의 제반 서비스(이하 “서비스”라 합니다.)를 이용함에 있어 회사와 회원의 권리와 의무에 대한 책임사항을 규정함을 목적으로 합니다.`,
      };

  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleBack = () => navigate(-1);
  const handleSave = () => {
    setModalTitle(isCreate ? '등록 완료' : '변경 완료');
    setModalMessage(
      isCreate
        ? '새 공지사항을 등록하시겠습니까?'
        : '변경 내용을 저장하시겠습니까?'
    );
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    setModalTitle('삭제 완료');
    setModalMessage('공지사항을 삭제하시겠습니까?');
    setIsModalOpen(true);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate(-1);
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
        <Title>
          {isCreate ? '공지사항 등록' : `공지사항 상세 (${numericNo})`}
        </Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{numericNo ?? '-'}</ProductNumberValue>
      </ProductNumberWrapper>

      <SettingsDetailTopBoxes />
      <MiddleDivider />

      <ShippingTabBar
        tabs={['상세내용']}
        activeIndex={activeTab}
        onTabClick={setActiveTab}
      />
      {activeTab === 0 && (
        <SettingsDetailTable data={[initialRow]} selectOptions={options} />
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

export default NoticeDetail;

/* Styled Components */
const Container = styled.div`
  width: 100%;
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
  border-top: 1px dashed #dddddd;
  margin: 30px 0;
`;
