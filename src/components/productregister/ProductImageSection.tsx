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
  // 부모에서 API 이미지 삭제까지 진행하도록 구현되어야 합니다.
  handleImageDelete: (index: number) => void;
  handleImageLinkChange: (index: number, value: string) => void;
  // handleImageReorder는 부모에서 두 배열(이미지와 링크)을 동시에 재정렬하도록 구현되어야 합니다.
  handleImageReorder: (dragIndex: number, hoverIndex: number) => void;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  images = new Array(10).fill(null),
  imageLinks = new Array(10).fill(''),
  handleImageUpload,
  handleImageDelete,
  handleImageLinkChange,
  handleImageReorder,
}) => {
  const imageLabels = new Array(10)
    .fill('')
    .map((_, index) => (index === 0 ? '썸네일 이미지' : `이미지 ${index}`));

  // 드래그 앤 드롭 핸들러
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    // text/plain 타입으로 인덱스를 저장합니다.
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, hoverIndex: number) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const dragIndex = parseInt(data, 10);
    if (!isNaN(dragIndex) && dragIndex !== hoverIndex) {
      handleImageReorder(dragIndex, hoverIndex);
    }
  };

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
            <DraggableWrapper
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
            >
              {/* 인덱스 번호 표시 */}
              <IndexLabel>{index + 1}</IndexLabel>
              {images[index] ? (
                <>
                  {index === 0 ? (
                    <ThumbnailImageBox>
                      <UploadedImage
                        src={images[index] as string}
                        alt='Uploaded'
                      />
                      <DeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          // 삭제 버튼 클릭 시, 부모의 handleImageDelete를 호출하여 해당 박스 전체 삭제
                          handleImageDelete(index);
                        }}
                        title='이미지 삭제'
                      >
                        x
                      </DeleteButton>
                    </ThumbnailImageBox>
                  ) : (
                    <ImageBox>
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
                        +
                      </SlotAddButton>
                    </ThumbnailImageBox>
                  ) : (
                    <ImageBox>
                      <EmptyBox />
                      <SlotAddButton
                        onClick={() => onSlotAddClick(index)}
                        title='이미지 추가'
                      >
                        +
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
  border: 1px solid #ccc;
  font-size: 14px;
  font-weight: bold;
  padding: 2px 6px;
  cursor: pointer;
  border-radius: 4px;
  z-index: 4;
  &:hover {
    opacity: 0.8;
  }
`;

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
  z-index: 4;
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
