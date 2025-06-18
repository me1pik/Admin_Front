// src/pages/Tab4/Brand/BrandDetail.tsx

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
  AdminBrandDetail,
  CreateAdminBrandRequest,
  UpdateAdminBrandRequest,
  deleteAdminBrand,
} from '../../../api/brand/brandApi';

interface BrandDetailProps {
  // 생성 모드를 route param 등으로 구분하려면, 예: /branddetail/create 경로일 때 isCreate=true로 처리
  isCreate?: boolean;
}

const BrandDetail: React.FC<BrandDetailProps> = ({ isCreate = false }) => {
  const navigate = useNavigate();
  const { no } = useParams<{ no: string }>();
  // no가 'create' 같은 문자열일 때 생성 모드로 처리 가능
  const numericNo =
    !isCreate && no && /^\d+$/.test(no) ? Number(no) : undefined;

  // — 폼 필드 상태
  const [groupCompany, setGroupCompany] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  const [productCount, setProductCount] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<string>(''); // 문자열로 선택/입력
  const [manager, setManager] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [status, setStatus] = useState<string>(''); // 상태 문자열

  // — 옵션 리스트
  const [discountOptions, setDiscountOptions] = useState<string[]>([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);

  // — UI 상태
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<'delete' | null>(null);

  // 초기 데이터 로드
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const opts = await getAdminBrandSelectOptions();
        setDiscountOptions(opts.discountRates || []);
        setStatusOptions(opts.statusOptions || []);

        // 상세 조회 모드
        if (numericNo != null) {
          const data: AdminBrandDetail = await getAdminBrandDetail(numericNo);
          setGroupCompany(data.groupName ?? '');
          setBrandName(data.brandName ?? '');
          setProductCount(
            typeof data.productCount === 'number' ? data.productCount : 0
          );
          setDiscountRate(
            data.discount_rate != null ? String(data.discount_rate) : ''
          );
          setManager(data.contactPerson ?? '');
          setContact(data.contactNumber ?? '');
          // isActive → status 문자열 매핑
          if (data.isActive) {
            if (opts.statusOptions.includes('등록완료')) {
              setStatus('등록완료');
            } else {
              setStatus(opts.statusOptions[0] || '');
            }
          } else {
            if (opts.statusOptions.includes('계약종료')) {
              setStatus('계약종료');
            } else {
              setStatus(opts.statusOptions[0] || '');
            }
          }
        } else {
          // 생성 모드: 기본 status 설정
          if (opts.statusOptions.includes('등록대기')) {
            setStatus('등록대기');
          } else {
            setStatus(opts.statusOptions[0] || '');
          }
        }
      } catch (err) {
        console.error('초기 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [numericNo]);

  // 저장 핸들러
  const handleSave = async () => {
    try {
      // status 문자열을 isActive로 변환
      let isActiveValue: boolean;
      if (status === '등록완료') {
        isActiveValue = true;
      } else {
        isActiveValue = false;
      }
      // body 구성 (필요 필드만)
      const bodyCreate: CreateAdminBrandRequest = {
        groupName: groupCompany,
        brandName: brandName,
        contactPerson: manager,
        contactNumber: contact,
        discount_rate: Number(discountRate) || 0,
        isActive: isActiveValue,
        imageUrl: '', // UI 추가 시 설정
        isPopular: false, // UI 추가 시 설정
        brand_category: '', // UI 추가 시 설정
      };
      const bodyUpdate: UpdateAdminBrandRequest = {
        groupName: groupCompany,
        brandName: brandName,
        contactPerson: manager,
        contactNumber: contact,
        discount_rate: Number(discountRate) || 0,
        isActive: isActiveValue,
        // imageUrl/isPopular/brand_category 등 필요 시 포함
      };

      if (numericNo != null) {
        await updateAdminBrand(numericNo, bodyUpdate);
      } else {
        await createAdminBrand(bodyCreate);
      }

      setModalTitle(numericNo != null ? '변경 완료' : '등록 완료');
      setModalMessage(
        numericNo != null
          ? '변경 내용이 저장되었습니다.'
          : '새 브랜드가 등록되었습니다.'
      );
      setConfirmAction(null);
      setIsModalOpen(true);
    } catch (err) {
      console.error('브랜드 저장 실패:', err);
      setModalTitle('오류');
      setModalMessage('저장 중 오류가 발생했습니다.');
      setConfirmAction(null);
      setIsModalOpen(true);
    }
  };

  const handleBack = () => {
    navigate('/brandlist');
  };
  const handleDelete = () => {
    setModalTitle('삭제 확인');
    setModalMessage('정말 브랜드를 삭제하시겠습니까?');
    setConfirmAction('delete');
    setIsModalOpen(true);
  };
  const handleConfirm = async () => {
    setIsModalOpen(false);
    if (confirmAction === 'delete' && numericNo != null) {
      try {
        await deleteAdminBrand(numericNo);
        setModalTitle('삭제 완료');
        setModalMessage('브랜드가 삭제되었습니다.');
        setIsModalOpen(true);
        // 삭제 후 목록으로 돌아가기
        navigate('/brandlist');
      } catch (err) {
        console.error('삭제 실패:', err);
        setModalTitle('오류');
        setModalMessage('삭제 중 오류가 발생했습니다.');
        setIsModalOpen(true);
      }
    } else {
      // 단순 확인 모드일 때
      setIsModalOpen(false);
    }
  };

  const detailProps: DetailSubHeaderProps = {
    backLabel: '목록 이동',
    onBackClick: handleBack,
    editLabel: numericNo != null ? '변경 저장' : '등록하기',
    onEditClick: handleSave,
    endLabel: numericNo != null ? '삭제' : '취소',
    onEndClick: numericNo != null ? handleDelete : handleBack,
  };

  if (isLoading) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  return (
    <Container>
      <HeaderRow>
        <Title>
          {numericNo != null ? `브랜드 상세 (${numericNo})` : '브랜드 등록'}
        </Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      <ProductNumber>
        <strong>번호</strong>
        <span>{numericNo != null ? numericNo : '-'}</span>
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
          {/* 1행: 그룹사, 브랜드명, 제품수 */}
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

          {/* 2행: 할인율, 담당자, 연락처 */}
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

          {/* 3행: 상태 */}
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
              <span>- 상태 설정은 {statusOptions.join(' / ')}</span>
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
  width: 200px;
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
    width: 200px;
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
