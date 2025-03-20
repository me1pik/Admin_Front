// src/components/productregister/SizeDisplaySection.tsx
import React from 'react';
import styled from 'styled-components';

interface SizeDisplaySectionProps {
  sizeProductImg: string;
}

const SizeDisplaySection: React.FC<SizeDisplaySectionProps> = ({
  sizeProductImg,
}) => {
  return (
    <SectionBox style={{ flex: '0 0 auto' }}>
      <SectionHeader>
        <Bullet />
        <SectionTitle>사이즈 표기</SectionTitle>
      </SectionHeader>
      <VerticalLine />
      <SizeGuideContainer>
        <GuideWrapper>
          <ImageContainer>
            <SizeProductImage src={sizeProductImg} alt='사이즈 표기 이미지' />
          </ImageContainer>
          <SizeInfoContainer>
            <SpecTitle>[ 사이즈 표기 ]</SpecTitle>
            <SpaceColumn>
              <SpecItemRow>
                <SpecLabel>A. 어깨넓이</SpecLabel>
                <Unit>( cm 기준 )</Unit>
              </SpecItemRow>
              <SpecItemRow>
                <SpecLabel>B. 가슴둘레</SpecLabel>
                <Unit>( cm 기준 )</Unit>
              </SpecItemRow>
              <SpecItemRow>
                <SpecLabel>C. 허리둘레</SpecLabel>
                <Unit>( cm 기준 )</Unit>
              </SpecItemRow>
              <SpecItemRow>
                <SpecLabel>D. 팔길이</SpecLabel>
                <Unit>( cm 기준 )</Unit>
              </SpecItemRow>
              <SpecItemRow>
                <SpecLabel>E. 총길이</SpecLabel>
                <Unit>( cm 기준 )</Unit>
              </SpecItemRow>
            </SpaceColumn>
            <Note>*측정 위치에 따라 약간의 오차 있음.</Note>
          </SizeInfoContainer>
        </GuideWrapper>
      </SizeGuideContainer>
    </SectionBox>
  );
};

export default SizeDisplaySection;

const SectionBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

const Bullet = styled.div`
  position: absolute;
  left: -27px;
  top: 0;
  width: 14px;
  height: 14px;
  border: 1px solid #dddddd;
  border-radius: 50%;
  background: #fff;
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    background: #f6ae24;
    border-radius: 50%;
  }
`;

const SectionTitle = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  margin-left: 10px;
`;

const VerticalLine = styled.div`
  position: absolute;
  left: 0;
  top: 14px;
  bottom: 200px;
  width: 1px;
  background: #dddddd;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20px;
    height: 1px;
    background: #dddddd;
  }
`;

const SizeGuideContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GuideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #dddddd;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SizeProductImage = styled.img`
  width: 146px;
  height: 232px;
  object-fit: contain;
  margin: 10px;
`;

const SizeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 4px;
  padding: 20px 0;
`;

const SpecTitle = styled.div`
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const SpaceColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SpecItemRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
`;

const SpecLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

const Unit = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #999999;
`;

const Note = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-top: 29px;
`;
