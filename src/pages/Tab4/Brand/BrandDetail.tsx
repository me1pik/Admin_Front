// src/pages/Brand/BrandDetail.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SettingsDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/SettingsDetailSubHeader';
import SettingsDetailTopBoxes from '../../../components/SettingsDetailTopBoxes';
import ShippingTabBar from '../../../components/TabBar';
import ReusableModal2 from '../../../components/OneButtonModal';
import { TabItem } from '../../../components/Header/SearchSubHeader';

interface BrandDetailProps {
  isCreate?: boolean;
  selectOptions?: TabItem[];
}

const defaultOptions: TabItem[] = [
  { label: '서비스', path: '서비스' },
  { label: '주문/결제', path: '주문/결제' },
  { label: '배송/반품', path: '배송/반품' },
  { label: '이용권', path: '이용권' },
];

const BrandDetail: React.FC<BrandDetailProps> = ({
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

  const [groupCompany, setGroupCompany] = useState(
    isCreate ? '' : '대현 (DAEHYUN)'
  );
  const [brand, setBrand] = useState(isCreate ? '' : 'MOJO');
  const [productCount, setProductCount] = useState(isCreate ? '' : '340');
  const [discountRate, setDiscountRate] = useState(isCreate ? '' : '20%');
  const [manager, setManager] = useState(isCreate ? '' : '김미영 매니저.');
  const [contact, setContact] = useState(isCreate ? '' : '010-1234-5678');
  const [status, setStatus] = useState(
    isCreate ? options[0].label : '등록대기'
  );

  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleBack = () => navigate('/brandlist');
  const handleSave = () => {
    setModalTitle(isCreate ? '등록 완료' : '변경 완료');
    setModalMessage(
      isCreate
        ? '새 Brand를 등록하시겠습니까?'
        : '변경 내용을 저장하시겠습니까?'
    );
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    setModalTitle('삭제 완료');
    setModalMessage('Brand를 삭제하시겠습니까?');
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
        <Title>{isCreate ? 'Brand 등록' : `Brand 상세 (${numericNo})`}</Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      <ProductNumber>
        <strong>번호</strong>
        <span>{numericNo ?? '-'}</span>
      </ProductNumber>

      <SettingsDetailTopBoxes />
      <DividerDashed />

      <ShippingTabBar
        tabs={['상세내용']}
        activeIndex={activeTab}
        onTabClick={setActiveTab}
      />

      {activeTab === 0 && (
        <FormBox>
          <Row>
            <Field>
              <label>그룹사</label>
              <input
                value={groupCompany}
                onChange={(e) => setGroupCompany(e.target.value)}
              />
            </Field>
            <Field>
              <label>브랜드</label>
              <input value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Field>
            <Field>
              <label>제품수</label>
              <input
                value={productCount}
                onChange={(e) => setProductCount(e.target.value)}
              />
            </Field>
          </Row>

          <Row>
            <Field>
              <label>할인율</label>
              <select
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
              >
                {Array.from({ length: 21 }, (_, i) => `${i * 5}%`).map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <label>담당자</label>
              <input
                value={manager}
                onChange={(e) => setManager(e.target.value)}
              />
            </Field>
            <Field>
              <label>연락처</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Field>
          </Row>

          {/* 수정된 상태 필드 Row */}
          <Row>
            <Field>
              <label>상태</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {['등록대기', '등록완료', '계약종료'].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <span>
                - 상태 설정은 3가지 (등록대기 / 등록완료 / 계약종료)로
                구성됩니다.
              </span>
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

export default BrandDetail;

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

  input {
    width: 200px;
    height: 36px;
    padding: 0 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  select {
    width: 200px;
    height: 36px;
    padding: 0 8px;
    border: 1px solid #000;
    border-radius: 4px;
    box-sizing: border-box;
  }

  span {
    font-size: 12px;
    color: #666;
    margin-left: 20px;
  }
`;
