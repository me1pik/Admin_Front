// src/pages/Brand/BrandDetail.tsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import SettingsDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/SettingsDetailSubHeader';
import SettingsDetailTopBoxes from '../../../components/SettingsDetailTopBoxes';
import ShippingTabBar from '../../../components/TabBar';
import ReusableModal2 from '../../../components/OneButtonModal';

import {
  getAdminBrandDetail,
  updateAdminBrand,
  createAdminBrand,
  getAdminBrandSelectOptions,
} from '../../../api/brand/brandApi';
import { CreateAdminBrandRequest } from '../../../api/brand/brandApi';

interface BrandDetailProps {
  isCreate?: boolean;
}

const BrandDetail: React.FC<BrandDetailProps> = ({ isCreate = false }) => {
  const navigate = useNavigate();
  const { no } = useParams<{ no: string }>();
  const numericNo = isCreate ? undefined : Number(no);

  // — 폼 필드
  const [groupCompany, setGroupCompany] = useState('');
  const [brandName, setBrandName] = useState('');
  const [productCount, setProductCount] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<string>('');
  const [manager, setManager] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<string>('');

  // — 옵션 리스트
  const [discountOptions, setDiscountOptions] = useState<string[]>([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);

  // — UI 상태
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // 초기 데이터 로드
  useEffect(() => {
    const init = async () => {
      try {
        const opts = await getAdminBrandSelectOptions();
        setDiscountOptions(opts.discountRates);
        setStatusOptions(opts.statusOptions);

        if (!isCreate && numericNo != null) {
          const data = await getAdminBrandDetail(numericNo);
          setGroupCompany(data.groupName);
          setBrandName(data.brandName);
          setProductCount(data.productCount);
          setDiscountRate(
            data.discount_rate != null ? String(data.discount_rate) : ''
          );
          setManager(data.contactPerson ?? '');
          setContact(data.contactNumber ?? '');
          setStatus(data.status);
        }
      } catch (err) {
        console.error('초기 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [isCreate, numericNo]);

  // 저장 핸들러
  const handleSave = async () => {
    try {
      const base: Omit<
        CreateAdminBrandRequest,
        | 'groupName'
        | 'brandName'
        | 'productCount'
        | 'discount_rate'
        | 'contactPerson'
        | 'contactNumber'
        | 'status'
      > = {
        imageUrl: '',
        isPopular: false,
        isActive: true,
        location: '',
      };

      const body: CreateAdminBrandRequest = {
        ...base,
        groupName: groupCompany,
        brandName,
        productCount,
        discount_rate: Number(discountRate) || 0,
        contactPerson: manager,
        contactNumber: contact,
        status,
      };

      if (isCreate) {
        await createAdminBrand(body);
      } else if (numericNo != null) {
        await updateAdminBrand(numericNo, body);
      }

      setModalTitle(isCreate ? '등록 완료' : '변경 완료');
      setModalMessage(
        isCreate ? '새 Brand가 등록되었습니다.' : '변경 내용이 저장되었습니다.'
      );
      setIsModalOpen(true);
    } catch (err) {
      console.error('브랜드 저장 실패:', err);
      setModalTitle('오류');
      setModalMessage('저장 중 오류가 발생했습니다.');
      setIsModalOpen(true);
    }
  };

  const handleBack = () => navigate('/brandlist');
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

  if (isLoading) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  return (
    <Container>
      <HeaderRow>
        <Title>{isCreate ? '브랜드 등록' : `브랜드 상세 (${numericNo})`}</Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      <ProductNumber>
        <strong>번호</strong>
        <span>{numericNo ?? '-'}</span>
      </ProductNumber>

      <SettingsDetailTopBoxes />
      <DividerDashed />

      {/* “상세내용” 탭바 */}
      <ShippingTabBar
        tabs={['상세내용']}
        activeIndex={activeTab}
        onTabClick={setActiveTab}
      />

      {activeTab === 0 && (
        <FormBox>
          {/* 1행 */}
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
              <input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </Field>
            <Field>
              <label>제품수</label>
              <input
                type='number'
                value={productCount}
                onChange={(e) => setProductCount(Number(e.target.value))}
              />
            </Field>
          </Row>

          {/* 2행 */}
          <Row>
            <Field>
              <label>할인율(%)</label>
              <select
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
              >
                <option value=''>선택</option>
                {discountOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}%
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

          {/* 3행 */}
          <Row>
            <Field>
              <label>상태</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value=''>선택</option>
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span>- 상태 설정은 등록완료 / 등록대기 / 계약종료</span>
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

/* ====================== styled-components ====================== */

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
  flex: 1;
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
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  span {
    font-size: 12px;
    color: #666;
    margin-left: 20px;
  }
`;
const LoadingMessage = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 14px;
  color: #888;
`;
