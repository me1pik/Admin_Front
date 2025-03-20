// src/components/productregister/ProductImageSection.tsx
import React from 'react';
import styled from 'styled-components';

interface ProductImageSectionProps {
  images: (string | null)[];
  handleImageUpload: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  images,
  handleImageUpload,
}) => {
  const imageLabels = [
    '썸네일 이미지',
    '착장 이미지 1',
    '착장 이미지 2',
    '착장 이미지 3',
  ];
  return (
    <SectionBox>
      <SectionHeader>
        <Bullet />
        <SectionTitle>제품 이미지</SectionTitle>
      </SectionHeader>
      <VerticalLine />
      <ImageRow>
        {imageLabels.map((label, index) => (
          <ImageColumn key={index}>
            <label htmlFor={`image-upload-${index}`}>
              <ImageBox>
                {images[index] ? (
                  <img
                    src={images[index] as string}
                    alt='Uploaded'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <IconTextWrapper>
                    <PlusIcon>+</PlusIcon>
                    <ImageAddText>이미지 추가</ImageAddText>
                  </IconTextWrapper>
                )}
              </ImageBox>
            </label>
            <HiddenFileInput
              id={`image-upload-${index}`}
              type='file'
              accept='image/*'
              onChange={(e) => handleImageUpload(index, e)}
            />
            <ImageLabel>{label}</ImageLabel>
          </ImageColumn>
        ))}
      </ImageRow>
    </SectionBox>
  );
};

export default ProductImageSection;

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

const ImageRow = styled.div`
  display: flex;
  gap: 20px;
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 140px;
  height: 200px;
  border: 1px solid #ddd;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlusIcon = styled.div`
  width: 24px;
  height: 24px;
  font-size: 20px;
  color: #ddd;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

const ImageAddText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  color: #dddddd;
  margin-top: 5px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImageLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-top: 20px;
  text-align: center;
`;
