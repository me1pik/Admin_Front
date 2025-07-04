import React, { useEffect, useState, useCallback, FormEvent } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import TripleButtonDetailSubHeader from '../../../components/Header/TripleButtonDetailSubHeader';
import SizeGuideSection from '../../../components/productregister/SizeGuideSection';
import SizeDisplaySection from '../../../components/productregister/SizeDisplaySection';
import MaterialInfoSection from '../../../components/productregister/MaterialInfoSection';
import FabricInfoSection from '../../../components/productregister/FabricInfoSection';
import ProductImageSection from '../../../components/productregister/ProductImageSection';
import DetailTopBoxes from '../../../components/DetailTopBoxes';
import ReusableModal from '../../../components/TwoButtonModal';
import ReusableModal2 from '../../../components/OneButtonModal';

import {
  getProductDetail,
  updateProduct,
  ProductDetailResponse,
  SizeRow,
} from '../../../api/adminProduct';

const cleanPayload = <T extends object>(obj: T): Partial<T> => {
  const result = { ...(obj as Record<string, unknown>) } as Partial<T>;
  Object.entries(result).forEach(([key, value]) => {
    if (key === 'product_img') return;
    // size_label_guide는 빈 객체여도 유지
    if (key === 'size_label_guide') {
      console.log('cleanPayload에서 size_label_guide 발견:', value);
      return;
    }
    if (
      value == null ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value).length === 0)
    ) {
      delete (result as Record<string, unknown>)[key];
    }
  });
  console.log('cleanPayload 결과:', result);
  return result;
};

const ProductDetail: React.FC = () => {
  const { no } = useParams<{ no: string }>();
  const productId = no ? Number(no) : null;
  const navigate = useNavigate();

  // 디버깅을 위한 navigate 함수 래핑
  const debugNavigate = (path: string) => {
    console.log('debugNavigate 호출됨:', path);
    console.log('navigate 함수 타입:', typeof navigate);
    navigate(path);
  };

  const [images, setImages] = useState<string[]>([]);
  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [sizeGuides, setSizeGuides] = useState<Record<string, SizeRow[]>>({});
  const [changed, setChanged] = useState<
    Partial<ProductDetailResponse & { sizes: SizeRow[] }>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [getCurrentSizeLabels, setGetCurrentSizeLabels] = useState<
    (() => Record<string, string>) | null
  >(null);

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
      console.log('handleProductChange 호출:', data);
      setProduct((prev) => (prev ? { ...prev, ...data } : prev));
      setChanged((prev) => ({ ...prev, ...data }));
    },
    [setProduct, setChanged]
  );
  const handleSizesChange = useCallback(
    (sizes: SizeRow[]) => handleProductChange({ sizes }),
    [handleProductChange]
  );

  const handleLabelChange = useCallback((labels: Record<string, string>) => {
    console.log('handleLabelChange 호출:', labels);
    // 라벨 변경을 changed 상태에 저장
    setChanged((prev) => ({ ...prev, size_label_guide: labels }));
  }, []);

  const updateImage = (idx: number, url: string | null) => {
    setImages((prev) => {
      const next = [...prev];
      if (url) next[idx] = url;
      else next.splice(idx, 1);
      handleProductChange({ product_img: next });
      return next;
    });
  };
  const handleImageLinkUpload = (idx: number, url: string) => {
    updateImage(idx, url);
  };
  const handleImageDelete = (idx: number) => updateImage(idx, null);
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
      const data = (await getProductDetail(id)) as ProductDetailResponse & {
        sizesByCategory: Record<string, SizeRow[]>;
      };
      setProduct(data);
      setImages(data.product_img || []);
      setSizeGuides(data.sizesByCategory || {});
      setChanged({});
    } catch (fetchErr: unknown) {
      console.error('제품 상세 정보를 불러오는 중 오류 발생:', fetchErr);
      const errorMessage =
        fetchErr instanceof Error ? fetchErr.message : '알 수 없는 오류';
      setError(`제품 상세 정보를 불러오는데 실패했습니다: ${errorMessage}`);
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

  useEffect(() => {
    if (!product) return;
    const guide = sizeGuides[product.category];
    if (guide) {
      setProduct((prev) => (prev ? { ...prev, sizes: guide } : prev));
      setChanged((prev) => ({ ...prev, sizes: guide }));
    }
  }, [product?.category, sizeGuides, product]);

  const handleSave = () => {
    if (!product) return;
    openConfirm('변경 내용을 저장하시겠습니까?', async () => {
      try {
        // 1) fabricComposition 정리: 빈값 제거 + 퍼센트 내림차순 정렬
        const rawComp = (changed.fabricComposition ||
          product.fabricComposition) as Record<string, string>;
        const sortedComp: Record<string, string> = {};

        Object.entries(rawComp || {}).forEach(([key, value]) => {
          if (typeof value !== 'string') {
            return; // 문자열이 아닐 경우 건너뜀
          }
          const items = value
            .split(/\s*,\s*/)
            .map((str) => {
              const parts = str.split(/\s+/);
              const material = parts[0] || '';
              const numStr = parts[1] || '';
              const percent = numStr
                ? parseInt(numStr.replace('%', ''), 10) || 0
                : 0;
              return { material, percent };
            })
            .filter((item) => item.material && item.percent > 0)
            .sort((a, b) => b.percent - a.percent);

          if (items.length > 0) {
            sortedComp[key] = items
              .map((i) => `${i.material} ${i.percent}%`)
              .join(', ');
          }
        });

        // 2) payload 구성 - 순수 라벨만 저장 (접두사 제거)
        let currentLabels: Record<string, string> = {};

        if (
          getCurrentSizeLabels &&
          typeof getCurrentSizeLabels === 'function'
        ) {
          currentLabels = getCurrentSizeLabels();
          console.log(
            'getCurrentSizeLabels()에서 가져온 순수 라벨:',
            currentLabels
          );
        } else {
          currentLabels =
            changed.size_label_guide ?? product.size_label_guide ?? {};
          console.log('기존 데이터에서 가져온 라벨:', currentLabels);
        }

        console.log('최종 저장할 순수 라벨:', currentLabels);
        console.log('getCurrentSizeLabels 함수:', getCurrentSizeLabels);
        console.log('changed.size_label_guide:', changed.size_label_guide);
        console.log('product.size_label_guide:', product.size_label_guide);

        const payload: Partial<ProductDetailResponse & { sizes: SizeRow[] }> = {
          ...changed,
          product_img: images,
          fabricComposition: sortedComp,
          size_label_guide: currentLabels,
        };
        if (changed.sizes || product.sizes) {
          payload.sizes = (changed.sizes ?? product.sizes ?? []).map((row) => ({
            size: row.size,
            measurements: { ...row.measurements },
          }));
        }

        const cleaned = cleanPayload(payload);

        // size_label_guide가 제거되었을 경우 강제로 추가
        if (
          !cleaned.size_label_guide &&
          currentLabels &&
          Object.keys(currentLabels).length > 0
        ) {
          cleaned.size_label_guide = currentLabels;
          console.log(
            'cleaned에서 size_label_guide가 제거되어 강제로 추가:',
            currentLabels
          );
        }

        // 디버그용: 전송 payload 콘솔 출력
        console.log('업데이트 전송 payload:', cleaned);
        console.log('사이즈 라벨 가이드:', cleaned.size_label_guide);
        console.log('사이즈 데이터:', cleaned.sizes);
        console.log('changed 상태:', changed);
        console.log('product 상태:', product);

        const updated = await updateProduct(product.id, cleaned);
        await fetchDetail(updated.id);
        setChanged({});
        openResult('수정 완료되었습니다.');
      } catch (updateErr: unknown) {
        console.error('제품 수정 중 오류 발생:', updateErr);
        const detailedMessage =
          updateErr instanceof Error ? updateErr.message : '알 수 없는 오류';
        openResult(`수정에 실패했습니다: ${detailedMessage}`);
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
        <Title>제품상세</Title>
      </HeaderRow>
      <TripleButtonDetailSubHeader
        backLabel='목록이동'
        onBackClick={() => {
          console.log('목록이동 버튼 클릭됨');
          console.log('현재 URL:', window.location.href);
          console.log('이동할 URL:', `/productlist${window.location.search}`);
          debugNavigate(`/productlist${window.location.search}`);
        }}
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
                category={product.category}
                sizes={changed.sizes ?? product.sizes ?? []}
                onSizesChange={handleSizesChange}
                onLabelChange={handleLabelChange}
                onSetGetCurrentLabels={setGetCurrentSizeLabels}
              />
              <SizeDisplaySection
                product={product}
                sizeProductImg={product.size_picture}
                onLabelChange={handleLabelChange}
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

/* Styled Components */
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
