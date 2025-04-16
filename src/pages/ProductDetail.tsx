import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import ListButtonDetailSubHeader from '../components/Header/ListButtonDetailSubHeader';
import SizeGuideSection from '../components/productregister/SizeGuideSection';
import SizeDisplaySection from '../components/productregister/SizeDisplaySection';
import MaterialInfoSection from '../components/productregister/MaterialInfoSection';
import FabricInfoSection from '../components/productregister/FabricInfoSection';
import ProductImageSection from '../components/productregister/ProductImageSection';
import DetailTopBoxes from '../components/DetailTopBoxes';
import ReusableModal from '../components/ReusableModal';
import ReusableModal2 from '../components/ReusableModal2';

import {
  getProductDetail,
  updateProduct,
  ProductDetailResponse,
  UpdateProductRequest,
} from '../api/adminProduct';

const defaultImages: (string | null)[] = [];

const ProductDetail: React.FC = () => {
  const { no } = useParams<{ no: string }>();
  const productId = no ? parseInt(no, 10) : null;
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [images, setImages] = useState<(string | null)[]>(defaultImages);

  // 제품정보 수정용 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalCallback, setModalCallback] = useState<(() => void) | null>(null);

  // 종료처리용 모달 상태
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [endModalMessage, setEndModalMessage] = useState('');
  const [endModalCallback, setEndModalCallback] = useState<(() => void) | null>(
    null
  );

  // 제품정보 수정 모달: 열기 함수
  const showModal = (message: string, callback?: () => void) => {
    setModalMessage(message);
    setModalCallback(() => callback || null);
    setModalOpen(true);
  };

  // 종료처리 모달: 열기 함수
  const showEndModal = (message: string, callback?: () => void) => {
    setEndModalMessage(message);
    setEndModalCallback(() => callback || null);
    setEndModalOpen(true);
  };

  // 중앙 업데이트 함수 (메모이제이션)
  const handleProductChange = useCallback(
    (data: Partial<ProductDetailResponse>) => {
      setProduct((prev) => ({ ...prev!, ...data }));
    },
    []
  );

  const handleSizesChange = useCallback(
    (sizes: ProductDetailResponse['sizes']) => {
      handleProductChange({ sizes });
    },
    [handleProductChange]
  );

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await getProductDetail(productId);
          if (data.sizes && data.sizes.length > 0) {
            data.sizes = data.sizes.map((item) => ({
              size: item.size,
              measurements: item.measurements || { 어깨: 0, 가슴: 0, 총장: 0 },
            }));
          }
          setProduct(data);
          if (data.product_img && data.product_img.length > 0) {
            setImages(data.product_img);
          }
        } catch (err) {
          console.error('제품 상세 정보를 불러오는데 실패했습니다.', err);
          setError('제품 상세 정보를 불러오는데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setError('유효한 제품 ID가 없습니다.');
      setLoading(false);
    }
  }, [productId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  // "정보수정" 버튼 클릭 시 중앙 상태(product)를 API로 업데이트 후 모달 표시
  const handleEditClick = async () => {
    if (product) {
      const updateData: UpdateProductRequest = {
        ...product,
        product_img: images.filter((img) => img) as string[],
        product_url: product.product_url,
      };
      try {
        const updated = await updateProduct(product.id, updateData);
        setProduct(updated);
        showModal('제품 정보가 수정되었습니다!', () =>
          navigate('/productlist')
        );
      } catch (error) {
        console.error('제품 정보 수정 실패', error);
        showModal('제품 정보 수정에 실패하였습니다.');
      }
    }
  };

  // "종료처리" 버튼 클릭 시 종료처리 전용 모달 열기
  const handleEndClick = () => {
    showEndModal('수정사항을 취소하시겠습니까?', () => navigate(-1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // 이미지 관련 핸들러들
  const handleImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImage = reader.result as string;
        setImages((prev) => {
          const newImages = [...prev];
          newImages[index] = uploadedImage;
          handleProductChange({
            product_img: newImages.filter((img) => !!img) as string[],
          });
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = null;
      handleProductChange({
        product_img: newImages.filter((img) => !!img) as string[],
      });
      return newImages;
    });
  };

  const handleImageReorder = (dragIndex: number, hoverIndex: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [removed] = next.splice(dragIndex, 1);
      next.splice(hoverIndex, 0, removed);
      handleProductChange({
        product_img: next.filter((img) => !!img) as string[],
      });
      return next;
    });
  };

  // 제품 URL 변경 핸들러
  const handleProductUrlChange = (value: string) => {
    handleProductChange({ product_url: value });
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <HeaderRow>
        <Title>제품관리</Title>
      </HeaderRow>
      <ListButtonDetailSubHeader
        backLabel='목록이동'
        onBackClick={handleBackClick}
        editLabel='정보수정'
        onEditClick={handleEditClick}
        endLabel='종료처리'
        onEndClick={handleEndClick}
      />
      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>
          {product ? product.id : '로딩 중...'}
        </ProductNumberValue>
      </ProductNumberWrapper>
      {product && (
        <>
          <DetailTopBoxes
            product={product}
            editable={true}
            onChange={handleProductChange}
          />
          <MiddleDivider />
          <FormWrapper onSubmit={handleSubmit}>
            <TwoColumnRow>
              <SizeGuideSection
                product={product}
                onSizesChange={handleSizesChange}
              />
              <SizeDisplaySection
                product={product}
                sizeProductImg={product.size_picture}
              />
            </TwoColumnRow>
            <MiddleDivider />
            <MaterialInfoSection
              product={product}
              editable={true}
              onChange={handleProductChange}
            />
            <MiddleDivider />
            <FabricInfoSection
              product={product}
              onChange={handleProductChange}
            />
            <MiddleDivider />
            <ProductImageSection
              images={images}
              handleImageUpload={handleImageUpload}
              handleImageDelete={handleImageDelete}
              handleImageReorder={handleImageReorder}
              productUrl={product.product_url}
            />
            <BottomDivider />
          </FormWrapper>
        </>
      )}

      {/* 정보수정용 모달 */}
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

export default ProductDetail;
/* Styled Components for ProductDetail */
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
