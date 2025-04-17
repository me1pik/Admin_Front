// src/pages/ProductDetail.tsx
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [images, setImages] = useState<(string | null)[]>(defaultImages);

  // 확인용 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalCallback, setModalCallback] = useState<(() => void) | null>(null);

  // 실패 메시지 모달
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [resultModalMessage, setResultModalMessage] = useState('');

  const showModal = (msg: string, cb?: () => void) => {
    setModalMessage(msg);
    setModalCallback(() => cb || null);
    setModalOpen(true);
  };

  const showResultModal = (msg: string) => {
    setResultModalMessage(msg);
    setResultModalOpen(true);
  };

  const handleProductChange = useCallback(
    (data: Partial<ProductDetailResponse>) => {
      setProduct((prev) => (prev ? { ...prev, ...data } : prev));
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
    if (!productId) {
      setError('유효한 제품 ID가 없습니다.');
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getProductDetail(productId);
        if (data.sizes?.length) {
          data.sizes = data.sizes.map((item) => ({
            size: item.size,
            measurements: item.measurements || { 어깨: 0, 가슴: 0, 총장: 0 },
          }));
        }
        setProduct(data);
        if (data.product_img?.length) setImages(data.product_img);
      } catch {
        setError('제품 상세 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  const handleBackClick = () => navigate(-1);

  // 변경 저장
  const handleSave = () => {
    if (!product) return;
    showModal('변경 내용을 저장하시겠습니까?', async () => {
      try {
        // UpdateProductRequest 타입에 맞춰 필드만 선택적으로 포함
        const updateData: UpdateProductRequest = {};
        if (product.name !== undefined) {
          updateData.name = product.name;
        }
        if (product.product_url !== undefined) {
          updateData.product_url = product.product_url;
        }
        const imgs = images.filter((img) => !!img) as string[];
        if (imgs.length > 0) {
          updateData.product_img = imgs;
        }
        if (product.registration !== undefined) {
          updateData.registration = product.registration;
        }
        if (product.price.discountRate !== undefined) {
          updateData.discount_rate = product.price.discountRate;
        }
        const updated = await updateProduct(product.id, updateData);
        setProduct(updated);
        showModal('저장되었습니다.', () => navigate('/productlist'));
      } catch {
        showResultModal('저장에 실패했습니다.');
      }
    });
  };

  // 삭제
  const handleDelete = () => {
    if (!product) return;
    showModal('정말 삭제하시겠습니까?', () => {
      // TODO: 삭제 API 호출
      const didFail = true;
      if (didFail) {
        showResultModal('삭제에 실패했습니다.');
      } else {
        navigate('/productlist');
      }
    });
  };

  // 이미지 업로드
  const handleImageUpload = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setImages((prev) => {
        const next = [...prev];
        next[idx] = dataUrl;
        handleProductChange({
          product_img: next.filter((x) => !!x) as string[],
        });
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  // 이미지 삭제
  const handleImageDelete = (idx: number) => {
    setImages((prev) => {
      const next = [...prev];
      next[idx] = null;
      handleProductChange({ product_img: next.filter((x) => !!x) as string[] });
      return next;
    });
  };

  // 이미지 순서 변경
  const handleImageReorder = (from: number, to: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      handleProductChange({ product_img: next.filter((x) => !!x) as string[] });
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
        saveLabel='변경저장'
        onSaveClick={handleSave}
        deleteLabel='삭제'
        onDeleteClick={handleDelete}
      />
      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{product?.id}</ProductNumberValue>
      </ProductNumberWrapper>
      {product && (
        <>
          <DetailTopBoxes
            product={product}
            editable
            onChange={handleProductChange}
          />
          <MiddleDivider />
          <Form onSubmit={(e) => e.preventDefault()}>
            <TwoColumn>
              <SizeGuideSection
                sizes={product.sizes}
                onSizesChange={handleSizesChange}
              />
              <SizeDisplaySection
                product={product}
                sizeProductImg={product.size_picture}
              />
            </TwoColumn>
            <MiddleDivider />
            <MaterialInfoSection
              product={product}
              editable
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
          </Form>
        </>
      )}
      <ReusableModal
        isOpen={modalOpen}
        title='알림'
        width='400px'
        height='200px'
        onClose={() => {
          setModalOpen(false);
          modalCallback?.();
        }}
        onConfirm={() => {
          setModalOpen(false);
          modalCallback?.();
        }}
      >
        {modalMessage}
      </ReusableModal>
      <ReusableModal2
        isOpen={resultModalOpen}
        title='오류'
        width='400px'
        height='200px'
        onClose={() => setResultModalOpen(false)}
      >
        {resultModalMessage}
      </ReusableModal2>
    </Container>
  );
};

export default ProductDetail;

/* Styled Components */
const Container = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;
const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
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
  border: 0;
  border-top: 1px dashed #ddd;
  margin: 30px 0;
`;
const BottomDivider = styled.hr`
  border: 0;
  border-top: 1px solid #ddd;
  margin: 40px 0 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const TwoColumn = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 10px;
`;
