// src/components/productregister/ProductImageSection.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaLink } from 'react-icons/fa';

import BulletIcon from '../../assets/BulletIcon.svg'; // SVG 아이콘 import

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
  const [isCopied, setIsCopied] = useState(false);

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

  const handleCopyClick = () => {
    if (!productUrl) return;
    navigator.clipboard
      .writeText(productUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // 2초 후 버튼 색상 원복
      })
      .catch((err) => {
        console.error('복사 실패:', err);
      });
  };

  return (
    <SectionBox>
      <Header>
        <HeaderLeft>
          <BulletIconImage src={BulletIcon} alt='bullet icon' />
          <Title>제품 이미지</Title>
        </HeaderLeft>
        <BatchButton onClick={onBatchUrl} title='URL 일괄 삽입'>
          <FaLink size={18} />
          <span>URL 일괄 삽입</span>
        </BatchButton>
      </Header>

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
        <HeaderLeft>
          <BulletIconImage src={BulletIcon} alt='bullet icon' />
          <Title>제품(원본) URL 정보</Title>
        </HeaderLeft>

        {productUrl ? (
          <UrlLinkWrapper>
            <StyledLink
              href={productUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {productUrl}
            </StyledLink>
            <CopyButton onClick={handleCopyClick} isCopied={isCopied}>
              {isCopied ? '복사됨' : '복사'}
            </CopyButton>
          </UrlLinkWrapper>
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
  margin-bottom: 240px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

/**
 * HeaderLeft: 블릿 아이콘과 타이틀을 가로로 정렬
 */
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

// BulletIconImage: SVG 아이콘을 렌더링하기 위한 styled.img
const BulletIconImage = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 8px; /* 타이틀과의 간격 */
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 14px;
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
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const UrlText = styled.div`
  font-size: 14px;
  word-break: break-all;
  color: #000;
`;

/**
 * UrlLinkWrapper: URL 박스 전체를 감싸는 flex 컨테이너
 * - 높이 30px
 * - border: 1px solid #ddd
 * - 내부에 URL 텍스트와 복사 버튼을 나란히 배치
 */
const UrlLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  padding: 10px;
  margin-top: 20px;
`;

/**
 * StyledLink: URL 텍스트 부분
 * - flex: 1 (버튼을 제외한 나머지 영역 차지)
 * - 폰트 크기 12px, 컬러 #000
 * - 텍스트가 길면 ellipsis 처리
 * - 좌우 패딩을 넣어 가독성 확보 (10px씩)
 */
const StyledLink = styled.a`
  flex: 1;
  font-size: 12px;
  color: #000;
  text-decoration: none;
  padding: 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: #1565c0;
  }
`;

/**
 * CopyButton: 복사 버튼
 * - 너비 70px, 높이 30px
 * - 배경색: 버튼 상태(isCopied)에 따라 변경
 *   isCopied = true -> 회색(#555)
 *   isCopied = false -> 검정(#000)
 * - 글자 색: 흰색
 * - border-radius: 0
 * - cursor: pointer
 */
const CopyButton = styled.button<{ isCopied: boolean }>`
  width: 70px;
  height: 30px;
  background: ${({ isCopied }) => (isCopied ? '#555' : '#000')};
  color: #fff;
  border: none;
  border-radius: 0;
  font-size: 12px;
  cursor: pointer;
  flex-shrink: 0; /* 버튼 크기 고정 */
`;
