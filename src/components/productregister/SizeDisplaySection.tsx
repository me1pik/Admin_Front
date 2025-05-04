// src/components/productregister/SizeDisplaySection.tsx
import React, { useState, ChangeEvent, useMemo } from 'react';
import styled from 'styled-components';
import { ProductDetailResponse } from '../../api/adminProduct';

interface SizeDisplaySectionProps {
  product?: ProductDetailResponse;
  sizeProductImg: string;
}

// 카테고리별 실측 이미지 URL + 라벨 매핑 (생략 없이)
const sizeGuideConfig: Record<
  string,
  { image: string; labels: Record<string, string> }
> = {
  Entire: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  Top: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  Tshirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/25db6b65a4c2eccbe1ea546026389427.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Blouse: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  KnitTop: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/25db6b65a4c2eccbe1ea546026389427.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  ShirtTop: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/6aa5cfc1fcf058242047931081e6bd5c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
    },
  },
  MiniSkirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/4a3564bd7e1095a189083bb62916349a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.밑단둘레',
      D: 'D.총길이',
    },
  },
  MidiSkirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/4a3564bd7e1095a189083bb62916349a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.밑단둘레',
      D: 'D.총길이',
    },
  },
  LongSkirt: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/4a3564bd7e1095a189083bb62916349a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.밑단둘레',
      D: 'D.총길이',
    },
  },
  Pants: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/59c6a4e2fb13d263e2799ab338f8674a.png',
    labels: {
      A: 'A.허리둘레',
      B: 'B.엉덩이둘레',
      C: 'C.허벅지둘레',
      D: 'D.밑위길이',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  MiniDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  MidiDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  LongDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  TowDress: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/358a254fc60602c20991d47964a23311.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.엉덩이둘레',
      F: 'F.총길이',
    },
  },
  JumpSuit: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/5ded97cf03063ebe34316355b36a419c.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.총길이',
    },
  },
  Best: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/356a561aa2641c9a99a5fa22196a60fb.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Cardigan: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/88bf095e82d97c3fa1fbc85dea6fb58b.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Jacket: {
    image:
      'https://www.daehyuninside.com/_skin/daehyun_250205/img/etc/OUTER3.jpg',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.암홀',
      F: 'F.총길이',
      G: 'G.밑단둘레',
    },
  },
  Padding: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/88bf095e82d97c3fa1fbc85dea6fb58b.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.소매길이',
      D: 'D.암홀',
      E: 'E.총길이',
      F: 'F.밑단둘레',
    },
  },
  Coat: {
    image:
      'https://daehyuninside.wisacdn.com/_data/product/sizeimg/c514aa235c2c74a8f6c9a4d6ee59e58e.png',
    labels: {
      A: 'A.어깨넓이',
      B: 'B.가슴둘레',
      C: 'C.허리둘레',
      D: 'D.소매길이',
      E: 'E.암홀',
      F: 'F.총길이',
      G: 'G.밑단둘레',
    },
  },
};

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
