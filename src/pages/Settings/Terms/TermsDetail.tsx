// src/pages/PrivacyDetail.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
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

const TermsDetail: React.FC = () => {
  const location = useLocation() as { state?: { selectOptions: TabItem[] } };
  const selectOptions: TabItem[] = location.state?.selectOptions || [];
  const navigate = useNavigate();

  const shippingTabs = ['상세내용'];
  const dummyProducts = [{ no: 7 }];
  const dummySettingsDetail: SettingsDetailRow = {
    title: '이용약관',
    category: '이용약관',
    content: `본 약관은 회사가 제공하는 서비스 이용과 관련하여 회사와 회원 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.`,
  };

  const [activeTab, setActiveTab] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  const handleBackClick = () => window.history.back();
  const handleSaveClick = () => {
    setModalTitle('변경 완료');
    setModalMessage('변경 내용을 저장하시겠습니까?');
    setIsModalOpen(true);
  };
  const handleDeleteClick = () => {
    setModalTitle('삭제 완료');
    setModalMessage('이용약관을 삭제하시겠습니까?');
    setIsModalOpen(true);
  };

  const detailSubHeaderProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: handleBackClick,
    editLabel: '변경저장',
    onEditClick: handleSaveClick,
    endLabel: '삭제',
    onEndClick: handleDeleteClick,
  };

  return (
    <Container>
      <HeaderRow>
        <Title>이용약관 상세</Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailSubHeaderProps} />

      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{dummyProducts[0].no}</ProductNumberValue>
      </ProductNumberWrapper>

      <SettingsDetailTopBoxes />

      <MiddleDivider />

      <ShippingTabBar
        tabs={shippingTabs}
        activeIndex={activeTab}
        onTabClick={setActiveTab}
      />

      {activeTab === 0 && (
        <SettingsDetailTable
          data={[dummySettingsDetail]}
          selectOptions={selectOptions}
        />
      )}

      <ReusableModal2
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        title={modalTitle}
      >
        {modalMessage}
      </ReusableModal2>
    </Container>
  );
};

export default TermsDetail;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
`;

const ProductNumberWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin: 10px 0;
  margin-top: 34px;
`;

const ProductNumberLabel = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #000000;
`;

const ProductNumberValue = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
`;

const MiddleDivider = styled.hr`
  border: 0;
  border-top: 1px dashed #dddddd;
  margin: 30px 0;
`;
