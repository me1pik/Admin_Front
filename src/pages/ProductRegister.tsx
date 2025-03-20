// src/pages/ProductRegister.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import DetailSubHeader, { TabItem } from '../components/DetailSubHeader';
import sizeProductImg from '../assets/productregisterSizeProduct.svg';
import BasicInfoSection from '../components/productregister/BasicInfoSection';
import SizeSettingSection from '../components/productregister/SizeSettingSection';
import PriceSection from '../components/productregister/PriceSection';
import SizeGuideSection from '../components/productregister/SizeGuideSection';
import SizeDisplaySection from '../components/productregister/SizeDisplaySection';
import MaterialInfoSection from '../components/productregister/MaterialInfoSection';
import FabricInfoSection from '../components/productregister/FabricInfoSection';
import ProductImageSection from '../components/productregister/ProductImageSection';

const ProductRegister: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('제품 등록 완료!');
  };

  const handleTabChange = (tab: TabItem) => {
    console.log('선택된 버튼:', tab.label);
    if (tab.label === '변경저장') {
      alert('저장 로직 실행');
    } else {
      alert('취소 로직 실행');
    }
  };

  const tabs: TabItem[] = [{ label: '변경저장' }, { label: '취소' }];

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
      <DetailSubHeader tabs={tabs} onTabChange={handleTabChange} />
      <ProductNumber>번호 13486</ProductNumber>
      <TopDivider />

      <FormWrapper onSubmit={handleSubmit}>
        {/* 1행: 제품 기본정보, 종류 및 사이즈 설정, 제품 가격 */}
        <ThreeColumnRow>
          <BasicInfoSection />
          <SizeSettingSection />
          <PriceSection />
        </ThreeColumnRow>

        <MiddleDivider />

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

export default ProductRegister;

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

const ProductNumber = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  margin-bottom: 20px;
`;

const TopDivider = styled.hr`
  border: 0;
  border-top: 1px solid #dddddd;
  margin-bottom: 20px;
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

const ThreeColumnRow = styled.div`
  display: flex;
  gap: 50px;
`;

const TwoColumnRow = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 10px;
`;
