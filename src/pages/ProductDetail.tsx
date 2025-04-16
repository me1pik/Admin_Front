import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import TripleButtonDetailSubHeader from '../components/Header/TripleButtonDetailSubHeader';
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

  // 모달 상태 관리 (확인 및 알림용)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalCallback, setModalCallback] = useState<(() => void) | null>(null);

  const [endModalOpen, setEndModalOpen] = useState(false);
  const [endModalMessage, setEndModalMessage] = useState('');
  const [endModalCallback, setEndModalCallback] = useState<(() => void) | null>(
    null
  );

  // 모달 열기 함수 (확인 모달 용)
  const showModal = (message: string, callback?: () => void) => {
    setModalMessage(message);
    setModalCallback(() => callback || null);
    setModalOpen(true);
  };

  // 종료(취소) 모달 열기 함수
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

  // 등록완료 버튼 클릭 시 (registration: 1)
  const handleRegisterCompletedClick = () => {
    if (product) {
      showModal("제품 상태를 '등록완료'로 변경하시겠습니까?", async () => {
        try {
          const updateData: UpdateProductRequest = {
            ...product,
            product_img: images.filter((img) => img) as string[],
            product_url: product.product_url,
            registration: 1, // 등록완료 상태 코드 (예시)
          };
          const updated = await updateProduct(product.id, updateData);
          setProduct(updated);
          showModal('제품 상태가 등록완료로 변경되었습니다!', () =>
            navigate('/productlist')
          );
        } catch (error) {
          console.error('등록완료 업데이트 실패', error);
          showModal('제품 상태 변경에 실패했습니다.');
        }
      });
    }
  };

  // 등록대기 버튼 클릭 시 (registration: 0)
  const handlePendingClick = () => {
    if (product) {
      showModal("제품 상태를 '등록대기'로 변경하시겠습니까?", async () => {
        try {
          const updateData: UpdateProductRequest = {
            ...product,
            product_img: images.filter((img) => img) as string[],
            product_url: product.product_url,
            registration: 0, // 등록대기 상태 코드 (예시)
          };
          const updated = await updateProduct(product.id, updateData);
          setProduct(updated);
          showModal('제품 상태가 등록대기로 변경되었습니다!', () =>
            navigate('/productlist')
          );
        } catch (error) {
          console.error('등록대기 업데이트 실패', error);
          showModal('제품 상태 변경에 실패했습니다.');
        }
      });
    }
  };

  // 판매완료 버튼 클릭 시 (registration: 2)
  const handleSoldOutClick = () => {
    if (product) {
      showModal("제품 상태를 '판매완료'로 변경하시겠습니까?", async () => {
        try {
          const updateData: UpdateProductRequest = {
            ...product,
            product_img: images.filter((img) => img) as string[],
            product_url: product.product_url,
            registration: 2, // 판매완료 상태 코드 (예시)
          };
          const updated = await updateProduct(product.id, updateData);
          setProduct(updated);
          showModal('제품 상태가 판매완료로 변경되었습니다!', () =>
            navigate('/productlist')
          );
        } catch (error) {
          console.error('판매완료 업데이트 실패', error);
          showModal('제품 상태 변경에 실패했습니다.');
        }
      });
    }
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

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <HeaderRow>
        <Title>제품관리</Title>
      </HeaderRow>
      <TripleButtonDetailSubHeader
        backLabel='목록이동'
        onBackClick={handleBackClick}
        registerCompletedLabel='등록완료'
        onRegisterCompletedClick={handleRegisterCompletedClick}
        pendingLabel='등록대기'
        onPendingClick={handlePendingClick}
        soldOutLabel='판매완료'
        onSoldOutClick={handleSoldOutClick}
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
