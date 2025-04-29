// src/pages/Settings/Privacy/PrivacyDetail.tsx
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

// Props 정의
interface PrivacyDetailProps {
  isCreate?: boolean;
  selectOptions?: TabItem[];
}

const defaultOptions: TabItem[] = [
  { label: '개인정보방침', path: '' },
  { label: '파기절차', path: '' },
  { label: '기타', path: '' },
];

const PrivacyDetail: React.FC<PrivacyDetailProps> = ({
  isCreate = false,
  selectOptions: propOptions,
}) => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { selectOptions: TabItem[] } };
  const { no } = useParams<{ no: string }>();

  // create 모드면 propOptions, 아니면 location.state
  const options: TabItem[] = isCreate
    ? (propOptions ?? defaultOptions)
    : (location.state?.selectOptions ?? defaultOptions);

  // 번호: create면 undefined, 상세면 URL param
  const numericNo = isCreate ? undefined : Number(no);

  // 초기 row 데이터
  const initialRow: SettingsDetailRow = isCreate
    ? { title: '', category: options[0].label, content: '' }
    : {
        title: '개인정보 처리방침',
        category: '개인정보처리방침',
        content: `회사는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은 회사의 개인정보 처리방침에 대해 설명합니다.`,
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
        ? '새 개인정보처리방침을 등록하시겠습니까?'
        : '변경 내용을 저장하시겠습니까?'
    );
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    setModalTitle('삭제 완료');
    setModalMessage('개인정보처리방침을 삭제하시겠습니까?');
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
          {isCreate
            ? '개인정보처리방침 등록'
            : `개인정보처리방침 상세 (${numericNo})`}
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

export default PrivacyDetail;

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
