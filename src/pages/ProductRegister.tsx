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
  SizeRow,
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
  rental: undefined,
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
  touch: '',
  fit: '',
  sizes: [{ size: '', 어깨: 0, 가슴: 0, 총장: 0 } as SizeRow],
};

const ProductRegister: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : null;

  const [productDetail, setProductDetail] = useState<ProductDetailResponse>(
    productId ? ({} as ProductDetailResponse) : newEmptyProduct
  );
  const [images, setImages] = useState<(string | null)[]>([]);
  const [imageLinks, setImageLinks] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(!!productId);
  const [error, setError] = useState<string>('');

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalCallback, setModalCallback] = useState<(() => void) | null>(null);

  const [endModalOpen, setEndModalOpen] = useState(false);
  const [endModalMessage, setEndModalMessage] = useState('');
  const [endModalCallback, setEndModalCallback] = useState<(() => void) | null>(
    null
  );

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

  useEffect(() => {
    if (productId) {
      const fetchProductDetail = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await getProductDetail(productId);
          setProductDetail(data);
          if (data.product_img.length > 0) {
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

  const handleBackClick = () => navigate(-1);

  const handleEditOrRegister = async () => {
    if (productId) {
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
      } catch (err) {
        console.error('제품 정보 수정 실패', err);
        showModal('제품 정보 수정에 실패하였습니다.');
      }
    } else {
      console.log('신규 등록 데이터:', productDetail, images, imageLinks);
      showModal('제품이 등록되었습니다!', () => navigate('/productlist'));
    }
  };

  const handleEndClick = () =>
    showEndModal('등록 중인 내용을 취소하시겠습니까?', () => navigate(-1));

  // 수정: SizeRow[] 타입으로 변경
  const handleSizesChange = (sizes: SizeRow[]) => {
    setProductDetail((prev) => ({ ...prev, sizes }));
  };

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

  const handleImageUpload = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => {
          const a = [...prev];
          a[index] = reader.result as string;
          return a;
        });
        setImageLinks((prev) => {
          const a = [...prev];
          a[index] = reader.result as string;
          return a;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => {
      const a = [...prev];
      a[index] = null;
      return a;
    });
    setImageLinks((prev) => {
      const a = [...prev];
      a[index] = '';
      return a;
    });
  };

  const handleImageReorder = (dragIndex: number, hoverIndex: number) => {
    setImages((prev) => {
      const a = [...prev];
      const [b] = a.splice(dragIndex, 1);
      a.splice(hoverIndex, 0, b);
      return a;
    });
    setImageLinks((prev) => {
      const a = [...prev];
      const [b] = a.splice(dragIndex, 1);
      a.splice(hoverIndex, 0, b);
      return a;
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

      <DetailTopBoxes
        product={productDetail}
        editable={!productId}
        onChange={(data) => setProductDetail((prev) => ({ ...prev, ...data }))}
      />

      <MiddleDivider />

      <FormWrapper onSubmit={(e) => e.preventDefault()}>
        <TwoColumnRow>
          <SizeGuideSection
            sizes={productDetail.sizes}
            onSizesChange={handleSizesChange}
          />
          <SizeDisplaySection
            product={productDetail}
            sizeProductImg={sizeProductImg}
          />
        </TwoColumnRow>

        <MiddleDivider />

        <MaterialInfoSection
          product={productDetail}
          editable={!productId}
          onChange={(data) =>
            setProductDetail((prev) => ({ ...prev, ...data }))
          }
        />

        <MiddleDivider />

        <FabricInfoSection
          product={productDetail}
          onChange={(data) =>
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
          modalCallback?.();
        }}
        onConfirm={() => {
          setModalOpen(false);
          modalCallback?.();
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
          endModalCallback?.();
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
// const InfoCol = styled.div``;
// const Divider = styled.div``;
// const SizeRowStyled = styled.div``;
// const SizeBox = styled.div``;
// const SizeBoxEditable = styled.div``;
