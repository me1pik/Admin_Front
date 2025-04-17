// src/pages/ProductRegister.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ListButtonDetailSubHeader from '../components/Header/ListButtonDetailSubHeader';
import sizeProductImg from '../assets/productregisterSizeProduct.svg';
import DetailTopBoxes from '../components/DetailTopBoxes';
import SizeGuideSection from '../components/productregister/SizeGuideSection';
import SizeDisplaySection from '../components/productregister/SizeDisplaySection';
import MaterialInfoSection from '../components/productregister/MaterialInfoSection';
import FabricInfoSection from '../components/productregister/FabricInfoSection';
import ProductImageSection from '../components/productregister/ProductImageSection';
import ReusableModal from '../components/ReusableModal';
import ReusableModal2 from '../components/ReusableModal2';
import {
  getProductDetail,
  updateProduct,
  ProductDetailResponse,
  UpdateProductRequest,
} from '../api/adminProduct';

// 신규 등록용 빈 제품 정보
const newEmptyProduct: ProductDetailResponse = {
  id: 0,
  name: '',
  product_num: '',
  brand: '',
  category: '',
  color: '',
  price: {
    originalPrice: 0,
    discountRate: 0,
    finalPrice: 0,
  },
  registration: 0,
  registration_date: '',
  product_url: '',
  product_img: [],
  size_picture: '',
  season: '',
  manufacturer: '',
  description: '',
  fabricComposition: {
    겉감: '',
    안감: '',
  },
  elasticity: '',
  transparency: '',
  thickness: '',
  lining: '',
  fit: '',
  sizes: [{ size: '', measurements: { 어깨: 0, 가슴: 0, 총장: 0 } }],
};

const ProductRegister: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // 수정 모드일 경우 productId가 존재, 신규 등록이면 null
  const productId = id ? parseInt(id, 10) : null;

  const [productDetail, setProductDetail] = useState<ProductDetailResponse>(
    productId ? ({} as ProductDetailResponse) : newEmptyProduct
  );
  const [images, setImages] = useState<(string | null)[]>([]);
  const [imageLinks, setImageLinks] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(!!productId);
  const [error, setError] = useState<string>('');

  // 정보수정(또는 등록 완료)용 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalCallback, setModalCallback] = useState<(() => void) | null>(null);

  // 종료처리용 모달 상태 (수정 모드에서만 사용)
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [endModalMessage, setEndModalMessage] = useState('');
  const [endModalCallback, setEndModalCallback] = useState<(() => void) | null>(
    null
  );

  // 모달 열기 함수들
  const showModal = (message: string, callback?: () => void) => {
    setModalMessage(message);
    setModalCallback(() => callback || null);
    setModalOpen(true);
  };

  const showEndModal = (message: string, callback?: () => void) => {
    setEndModalMessage(message);
    setEndModalCallback(() => callback || null);
    setEndModalOpen(true);
  };

  // 수정 모드라면 productId가 존재할 때 API로 제품 정보를 불러옴
  useEffect(() => {
    if (productId) {
      const fetchProductDetail = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await getProductDetail(productId);
          setProductDetail(data);
          if (data.product_img && data.product_img.length > 0) {
            setImages(data.product_img);
            setImageLinks(data.product_img);
          }
        } catch (err) {
          console.error('제품 상세 정보를 불러오는데 실패했습니다.', err);
          setError('제품 상세 정보를 불러오는데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      };
      fetchProductDetail();
    }
  }, [productId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 수정 모드 또는 신규 등록 완료 시 호출되는 함수
  const handleEditOrRegister = async () => {
    if (productId) {
      // 수정 모드인 경우 API를 통해 업데이트
      const updateData: UpdateProductRequest = {
        name: productDetail.name,
        product_url: productDetail.product_url,
        product_img: imageLinks.filter((link) => link) as string[],
      };
      try {
        const updated = await updateProduct(productDetail.id, updateData);
        setProductDetail(updated);
        showModal('제품 정보가 수정되었습니다!', () =>
          navigate('/productlist')
        );
      } catch (error) {
        console.error('제품 정보 수정 실패', error);
        showModal('제품 정보 수정에 실패하였습니다.');
      }
    } else {
      // 신규 등록 모드: API 호출 없이 진행
      console.log('신규 등록 데이터:', productDetail, images, imageLinks);
      showModal('제품이 등록되었습니다!', () => navigate('/productlist'));
    }
  };

  // 종료처리 버튼 클릭 시
  const handleEndClick = () => {
    showEndModal('등록 중인 내용을 취소하시겠습니까?', () => navigate(-1));
  };

  // 사이즈 변경 콜백
  const handleSizesChange = (
    sizes: {
      size: string;
      measurements: { 어깨: number; 가슴: number; 총장: number };
    }[]
  ) => {
    setProductDetail((prev) => ({ ...prev, sizes }));
  };

  // ListButtonDetailSubHeader에 전달할 props (수정 모드면 종료처리 버튼 활성화)
  const detailSubHeaderProps = productId
    ? {
        backLabel: '목록이동',
        onBackClick: handleBackClick,
        editLabel: '정보수정',
        onEditClick: handleEditOrRegister,
        endLabel: '종료처리',
        onEndClick: handleEndClick,
      }
    : {
        backLabel: '목록이동',
        onBackClick: handleBackClick,
        editLabel: '등록 완료',
        onEditClick: handleEditOrRegister,
      };

  // 이미지 관련 핸들러들
  const handleImageUpload = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => {
          const newImgs = [...prev];
          newImgs[index] = reader.result as string;
          return newImgs;
        });
        setImageLinks((prev) => {
          const newLinks = [...prev];
          newLinks[index] = reader.result as string;
          return newLinks;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => {
      const newImgs = [...prev];
      newImgs[index] = null;
      return newImgs;
    });
    setImageLinks((prev) => {
      const newLinks = [...prev];
      newLinks[index] = '';
      return newLinks;
    });
  };

  const handleImageReorder = (dragIndex: number, hoverIndex: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [removed] = next.splice(dragIndex, 1);
      next.splice(hoverIndex, 0, removed);
      return next;
    });
    setImageLinks((prev) => {
      const next = [...prev];
      const [removed] = next.splice(dragIndex, 1);
      next.splice(hoverIndex, 0, removed);
      return next;
    });
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <HeaderRow>
        <Title>제품등록</Title>
      </HeaderRow>

      <ListButtonDetailSubHeader {...detailSubHeaderProps} />

      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>
          {productId ? productDetail.id : '신규 등록'}
        </ProductNumberValue>
      </ProductNumberWrapper>

      {/* 신규 등록 모드에서도 DetailTopBoxes 컴포넌트를 항상 렌더링 */}
      <DetailTopBoxes
        product={productDetail}
        editable={!productId} // 신규 등록인 경우 편집 가능하도록 처리
        onChange={(data) => setProductDetail((prev) => ({ ...prev, ...data }))}
      />

      <MiddleDivider />

      <FormWrapper onSubmit={(e) => e.preventDefault()}>
        <TwoColumnRow>
          <SizeGuideSection
            sizes={productDetail.sizes ?? []}
            onSizesChange={handleSizesChange}
          />
          <SizeDisplaySection
            product={productDetail}
            sizeProductImg={sizeProductImg}
          />
        </TwoColumnRow>

        <MiddleDivider />

        {/* MaterialInfoSection에 editable을 명시적으로 전달합니다. 신규 등록일 때는 true */}
        <MaterialInfoSection
          product={productDetail}
          editable={!productId}
          onChange={(data: Partial<ProductDetailResponse>) =>
            setProductDetail((prev) => ({ ...prev, ...data }))
          }
        />

        <MiddleDivider />

        <FabricInfoSection
          product={productDetail}
          onChange={(data: Partial<ProductDetailResponse>) =>
            setProductDetail((prev) => ({ ...prev, ...data }))
          }
        />

        <MiddleDivider />

        <ProductImageSection
          images={productDetail.product_img}
          handleImageUpload={handleImageUpload}
          handleImageDelete={handleImageDelete}
          handleImageReorder={handleImageReorder}
          productUrl={productDetail.product_url}
        />

        <BottomDivider />
      </FormWrapper>

      <ReusableModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (modalCallback) modalCallback();
        }}
        onConfirm={() => {
          setModalOpen(false);
          if (modalCallback) modalCallback();
        }}
        title='알림'
        width='400px'
        height='200px'
      >
        {modalMessage}
      </ReusableModal>

      <ReusableModal2
        isOpen={endModalOpen}
        onClose={() => setEndModalOpen(false)}
        onConfirm={() => {
          setEndModalOpen(false);
          if (endModalCallback) endModalCallback();
        }}
        title='알림'
        width='400px'
        height='200px'
      >
        {endModalMessage}
      </ReusableModal2>
    </Container>
  );
};

export default ProductRegister;

/* Styled Components */
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
  color: #000;
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
  color: #000;
`;
const ProductNumberValue = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000;
`;
const MiddleDivider = styled.hr`
  border: 0;
  border-top: 1px dashed #ddd;
  margin: 30px 0;
`;
const BottomDivider = styled.hr`
  border: 0;
  border-top: 1px solid #ddd;
  margin: 40px 0 20px;
`;
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
const TwoColumnRow = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 10px;
`;
