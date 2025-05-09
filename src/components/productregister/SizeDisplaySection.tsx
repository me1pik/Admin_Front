import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { ProductDetailResponse } from '../../api/adminProduct';
import { sizeGuideConfig } from '../../config/sizeGuideConfig';

interface SizeDisplaySectionProps {
  product?: ProductDetailResponse;
  sizeProductImg: string;
  /** 변경된 라벨을 부모로 전달 */
  onLabelChange?: (labels: Record<string, string>) => void;
}

const SizeDisplaySection: React.FC<SizeDisplaySectionProps> = ({
  product,
  sizeProductImg,
  onLabelChange,
}) => {
  const category = product?.category || '';

  // 1) config에서 key 목록과 초기 라벨 맵 가져오기
  const keys = useMemo(
    () => Object.keys(sizeGuideConfig[category]?.labels || {}),
    [category]
  );
  const initialLabels = useMemo(
    () => sizeGuideConfig[category]?.labels || {},
    [category]
  );

  // 2) 라벨 상태 관리
  const [labelMap, setLabelMap] =
    useState<Record<string, string>>(initialLabels);

  // category 변경 시 라벨 초기화 & 부모에 초기값 전달
  useEffect(() => {
    setLabelMap(initialLabels);
    onLabelChange?.(initialLabels);
    // category가 바뀔 때만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLabels]);

  // 3) 사용자가 입력할 때만 부모에 전달
  const handleLabelChange = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    const next = { ...labelMap, [key]: e.target.value };
    setLabelMap(next);
    onLabelChange?.(next);
  };

  return (
    <SectionBox>
      <SectionHeader>
        <Bullet />
        <SectionTitle>사이즈 표기</SectionTitle>
      </SectionHeader>
      <VerticalLine />
      <GuideWrapper>
        <ImageContainer>
          <SizeImage src={sizeProductImg} alt='사이즈 표기 이미지' />
        </ImageContainer>
        <InfoContainer>
          <SpecTitle>[ 사이즈 표기 ]</SpecTitle>
          <SpaceColumn>
            {keys.map((key) => (
              <SpecRow key={key}>
                <SpecInput
                  value={labelMap[key]}
                  onChange={(e) => handleLabelChange(key, e)}
                />
              </SpecRow>
            ))}
          </SpaceColumn>
          <Note>*측정 위치에 따라 약간의 오차 있음.</Note>
        </InfoContainer>
      </GuideWrapper>
    </SectionBox>
  );
};

export default SizeDisplaySection;

/* ---- styled-components ---- */
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
  font-weight: 800;
  font-size: 14px;
  margin-left: 10px;
`;
const VerticalLine = styled.div`
  position: absolute;
  left: 0;
  top: 14px;
  bottom: 0;
  width: 1px;
  background: #dddddd;
`;
const GuideWrapper = styled.div`
  display: flex;
  border: 1px solid #dddddd;
`;
const ImageContainer = styled.div`
  padding: 10px;
`;
const SizeImage = styled.img`
  width: 146px;
  height: 232px;
  object-fit: contain;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const SpecTitle = styled.div`
  font-size: 12px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
`;
const SpaceColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SpecRow = styled.div`
  display: flex;
  align-items: center;
`;
const SpecInput = styled.input`
  font-size: 12px;
  font-weight: 700;
  text-align: left;
  border: none;
  background: transparent;
`;
const Note = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-top: 29px;
  text-align: center;
`;
