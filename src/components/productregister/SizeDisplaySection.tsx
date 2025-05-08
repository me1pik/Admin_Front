// src/components/productregister/SizeDisplaySection.tsx
import React, { useState, ChangeEvent, useMemo } from 'react';
import styled from 'styled-components';
import { ProductDetailResponse } from '../../api/adminProduct';
import { sizeGuideConfig } from '../../config/sizeGuideConfig'; // 경로 수정

interface SizeDisplaySectionProps {
  product?: ProductDetailResponse;
  sizeProductImg: string;
}

const SizeDisplaySection: React.FC<SizeDisplaySectionProps> = ({
  product,
  sizeProductImg,
}) => {
  const category = product?.category || '';

  // 1) 카테고리별 라벨(한글) 목록
  const specLabels = useMemo(() => {
    const map = sizeGuideConfig[category]?.labels || {};
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, label]) => label);
  }, [category]);

  // 2) 제목/소제목/노트
  const [labelsState, setLabelsState] = useState({
    title: '사이즈 표기',
    specTitle: '[ 사이즈 표기 ]',
    note: '*측정 위치에 따라 약간의 오차 있음.',
  });
  const handleLabelChange = (
    field: keyof typeof labelsState,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setLabelsState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <SectionBox>
      <SectionHeader>
        <Bullet />
        <SectionTitleInput value={labelsState.title} readOnly />
      </SectionHeader>
      <VerticalLine />

      <SizeGuideContainer>
        <GuideWrapper>
          <ImageContainer>
            <SizeProductImage src={sizeProductImg} alt='사이즈 표기 이미지' />
          </ImageContainer>

          <SizeInfoContainer>
            <SpecTitleInput
              value={labelsState.specTitle}
              onChange={(e) => handleLabelChange('specTitle', e)}
            />

            {/* 3) mapping된 라벨들을 그대로 출력 */}
            <SpaceColumn>
              {specLabels.map((lbl) => (
                <SpecItemRow key={lbl}>
                  <SpecLabelInput value={lbl} readOnly />
                </SpecItemRow>
              ))}
            </SpaceColumn>

            <NoteInput
              value={labelsState.note}
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
`;

const SpecLabelInput = styled.input`
  font-size: 12px;
  font-weight: 700;
  text-align: left;
  border: none;
  background: transparent;
`;

const NoteInput = styled.input`
  font-size: 12px;
  color: #aaa;
  margin-top: 29px;
  text-align: center;
  border: none;
  background: transparent;
`;
