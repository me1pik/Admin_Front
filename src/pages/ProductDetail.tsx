// src/pages/ProductDetail.tsx
import React, {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
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
        setImages(data.product_img ?? []);
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
        // 1) 원본 복사
        const copy: any = { ...product };

        // 2) 서버 관리 필드 삭제
        delete copy.id;
        delete copy.registration_date;
        delete copy.status;

        // 3) 이미지 배열 업데이트
        copy.product_img = images.filter((x) => x) as string[];

        // 4) flat Sizes → nested measurements 변환
        if (Array.isArray(copy.sizes)) {
          copy.sizes = copy.sizes.map((row: any) => {
            const { size, ...rest } = row;
            // rest 에 measurement 키가 이미 있을 경우 그대로 두고,
            // flat 필드들이 있으면 그걸로 measurements 객체 생성
            if (row.measurements)
              return { size, measurements: row.measurements };
            // flat 구조: rest 에 어깨, 가슴, 허리, 팔길이, 총길이 key
            const measurements: Record<string, number> = {};
            ['어깨', '가슴', '허리', '팔길이', '총길이'].forEach((key) => {
              if (rest[key] != null) measurements[key] = Number(rest[key]);
            });
            return { size, measurements };
          });
        }

        // 5) fabric_* 필드는 FabricInfoSection 에서 이미 fabricComposition 으로 변경되었다 가정

        // 6) 빈 값/빈 배열/빈 객체/null 삭제
        Object.keys(copy).forEach((key) => {
          const v = copy[key];
          if (
            v == null ||
            (Array.isArray(v) && v.length === 0) ||
            (typeof v === 'object' &&
              !Array.isArray(v) &&
              Object.keys(v).length === 0)
          ) {
            delete copy[key];
          }
        });

        // 7) API 호출
        const updated = await updateProduct(product.id, copy);
        setProduct(updated);
        showModal('저장되었습니다.', () => navigate('/productlist'));
      } catch {
        showResultModal('저장에 실패했습니다.');
      }
    });
  };

  const handleDelete = () => {
    showModal('정말 삭제하시겠습니까?', () => {
      // TODO: delete API 로직 추가
      showResultModal('삭제에 실패했습니다.');
    });
  };

  const handleImageUpload = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
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
      handleProductChange({
        product_img: next.filter((x) => !!x) as string[],
      });
      return next;
    });
  };
  const handleImageReorder = (from: number, to: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      handleProductChange({
        product_img: next.filter((x) => !!x) as string[],
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

/* Styled-components */
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
