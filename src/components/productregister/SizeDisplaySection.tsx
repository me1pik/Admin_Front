// SizeDisplaySection.tsx
import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { ProductDetailResponse } from '../../api/adminProduct';

interface SizeDisplaySectionProps {
  product?: ProductDetailResponse;
  sizeProductImg: string;
}

interface Labels {
  title: string;
  specTitle: string;
  specA: string;
  specB: string;
  specC: string;
  specD: string;
  specE: string;
  note: string;
}

const SizeDisplaySection: React.FC<SizeDisplaySectionProps> = ({
  sizeProductImg,
}) => {
  const [labels, setLabels] = useState<Labels>({
    title: '사이즈 표기',
    specTitle: '[ 사이즈 표기 ]',
    specA: 'A. 어깨넓이',
    specB: 'B. 가슴둘레',
    specC: 'C. 허리둘레',
    specD: 'D. 팔길이',
    specE: 'E. 총길이',
    note: '*측정 위치에 따라 약간의 오차 있음.',
  });

  const handleLabelChange = (
    field: keyof Labels,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setLabels((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  return (
    <SectionBox style={{ flex: '0 0 auto' }}>
      <SectionHeader>
        <Bullet />
        <SectionTitleInput value={labels.title} readOnly />
      </SectionHeader>
      <VerticalLine />
      <SizeGuideContainer>
        <GuideWrapper>
          <ImageContainer>
            <SizeProductImage src={sizeProductImg} alt='사이즈 표기 이미지' />
          </ImageContainer>
          <SizeInfoContainer>
            <SpecTitleInput
              value={labels.specTitle}
              onChange={(e) => handleLabelChange('specTitle', e)}
            />
            <SpaceColumn>
              <SpecItemRow>
                <SpecLabelInput
                  value={labels.specA}
                  onChange={(e) => handleLabelChange('specA', e)}
                />
                <Unit>( cm 기준 )</Unit>
              </SpecItemRow>
              <SpecItemRow>
                <SpecLabelInput
                  value={labels.specB}
                  onChange={(e) => handleLabelChange('specB', e)}
                />
                <Unit>( cm 기준 )</Unit>
              </SpecItemRow>
              <SpecItemRow>
                <SpecLabelInput
                  value={labels.specC}
                  onChange={(e) => handleLabelChange('specC', e)}
                />
                <Unit>( cm 기준 )</Unit>
              </SpecItemRow>
              <SpecItemRow>
                <SpecLabelInput
                  value={labels.specD}
                  onChange={(e) => handleLabelChange('specD', e)}
                />
                <Unit>( cm 기준 )</Unit>
              </SpecItemRow>
              <SpecItemRow>
                <SpecLabelInput
                  value={labels.specE}
                  onChange={(e) => handleLabelChange('specE', e)}
                />
                <Unit>( cm 기준 )</Unit>
              </SpecItemRow>
            </SpaceColumn>
            <NoteInput
              value={labels.note}
              onChange={(e) => handleLabelChange('note', e)}
            />
          </SizeInfoContainer>
        </GuideWrapper>
      </SizeGuideContainer>
    </SectionBox>
  );
};

export default SizeDisplaySection;

/* Styled Components */
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

const SectionTitleInput = styled.input`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  margin-left: 10px;
  border: none;
  background: transparent;
  &:read-only {
    color: #000;
  }
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

const SpecTitleInput = styled.input`
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 20px;
  text-align: center;
  border: none;
  background: transparent;
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

const SpecLabelInput = styled.input`
  font-size: 12px;
  font-weight: 700;
  text-align: left;
  border: none;
  background: transparent;
`;

const Unit = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #999999;
`;

const NoteInput = styled.input`
  font-size: 12px;
  color: #aaa;
  margin-top: 29px;
  text-align: center;
  border: none;
  background: transparent;
`;
