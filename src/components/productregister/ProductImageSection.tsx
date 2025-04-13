// src/components/productregister/ProductImageSection.tsx
import React from 'react';
import styled from 'styled-components';

interface ProductImageSectionProps {
  images?: (string | null)[];
  imageLinks?: (string | null)[];
  handleImageUpload: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleImageAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: (index: number) => void;
  handleImageLinkChange: (index: number, value: string) => void;
  handleImageReorder: (dragIndex: number, hoverIndex: number) => void;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  // 부모에서 전달한 값 사용, 없으면 10개 슬롯 생성
  images = new Array(10).fill(null),
  imageLinks = new Array(10).fill(''),
  handleImageUpload,
  handleImageAdd,
  handleImageDelete,
  handleImageLinkChange,
  handleImageReorder,
}) => {
  // 이미지 레이블: 첫 번째는 '썸네일 이미지', 나머지는 "이미지 1 ~ 이미지 9"
  const imageLabels = new Array(10)
    .fill('')
    .map((_, index) => (index === 0 ? '썸네일 이미지' : `이미지 ${index}`));

  // 드래그 관련 이벤트 핸들러
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, hoverIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (!isNaN(dragIndex) && dragIndex !== hoverIndex) {
      handleImageReorder(dragIndex, hoverIndex);
    }
  };

  // 각 슬롯 내에서 이미지가 없으면 오른쪽 하단에 "+" 버튼을 노출하여 해당 슬롯의 파일 입력을 트리거
  const onSlotAddClick = (index: number) => {
    const fileInput = document.getElementById(
      `image-upload-${index}`
    ) as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <SectionBox>
      <SectionHeader>
        <Bullet />
        <SectionTitle>제품 이미지</SectionTitle>
      </SectionHeader>
      <VerticalLine />
      <ImageGrid>
        {imageLabels.map((label, index) => (
          <ImageColumn key={index}>
            <ImageWrapper
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
            >
              {index === 0 ? (
                <ThumbnailImageBox>
                  {images[index] ? (
                    <>
                      <UploadedImage
                        src={images[index] as string}
                        alt='Uploaded'
                      />
                      <DeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageDelete(index);
                        }}
                        title='이미지 삭제'
                      >
                        x
                      </DeleteButton>
                    </>
                  ) : (
                    <>
                      <EmptyBox />
                      <SlotAddButton
                        onClick={() => onSlotAddClick(index)}
                        title='이미지 추가'
                      >
                        +
                      </SlotAddButton>
                    </>
                  )}
                </ThumbnailImageBox>
              ) : (
                <ImageBox>
                  {images[index] ? (
                    <>
                      <UploadedImage
                        src={images[index] as string}
                        alt='Uploaded'
                      />
                      <DeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageDelete(index);
                        }}
                        title='이미지 삭제'
                      >
                        x
                      </DeleteButton>
                    </>
                  ) : (
                    <>
                      <EmptyBox />
                      <SlotAddButton
                        onClick={() => onSlotAddClick(index)}
                        title='이미지 추가'
                      >
                        +
                      </SlotAddButton>
                    </>
                  )}
                </ImageBox>
              )}
              {/* 각 슬롯 전용 숨김 파일 입력 */}
              <HiddenFileInput
                id={`image-upload-${index}`}
                type='file'
                accept='image/*'
                onChange={(e) => handleImageUpload(index, e)}
              />
            </ImageWrapper>
            <ImageLabel>{label}</ImageLabel>
            <ImageLinkInput
              type='text'
              placeholder='이미지 링크를 입력하세요'
              value={imageLinks[index] || ''}
              onChange={(e) => handleImageLinkChange(index, e.target.value)}
            />
          </ImageColumn>
        ))}
      </ImageGrid>
    </SectionBox>
  );
};

export default ProductImageSection;

/* ================= Styled Components ================= */

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
  border: 1px solid #ddd;
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
  background: #ddd;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20px;
    height: 1px;
    background: #ddd;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 20px;
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: move;
`;

const ImageBox = styled.div`
  width: 140px;
  height: 200px;
  border: 1px solid #ddd;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

// ThumbnailImageBox: 썸네일 슬롯 구분을 위해 배경색 및 테두리 강조
const ThumbnailImageBox = styled(ImageBox)`
  background-color: #e0f7fa;
  border: 2px solid #00acc1;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
`;

const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #fff;
  border: 1px solid #ccc;
  font-size: 14px;
  font-weight: bold;
  padding: 2px 6px;
  cursor: pointer;
  border-radius: 4px;
  z-index: 2;
  &:hover {
    opacity: 0.8;
  }
`;

// SlotAddButton: 각 슬롯 오른쪽 하단에 추가 버튼
const SlotAddButton = styled.button`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: #fff;
  border: 1px solid #ccc;
  font-size: 18px;
  font-weight: bold;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
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

const ImageLinkInput = styled.input`
  margin-top: 8px;
  width: 140px;
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
