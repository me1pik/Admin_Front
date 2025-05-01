import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaLink } from 'react-icons/fa';

interface ProductImageSectionProps {
  images: string[];
  handleImageLinkUpload: (index: number, url: string) => void;
  handleImageDelete: (index: number) => void;
  handleImageReorder: (from: number, to: number) => void;
  productUrl: string;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  images,
  handleImageLinkUpload,
  handleImageDelete,
  handleImageReorder,
  productUrl,
}) => {
  const onAddUrl = (idx: number) => {
    const url = window.prompt(
      '이미지 URL을 입력해주세요\n예: https://…jpg#addimg'
    );
    if (url?.trim()) handleImageLinkUpload(idx, url.trim());
  };

  const onBatchUrl = () => {
    const input = window.prompt(
      '여러 이미지 URL을 붙여넣으세요.\n쉼표(,) 또는 공백·줄바꿈으로 구분'
    );
    if (!input) return;
    const urls = input
      .split(/[\s,]+/)
      .map((u) => u.trim())
      .filter((u) =>
        /^https?:\/\/\S+\.(?:jpe?g|png|gif)(?:\?\S*)?(?:#\S*)?$/i.test(u)
      );
    if (!urls.length) {
      alert('유효한 이미지 URL이 없습니다.');
      return;
    }
    const startIdx = images.length;
    urls.forEach((url, i) => handleImageLinkUpload(startIdx + i, url));
  };

  const onDragStart = (e: React.DragEvent, idx: number) => {
    e.dataTransfer.setData('text/plain', String(idx));
    e.dataTransfer.effectAllowed = 'move';
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const onDrop = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData('text/plain'));
    if (!isNaN(from) && from !== idx) handleImageReorder(from, idx);
  };

  return (
    <SectionBox>
      <Header>
        <Bullet />
        <Title>제품 이미지</Title>
        <BatchButton onClick={onBatchUrl} title='URL 일괄 삽입'>
          <FaLink size={18} />
          <span>URL 일괄 삽입</span>
        </BatchButton>
      </Header>
      <Divider />
      <Grid>
        {images.map((src, idx) => (
          <Column key={idx}>
            <DragWrapper
              draggable
              onDragStart={(e) => onDragStart(e, idx)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, idx)}
            >
              <IdxLabel>{idx + 1}</IdxLabel>
              <ImgBox isMain={idx === 0}>
                <Img src={src} alt={`이미지 ${idx + 1}`} />
                <DeleteBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageDelete(idx);
                  }}
                  title='삭제'
                >
                  <FaTimes size={16} />
                </DeleteBtn>
              </ImgBox>
            </DragWrapper>
            <Label>{idx === 0 ? 'Main Image' : `Image ${idx}`}</Label>
          </Column>
        ))}
        <Column>
          <EmptyBox onClick={() => onAddUrl(images.length)}>
            <AddBtn title='새 URL 삽입'>
              <FaLink size={20} />
            </AddBtn>
          </EmptyBox>
          <Label>Add URL</Label>
        </Column>
      </Grid>
      <UrlContainer>
        <UrlLabel>제품 URL</UrlLabel>
        {productUrl ? (
          <UrlLink href={productUrl} target='_blank' rel='noopener noreferrer'>
            {productUrl}
          </UrlLink>
        ) : (
          <UrlText>등록된 URL이 없습니다.</UrlText>
        )}
      </UrlContainer>
    </SectionBox>
  );
};

export default ProductImageSection;

/* styled-components */
const SectionBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 20px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-weight: 800;
  font-size: 14px;
  margin-left: 10px;
`;
const Bullet = styled.div`
  position: absolute;
  left: -27px;
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
const BatchButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #1e88e5;
  &:hover {
    color: #1565c0;
  }
`;
const Divider = styled.div`
  position: absolute;
  left: 0;
  top: 24px;
  bottom: 0;
  width: 1px;
  background: #ddd;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 20px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DragWrapper = styled.div`
  position: relative;
  cursor: move;
`;
const IdxLabel = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 4px;
  font-size: 10px;
  border-radius: 2px;
`;
const ImgBox = styled.div<{ isMain?: boolean }>`
  width: 140px;
  height: 200px;
  border: 2px solid ${({ isMain }) => (isMain ? '#f6ae24' : '#ddd')};
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const DeleteBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #fff;
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition:
    transform 0.2s,
    background-color 0.2s;
  &:hover {
    transform: scale(1.1);
    background-color: #fce4ec;
  }
`;
const EmptyBox = styled.div`
  width: 140px;
  height: 200px;
  border: 1px dashed #ddd;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const AddBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Label = styled.div`
  margin-top: 20px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
`;
const UrlContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const UrlLabel = styled.label`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
`;
const UrlText = styled.div`
  font-size: 14px;
  word-break: break-all;
  color: #000;
`;
const UrlLink = styled.a`
  font-size: 14px;
  color: #1e88e5;
  text-decoration: underline;
  word-break: break-all;
  &:hover {
    color: #1565c0;
  }
`;
