// src/components/productregister/ProductImageSection.tsx
import React, { ChangeEvent, useRef } from 'react';
import styled from 'styled-components';
import { FaTimes, FaPlus, FaUpload } from 'react-icons/fa';

interface ProductImageSectionProps {
  images?: (string | null)[];
  handleImageUpload: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleImageDelete: (index: number) => void;
  handleImageReorder: (dragIndex: number, hoverIndex: number) => void;
  handleMultipleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageDrop: (index: number, file: File) => void;
  productUrl: string;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  images = new Array(10).fill(null),
  handleImageUpload,
  handleImageDelete,
  handleImageReorder,
  handleMultipleImageUpload,
  handleImageDrop,
  productUrl,
}) => {
  const batchInputRef = useRef<HTMLInputElement>(null);

  const imageLabels = new Array(10)
    .fill('')
    .map((_, index) => (index === 0 ? '썸네일 이미지' : `이미지 ${index}`));

  // 드래그 시작 (reorder 용)
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  // 슬롯 위 드래그 중엔 항상 허용
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // 드롭: 파일이면 업로드, 아니면 reorder
  const onDrop = (e: React.DragEvent<HTMLDivElement>, hoverIndex: number) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleImageDrop(hoverIndex, file);
    } else {
      const data = e.dataTransfer.getData('text/plain');
      const dragIndex = parseInt(data, 10);
      if (!isNaN(dragIndex) && dragIndex !== hoverIndex) {
        handleImageReorder(dragIndex, hoverIndex);
      }
    }
  };

  // 슬롯 내부 버튼 클릭 시 파일 선택창 열기
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
        <BatchButton
          onClick={() => batchInputRef.current?.click()}
          title='일괄 이미지 업로드'
        >
          <FaUpload size={18} />
          <span>일괄 업로드</span>
        </BatchButton>
        <BatchFileInput
          ref={batchInputRef}
          type='file'
          accept='image/*'
          multiple
          onChange={handleMultipleImageUpload}
        />
      </SectionHeader>
      <VerticalLine />
      <ImageGrid>
        {imageLabels.map((label, index) => (
          <ImageColumn key={index}>
            <DraggableWrapper
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
            >
              <IndexLabel>{index + 1}</IndexLabel>
              {images[index] ? (
                <>
                  {index === 0 ? (
                    <ThumbnailImageBox>
                      <UploadedImage src={images[index]!} alt='Uploaded' />
                      <DeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageDelete(index);
                        }}
                        title='이미지 삭제'
                      >
                        <FaTimes size={16} />
                      </DeleteButton>
                    </ThumbnailImageBox>
                  ) : (
                    <ImageBox>
                      <UploadedImage src={images[index]!} alt='Uploaded' />
                      <DeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageDelete(index);
                        }}
                        title='이미지 삭제'
                      >
                        <FaTimes size={16} />
                      </DeleteButton>
                    </ImageBox>
                  )}
                </>
              ) : (
                <>
                  {index === 0 ? (
                    <ThumbnailImageBox>
                      <EmptyBox />
                      <SlotAddButton
                        onClick={() => onSlotAddClick(index)}
                        title='이미지 추가'
                      >
                        <FaPlus size={14} />
                      </SlotAddButton>
                    </ThumbnailImageBox>
                  ) : (
                    <ImageBox>
                      <EmptyBox />
                      <SlotAddButton
                        onClick={() => onSlotAddClick(index)}
                        title='이미지 추가'
                      >
                        <FaPlus size={14} />
                      </SlotAddButton>
                    </ImageBox>
                  )}
                </>
              )}
              <HiddenFileInput
                id={`image-upload-${index}`}
                type='file'
                accept='image/*'
                onChange={(e) => handleImageUpload(index, e)}
              />
            </DraggableWrapper>
            <ImageLabel>{label}</ImageLabel>
          </ImageColumn>
        ))}
      </ImageGrid>

      <ProductUrlContainer>
        <ProductUrlLabel>제품 URL</ProductUrlLabel>
        {productUrl ? (
          <ProductUrlLink
            href={productUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            {productUrl}
          </ProductUrlLink>
        ) : (
          <ProductUrlText>등록된 URL이 없습니다.</ProductUrlText>
        )}
      </ProductUrlContainer>
    </SectionBox>
  );
};

export default ProductImageSection;

// --- Styled Components (생략 없이 동일) ---

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
const BatchButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  gap: 4px;
  color: #1e88e5;
  &:hover {
    color: #1565c0;
  }
`;
const BatchFileInput = styled.input`
  display: none;
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
    left: 4px;
    top: 4px;
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
const DraggableWrapper = styled.div`
  position: relative;
  cursor: move;
`;
const IndexLabel = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 4px;
  font-size: 10px;
  z-index: 3;
  border-radius: 2px;
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
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s,
    background-color 0.2s;
  &:hover {
    transform: scale(1.1);
    background-color: #fce4ec;
  }
`;
const SlotAddButton = styled.button`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: #fff;
  border: none;
  padding: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s,
    background-color 0.2s;
  &:hover {
    transform: scale(1.1);
    background-color: #e3f2fd;
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
const ProductUrlContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const ProductUrlLabel = styled.label`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #000;
`;
const ProductUrlText = styled.div`
  font-size: 14px;
  color: #000;
  word-break: break-all;
  margin-top: 4px;
`;
const ProductUrlLink = styled.a`
  font-size: 14px;
  color: #1e88e5;
  text-decoration: underline;
  word-break: break-all;
  margin-top: 4px;
  &:hover {
    color: #1565c0;
  }
`;
