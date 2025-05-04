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

interface FAQDetailProps {
  /** 새로 등록하는 모드인지 */
  isCreate?: boolean;
  /** 카테고리 선택 옵션 */
  selectOptions?: TabItem[];
}

const defaultOptions: TabItem[] = [
  { label: '서비스', path: '서비스' },
  { label: '주문/결제', path: '주문/결제' },
  { label: '배송/반품', path: '배송/반품' },
  { label: '이용권', path: '이용권' },
];

const FAQDetail: React.FC<FAQDetailProps> = ({
  isCreate = false,
  selectOptions: propOptions,
}) => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { selectOptions: TabItem[] } };
  const { no } = useParams<{ no: string }>();

  const options = isCreate
    ? (propOptions ?? defaultOptions)
    : (location.state?.selectOptions ?? defaultOptions);
  const numericNo = isCreate ? undefined : Number(no);

  const initialRow: SettingsDetailRow = isCreate
    ? { title: '', category: options[0].label, content: '' }
    : {
        title: 'FAQ 상세 제목',
        category: '서비스',
        content: '여기에 FAQ 상세 내용을 입력하세요.',
      };

  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleBack = () => navigate(-1);
  const handleSave = () => {
    setModalTitle(isCreate ? '등록 완료' : '변경 완료');
    setModalMessage(
      isCreate ? '새 FAQ를 등록하시겠습니까?' : '변경 내용을 저장하시겠습니까?'
    );
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    setModalTitle('삭제 완료');
    setModalMessage('FAQ를 삭제하시겠습니까?');
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
        <Title>{isCreate ? 'FAQ 등록' : `FAQ 상세 (${numericNo})`}</Title>
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

export default FAQDetail;

const Container = styled.div`
  width: 100%;
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
