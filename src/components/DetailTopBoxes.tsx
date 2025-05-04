// src/components/DetailTopBoxes.tsx
import React from 'react';
import styled from 'styled-components';
import DetailBoxSvg1 from '../assets/DetailTopBoxesSvg1.svg';
import DetailBoxSvg2 from '../assets/DetailTopBoxesSvg2.svg';
import DetailBoxSvg3 from '../assets/DetailTopBoxesSvg3.svg';
import { ProductDetailResponse, SizeRow } from '../api/adminProduct';

const colorOptions = [
  { label: '화이트', value: 'WHITE' },
  { label: '블랙', value: 'BLACK' },
  { label: '그레이', value: 'GRAY' },
  { label: '네이비', value: 'NAVY' },
  { label: '아이보리', value: 'IVORY' },
  { label: '베이지', value: 'BEIGE' },
  { label: '브라운', value: 'BROWN' },
  { label: '카키', value: 'KHAKI' },
  { label: '그린', value: 'GREEN' },
  { label: '블루', value: 'BLUE' },
  { label: '퍼플', value: 'PURPLE' },
  { label: '버건디', value: 'BURGUNDY' },
  { label: '레드', value: 'RED' },
  { label: '핑크', value: 'PINK' },
  { label: '옐로우', value: 'YELLOW' },
  { label: '오렌지', value: 'ORANGE' },
  { label: '마젠타', value: 'MAGENTA' },
  { label: '민트', value: 'MINT' },
];

const categoryOptions = [
  { label: '전체', value: 'Entire' },
  { label: '미니원피스', value: 'MiniDress' },
  { label: '미디원피스', value: 'MidiDress' },
  { label: '롱 원피스', value: 'LongDress' },
  { label: '투피스', value: 'TowDress' },
  { label: '점프수트', value: 'JumpSuit' },
  { label: '블라우스', value: 'Blouse' },
  { label: '니트 상의', value: 'KnitTop' },
  { label: '셔츠 상의', value: 'ShirtTop' },
  { label: '미니 스커트', value: 'MiniSkirt' },
  { label: '미디 스커트', value: 'MidiSkirt' },
  { label: '롱 스커트', value: 'LongSkirt' },
  { label: '팬츠', value: 'Pants' },
  { label: '자켓', value: 'Jacket' },
  { label: '코트', value: 'Coat' },
  { label: '탑', value: 'Top' },
  { label: '티셔츠', value: 'Tshirt' },
  { label: '가디건', value: 'Cardigan' },
  { label: '베스트', value: 'Best' },
  { label: '패딩', value: 'Padding' },
];

const statusOptions = [
  { label: '등록대기', value: 0 },
  { label: '등록완료', value: 1 },
  { label: '판매종료', value: 2 },
];

// 각 카테고리별 실측 이미지 URL과 Measurement 라벨 매핑
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

const defaultSizes = ['44', '55', '66', '77', 'Free'];

interface DetailTopBoxesProps {
  product: ProductDetailResponse;
  editable?: boolean;
  onChange?: (
    data: Partial<
      ProductDetailResponse & { sizes: SizeRow[]; size_picture: string }
    >
  ) => void;
}

const DetailTopBoxes: React.FC<DetailTopBoxesProps> = ({
  product,
  editable = false,
  onChange,
}) => {
  // 가격 내림
  const retailValue = Math.floor(product.retailPrice);
  const saleValue =
    product.sale_price != null ? Math.floor(product.sale_price) : retailValue;
  const rentalValue =
    product.rental_price != null ? Math.floor(product.rental_price) : 0;

  // ❶ 카테고리 변경 시 sizes, size_picture 초기화
  const handleCategoryChange = (value: string) => {
    if (!onChange) return;
    const config = sizeGuideConfig[value];
    // measurement 키(A,B,C...) 목록
    const keys = Object.keys(config.labels);
    // defaultSizes 기반으로 SizeRow 배열 생성
    const newSizes: SizeRow[] = defaultSizes.map((sz) => {
      const measurements: Record<string, number> = {};
      keys.forEach((k) => {
        measurements[k] = 0;
      });
      return { size: sz, measurements };
    });
    onChange({
      category: value,
      sizes: newSizes,
      size_picture: config.image,
    });
  };

  // ❷ 기존 토글 로직: measurement 키를 현재 product.size_picture에 맞춘 키로 초기화
  const handleToggleSize = (sz: string) => {
    if (!onChange) return;
    const exists = product.sizes?.some((item) =>
      sz === 'Free'
        ? item.size.toLowerCase().includes('free')
        : item.size.replace(/[^0-9]/g, '') === sz
    );
    let newSizes = product.sizes ? [...product.sizes] : [];
    if (exists) {
      newSizes = newSizes.filter((item) =>
        sz === 'Free'
          ? !item.size.toLowerCase().includes('free')
          : item.size.replace(/[^0-9]/g, '') !== sz
      );
    } else {
      // 현재 설정된 category의 measurement 키
      const labels = sizeGuideConfig[product.category]?.labels ?? {};
      const measurements: Record<string, number> = {};
      Object.keys(labels).forEach((k) => (measurements[k] = 0));
      newSizes.push({ size: sz, measurements });
    }
    onChange({ sizes: newSizes });
  };

  return (
    <Container>
      <BoxWrapper>
        {/* 박스1: 브랜드 / 품번 / 상태 */}
        <Box>
          <IconWrapper>
            <Icon src={DetailBoxSvg1} />
          </IconWrapper>
          <InfoCol>
            <Row>
              <Label>브랜드</Label>
              {editable ? (
                <Input
                  value={product.brand}
                  placeholder='입력하세요'
                  onChange={(e) => onChange?.({ brand: e.target.value })}
                />
              ) : (
                <Value>{product.brand}</Value>
              )}
            </Row>
            <Row>
              <Label>품번</Label>
              {editable ? (
                <Input
                  value={product.product_num}
                  placeholder='입력하세요'
                  onChange={(e) => onChange?.({ product_num: e.target.value })}
                />
              ) : (
                <Value>{product.product_num}</Value>
              )}
            </Row>
            <Row>
              <Label>상태</Label>
              {editable ? (
                <Select
                  value={String(product.registration)}
                  onChange={(e) =>
                    onChange?.({ registration: Number(e.target.value) })
                  }
                >
                  <option value='' disabled hidden>
                    옵션을 선택하세요
                  </option>
                  {statusOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Value>
                  {
                    statusOptions.find((o) => o.value === product.registration)
                      ?.label
                  }
                </Value>
              )}
            </Row>
          </InfoCol>
        </Box>

        <Divider />

        {/* 박스2: 종류 / 사이즈 / 색상 */}
        <Box>
          <IconWrapper>
            <Icon src={DetailBoxSvg2} />
          </IconWrapper>
          <InfoCol>
            <Row>
              <Label>종류</Label>
              {editable ? (
                <Select
                  value={product.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value='' disabled hidden>
                    옵션을 선택하세요
                  </option>
                  {categoryOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Value>
                  {
                    categoryOptions.find((o) => o.value === product.category)
                      ?.label
                  }
                </Value>
              )}
            </Row>

            <Row>
              <Label>사이즈</Label>
              <SizeRowWrapper>
                {defaultSizes.map((sz) => {
                  const active = product.sizes?.some((item) =>
                    sz === 'Free'
                      ? item.size.toLowerCase().includes('free')
                      : item.size.replace(/[^0-9]/g, '') === sz
                  );
                  if (editable) {
                    return (
                      <SizeBoxEditable
                        key={sz}
                        $active={active}
                        onClick={() => handleToggleSize(sz)}
                      >
                        {sz}
                      </SizeBoxEditable>
                    );
                  } else if (active) {
                    return <SizeBox key={sz}>{sz}</SizeBox>;
                  }
                  return null;
                })}
                {!editable && product.sizes?.length === 0 && (
                  <EmptyText>선택된 사이즈 없음</EmptyText>
                )}
              </SizeRowWrapper>
            </Row>

            <Row>
              <Label>색상</Label>
              {editable ? (
                <Select
                  value={product.color}
                  onChange={(e) => onChange?.({ color: e.target.value })}
                >
                  <option value='' disabled hidden>
                    옵션을 선택하세요
                  </option>
                  {colorOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Value>
                  {colorOptions.find((o) => o.value === product.color)?.label}
                </Value>
              )}
            </Row>
          </InfoCol>
        </Box>

        <Divider />

        {/* 박스3: 리테일 / 판매 / 대여 */}
        <Box>
          <IconWrapper>
            <Icon src={DetailBoxSvg3} />
          </IconWrapper>
          <InfoCol>
            <Row>
              <Label>리테일</Label>
              <Input type='number' disabled value={retailValue.toString()} />
            </Row>
            <Row>
              <Label>판매</Label>
              <Input type='number' disabled value={saleValue.toString()} />
            </Row>
            <Row>
              <Label>대여</Label>
              <Input
                type='number'
                disabled
                value={rentalValue > 0 ? rentalValue.toString() : ''}
                placeholder='-'
              />
            </Row>
          </InfoCol>
        </Box>
      </BoxWrapper>
    </Container>
  );
};

export default DetailTopBoxes;

/* Styled Components */
const Container = styled.div`
  min-width: 1000px;
`;
const BoxWrapper = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Box = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px;
`;
const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;
const Icon = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const Label = styled.div`
  width: 50px;
  font-weight: 800;
  font-size: 12px;
`;
const Value = styled.div`
  font-size: 12px;
`;
const Input = styled.input`
  font-size: 12px;
  height: 28px;
  padding: 0 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  line-height: 28px;

  &:disabled {
    background: #f5f5f5;
    color: #777;
    cursor: not-allowed;
  }
`;
const Select = styled.select`
  font-size: 12px;
  height: 30px;
  width: 145px;
  padding: 0 8px;
  line-height: 28px;
  border: 1px solid #000;
  border-radius: 4px;
  background: #fff;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 6 5-6H0z' fill='%23666'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 10px 6px;

  &:focus {
    outline: none;
    border-color: #888;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;
const Divider = styled.div`
  width: 1px;
  background: #ddd;
  margin: 10px;
`;
const SizeRowWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const SizeBox = styled.div`
  padding: 2px 6px;
  font-size: 10px;
  border-radius: 4px;
  background: #f6f6f6;
  border: 1px solid #aaa;
`;
const SizeBoxEditable = styled(SizeBox)<{ $active?: boolean }>`
  cursor: pointer;
  background: ${(p) => (p.$active ? '#f0c040' : '#fff')};
  border: ${(p) => (p.$active ? '2px solid #f0a020' : '1px solid #aaa')};
`;
const EmptyText = styled.div`
  font-size: 12px;
  color: #999;
`;
