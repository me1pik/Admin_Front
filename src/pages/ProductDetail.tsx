// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import ListButtonDetailSubHeader from '../components/Header/ListButtonDetailSubHeader';
import SizeGuideSection from '../components/productregister/SizeGuideSection';
import SizeDisplaySection from '../components/productregister/SizeDisplaySection';
import MaterialInfoSection from '../components/productregister/MaterialInfoSection';
import FabricInfoSection from '../components/productregister/FabricInfoSection';
import ProductImageSection from '../components/productregister/ProductImageSection';
import DetailTopBoxes from '../components/DetailTopBoxes';
import {
  getProductDetail,
  updateProduct,
  ProductDetailResponse,
  UpdateProductRequest,
} from '../api/adminProduct';

const defaultImages = [
  'https://via.placeholder.com/140x200?text=Thumbnail',
  'https://via.placeholder.com/140x200?text=Image+1',
  // ... 기타 기본 이미지
];

const ProductDetail: React.FC = () => {
  const { no } = useParams<{ no: string }>();
  const productId = no ? parseInt(no, 10) : null;
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [images, setImages] = useState<(string | null)[]>(defaultImages);
  const [imageLinks, setImageLinks] =
    useState<(string | null)[]>(defaultImages);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await getProductDetail(productId);
          setProduct(data);
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
      fetchProduct();
    } else {
      setError('유효한 제품 ID가 없습니다.');
      setLoading(false);
    }
  }, [productId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = async () => {
    if (product) {
      const updateData: UpdateProductRequest = {
        name: product.name,
        product_url: product.product_url,
        product_img: imageLinks.filter((link) => link) as string[],
      };
      try {
        const updated = await updateProduct(product.id, updateData);
        setProduct(updated);
        alert('제품 정보가 수정되었습니다!');
        navigate('/productlist');
      } catch (error) {
        console.error('제품 정보 수정 실패', error);
        alert('제품 정보 수정에 실패하였습니다.');
      }
    }
  };

  const handleEndClick = async () => {
    if (product) {
      const terminationUpdate: UpdateProductRequest = {
        // 종료처리 필요한 필드 채워 넣기
      };
      try {
        const updated = await updateProduct(product.id, terminationUpdate);
        setProduct(updated);
        alert('종료 처리가 완료되었습니다!');
        navigate('/productlist');
      } catch (error) {
        console.error('종료 처리 실패', error);
        alert('종료 처리에 실패하였습니다.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => {
          const newImages = [...prev];
          newImages[index] = reader.result as string;
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
      return newImages;
    });
    setImageLinks((prev) => {
      const newLinks = [...prev];
      newLinks[index] = '';
      return newLinks;
    });
  };

  const handleImageLinkChange = (index: number, value: string) => {
    setImageLinks((prev) => {
      const newLinks = [...prev];
      newLinks[index] = value;
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
          <DetailTopBoxes product={product} />
          <MiddleDivider />
          <FormWrapper onSubmit={handleSubmit}>
            <TwoColumnRow>
              <SizeGuideSection
                product={product} /* onSizesChange 콜백 추가 가능 */
              />
              <SizeDisplaySection
                product={product}
                sizeProductImg={product.size_picture}
              />
            </TwoColumnRow>
            <MiddleDivider />
            <MaterialInfoSection
              product={product}
              onChange={(data: Partial<ProductDetailResponse>) =>
                setProduct((prev) => ({ ...prev!, ...data }))
              }
            />
            <MiddleDivider />
            <FabricInfoSection
              product={product}
              onChange={(data: Partial<ProductDetailResponse>) =>
                setProduct((prev) => ({ ...prev!, ...data }))
              }
            />
            <MiddleDivider />
            <ProductImageSection
              images={
                product.product_img && product.product_img.length > 0
                  ? product.product_img
                  : images
              }
              imageLinks={imageLinks}
              handleImageUpload={handleImageUpload}
              handleImageDelete={handleImageDelete}
              handleImageLinkChange={handleImageLinkChange}
              handleImageReorder={handleImageReorder}
            />
            <BottomDivider />
          </FormWrapper>
        </>
      )}
    </Container>
  );
};

export default ProductDetail;

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
