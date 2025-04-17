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
  SizeRow,
} from '../api/adminProduct';

const defaultImages: (string | null)[] = [];

const ProductDetail: React.FC = () => {
  const { no } = useParams<{ no: string }>();
  const productId = no ? parseInt(no, 10) : null;
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [images, setImages] = useState<(string | null)[]>(defaultImages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalCallback, setModalCallback] = useState<(() => void) | null>(null);
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
    (data: Partial<ProductDetailResponse>) =>
      setProduct((prev) => (prev ? { ...prev, ...data } : prev)),
    []
  );

  const handleSizesChange = useCallback(
    (sizes: SizeRow[]) => handleProductChange({ sizes }),
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

  const handleSave = () => {
    if (!product) return;
    showModal('변경 내용을 저장하시겠습니까?', async () => {
      try {
        const updateData: UpdateProductRequest = { ...product };
        Object.keys(updateData).forEach((key) => {
          const k = key as keyof UpdateProductRequest;
          const v = updateData[k];
          if (v == null || (Array.isArray(v) && (v as any[]).length === 0)) {
            delete updateData[k];
          }
        });
        const updated = await updateProduct(product.id, updateData);
        setProduct(updated);
        showModal('저장되었습니다.', () => navigate('/productlist'));
      } catch {
        showResultModal('저장에 실패했습니다.');
      }
    });
  };

  const handleDelete = () => {
    if (!product) return;
    showModal('정말 삭제하시겠습니까?', () => {
      const didFail = true;
      if (didFail) showResultModal('삭제에 실패했습니다.');
      else navigate('/productlist');
    });
  };

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
  const handleImageDelete = (idx: number) => {
    setImages((prev) => {
      const next = [...prev];
      next[idx] = null;
      handleProductChange({ product_img: next.filter((x) => !!x) as string[] });
      return next;
    });
  };
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

/* styled-components */
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
