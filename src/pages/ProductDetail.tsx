// src/pages/ProductRegister.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import ListButtonDetailSubHeader, {
  DetailSubHeaderProps,
} from '../components/Header/ListButtonDetailSubHeader';

import sizeProductImg from '../assets/productregisterSizeProduct.svg';
import SizeGuideSection from '../components/productregister/SizeGuideSection';
import SizeDisplaySection from '../components/productregister/SizeDisplaySection';
import MaterialInfoSection from '../components/productregister/MaterialInfoSection';
import FabricInfoSection from '../components/productregister/FabricInfoSection';
import ProductImageSection from '../components/productregister/ProductImageSection';
import DetailTopBoxes from '../components/DetailTopBoxes';

// 더미 데이터에서 번호를 가져오기 (예시로 첫번째 제품의 번호 사용)
const dummyProducts = [
  {
    no: 13486,
    // 기타 필드 생략
  },
];

const ProductDetail: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  /** 목록으로 버튼 클릭 시 */
  const handleBackClick = () => {
    console.log('목록으로 버튼 클릭됨');
    window.history.back();
  };

  /** 정보수정 버튼 클릭 시 */
  const handleEditClick = () => {
    console.log('정보수정 버튼 클릭 -> 정보 수정 로직 실행');
    alert('정보가 수정되었습니다!');
  };

  /** 종료처리 버튼 클릭 시 */
  const handleEndClick = () => {
    console.log('종료처리 버튼 클릭 -> 종료 처리 로직 실행');
    alert('종료 처리가 완료되었습니다!');
  };

  // ListButtonDetailSubHeader에 넘길 프롭스
  const detailSubHeaderProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: handleBackClick,
    editLabel: '정보수정',
    onEditClick: handleEditClick,
    endLabel: '종료처리',
    onEndClick: handleEndClick,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('제품 등록 완료!');
  };

  // 이미지 업로드 핸들러
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

  return (
    <Container>
      {/* 상단 헤더 영역 */}
      <HeaderRow>
        <Title>제품관리</Title>
      </HeaderRow>

      {/* 목록이동 / 정보수정 / 종료처리 버튼 */}
      <ListButtonDetailSubHeader {...detailSubHeaderProps} />

      {/* 번호 표시 */}
      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{dummyProducts[0].no}</ProductNumberValue>
      </ProductNumberWrapper>

      {/* 상단 3박스 영역 */}
      <DetailTopBoxes />

      <MiddleDivider />

      <FormWrapper onSubmit={handleSubmit}>
        {/* 2행: 사이즈 가이드, 사이즈 표기 */}
        <TwoColumnRow>
          <SizeGuideSection />
          <SizeDisplaySection sizeProductImg={sizeProductImg} />
        </TwoColumnRow>

        <MiddleDivider />

        {/* 3행: 제품 소재정보 */}
        <MaterialInfoSection />

        <MiddleDivider />

        {/* 4행: 제품 원단정보 */}
        <FabricInfoSection />

        <MiddleDivider />

        {/* 5행: 제품 이미지 */}
        <ProductImageSection
          images={images}
          handleImageUpload={handleImageUpload}
        />

        <BottomDivider />
      </FormWrapper>
    </Container>
  );
};

export default ProductDetail;

/* ====================== Styled Components ====================== */

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
  color: #000000;
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
  color: #000000;
`;

const ProductNumberValue = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
`;

const MiddleDivider = styled.hr`
  border: 0;
  border-top: 1px dashed #dddddd;
  margin: 30px 0;
`;

const BottomDivider = styled.hr`
  border: 0;
  border-top: 1px solid #dddddd;
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
