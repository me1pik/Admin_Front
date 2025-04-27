// src/pages/ProductDetail.tsx
import React, { useEffect, useState, useCallback, FormEvent } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import TripleButtonDetailSubHeader from '../components/Header/TripleButtonDetailSubHeader';
import SizeGuideSection from '../components/productregister/SizeGuideSection';
import SizeDisplaySection from '../components/productregister/SizeDisplaySection';
import MaterialInfoSection from '../components/productregister/MaterialInfoSection';
import FabricInfoSection from '../components/productregister/FabricInfoSection';
import ProductImageSection from '../components/productregister/ProductImageSection';
import DetailTopBoxes from '../components/DetailTopBoxes';
import ReusableModal from '../components/TwoButtonModal';
import ReusableModal2 from '../components/OneButtonModal';

import {
  getProductDetail,
  updateProduct,
  ProductDetailResponse,
  SizeRow,
} from '../api/adminProduct';

const cleanPayload = <T extends object>(obj: T): Partial<T> => {
  const result = { ...(obj as any) } as Partial<T>;
  Object.entries(result).forEach(([key, value]) => {
    if (key === 'product_img') return;
    if (
      value == null ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value).length === 0)
    ) {
      delete (result as any)[key];
    }
  });
  return result;
};

const ProductDetail: React.FC = () => {
  const { no } = useParams<{ no: string }>();
  const productId = no ? Number(no) : null;
  const navigate = useNavigate();

  const [images, setImages] = useState<string[]>([]);
  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [changed, setChanged] = useState<
    Partial<ProductDetailResponse & { sizes: SizeRow[] }>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [confirmConfig, setConfirmConfig] = useState<{
    open: boolean;
    message: string;
    onConfirm?: () => Promise<void>;
  }>({ open: false, message: '' });
  const [resultConfig, setResultConfig] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: '' });

  const openConfirm = (message: string, onConfirm?: () => Promise<void>) => {
    setConfirmConfig({ open: true, message, onConfirm });
  };
  const openResult = (message: string) => {
    setResultConfig({ open: true, message });
  };

  const handleProductChange = useCallback(
    (data: Partial<ProductDetailResponse & { sizes: SizeRow[] }>) => {
      setProduct((prev) => (prev ? { ...prev, ...data } : prev));
      setChanged((prev) => ({ ...prev, ...data }));
    },
    []
  );
  const handleSizesChange = useCallback(
    (sizes: SizeRow[]) => handleProductChange({ sizes }),
    [handleProductChange]
  );

  // 이미지 업데이트 헬퍼
  const updateImage = (idx: number, url: string | null) => {
    setImages((prev) => {
      const next = [...prev];
      if (url) next[idx] = url;
      else next.splice(idx, 1);
      handleProductChange({ product_img: next });
      return next;
    });
  };

  // URL 삽입
  const handleImageLinkUpload = (idx: number, url: string) => {
    updateImage(idx, url);
  };

  // 삭제
  const handleImageDelete = (idx: number) => updateImage(idx, null);

  // 순서 변경
  const handleImageReorder = (from: number, to: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      handleProductChange({ product_img: next });
      return next;
    });
  };

  const fetchDetail = async (id: number) => {
    setLoading(true);
    try {
      const data = await getProductDetail(id);
      setProduct(data);
      setImages(data.product_img || []);
      setError(null);
    } catch {
      setError('제품 상세 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId == null) {
      setError('유효한 제품 ID가 없습니다.');
      setLoading(false);
    } else {
      fetchDetail(productId);
    }
  }, [productId]);

  const handleSave = () => {
    if (!product) return;
    openConfirm('변경 내용을 저장하시겠습니까?', async () => {
      try {
        const payload: any = { ...changed, product_img: images };
        if (product.sizes) {
          payload.sizes = product.sizes.map((row) => ({
            size: row.size,
            measurements: { ...row.measurements },
          }));
        }
        const cleaned = cleanPayload(payload);
        const updated = await updateProduct(product.id, cleaned);
        await fetchDetail(updated.id);
        setChanged({});
        openResult('수정 완료되었습니다.');
      } catch {
        openResult('수정에 실패했습니다.');
      }
    });
  };
  const handleDelete = () => {
    openConfirm('정말 삭제하시겠습니까?', async () => {
      openResult('삭제에 실패했습니다.');
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
        onBackClick={() => navigate(-1)}
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
          <Form onSubmit={(e: FormEvent) => e.preventDefault()}>
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
              handleImageLinkUpload={handleImageLinkUpload}
              handleImageDelete={handleImageDelete}
              handleImageReorder={handleImageReorder}
              productUrl={product.product_url}
            />
            <BottomDivider />
          </Form>
        </>
      )}

      <ReusableModal
        isOpen={confirmConfig.open}
        title='알림'
        width='400px'
        height='200px'
        onClose={() => setConfirmConfig((c) => ({ ...c, open: false }))}
        onConfirm={async () => {
          setConfirmConfig((c) => ({ ...c, open: false }));
          if (confirmConfig.onConfirm) await confirmConfig.onConfirm();
        }}
      >
        {confirmConfig.message}
      </ReusableModal>
      <ReusableModal2
        isOpen={resultConfig.open}
        title='알림'
        width='400px'
        height='200px'
        onClose={() => setResultConfig((c) => ({ ...c, open: false }))}
      >
        {resultConfig.message}
      </ReusableModal2>
    </Container>
  );
};

export default ProductDetail;

/* Styled Components 생략 없이 유지 */

const Container = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
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
