// src/components/DetailTopBoxes.tsx
import React from 'react';
import styled from 'styled-components';
import DetailBoxSvg1 from '../assets/DetailTopBoxesSvg1.svg';
import DetailBoxSvg2 from '../assets/DetailTopBoxesSvg2.svg';
import DetailBoxSvg3 from '../assets/DetailTopBoxesSvg3.svg';
import { ProductDetailResponse } from '../api/adminProduct';

const colorOptions = [
  '화이트',
  '블랙',
  '그레이',
  '네이비',
  '아이보리',
  '베이지',
  '브라운',
  '카키',
  '그린',
  '블루',
  '퍼플',
  '버건디',
  '레드',
  '핑크',
  '옐로우',
  '오렌지',
];

const categoryOptions = [
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
  { label: '팬츠', value: 'Pants' },
  { label: '자켓', value: 'Jacket' },
  { label: '코트', value: 'Coat' },
];

const statusOptions = [
  { label: '등록대기', value: 0 },
  { label: '등록완료', value: 1 },
  { label: '판매종료', value: 2 },
];

interface DetailTopBoxesProps {
  product: ProductDetailResponse;
  editable?: boolean;
  onChange?: (
    data: Partial<ProductDetailResponse> & { rental?: number }
  ) => void;
}

const DetailTopBoxes: React.FC<DetailTopBoxesProps> = ({
  product,
  editable = false,
  onChange,
}) => {
  const defaultSizes = ['44', '55', '66', '77', 'Free'];
  const rentalValue = product.rental ?? '';

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
      // SizeRow 타입에 맞게 measurements 필드를 펼쳐서 직접 지정
      newSizes.push({
        size: sz,
        어깨: 0,
        가슴: 0,
        총장: 0,
      } as any);
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
                  placeholder='입력하세요'
                  value={product.brand}
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
                  placeholder='입력하세요'
                  value={product.product_num}
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
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Value>
                  {
                    statusOptions.find(
                      (opt) => opt.value === product.registration
                    )?.label
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
                  onChange={(e) => onChange?.({ category: e.target.value })}
                >
                  <option value='' disabled hidden>
                    옵션을 선택하세요
                  </option>
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Value>
                  {categoryOptions.find((opt) => opt.value === product.category)
                    ?.label || product.category}
                </Value>
              )}
            </Row>
            <Row>
              <Label>사이즈</Label>
              <SizeRow>
                {defaultSizes.map((sz) => {
                  const active = product.sizes?.some((item) =>
                    sz === 'Free'
                      ? item.size.toLowerCase().includes('free')
                      : item.size.replace(/[^0-9]/g, '') === sz
                  );
                  return editable ? (
                    <SizeBoxEditable
                      key={sz}
                      $active={active}
                      onClick={() => handleToggleSize(sz)}
                    >
                      {sz}
                    </SizeBoxEditable>
                  ) : (
                    <SizeBox key={sz} $active={active}>
                      {sz}
                    </SizeBox>
                  );
                })}
              </SizeRow>
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
                  {colorOptions.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </Select>
              ) : (
                <Value>{product.color}</Value>
              )}
            </Row>
          </InfoCol>
        </Box>

        <Divider />

        {/* 박스3: 가격 */}
        <Box>
          <IconWrapper>
            <Icon src={DetailBoxSvg3} />
          </IconWrapper>
          <InfoCol>
            <Row>
              <Label>리테일</Label>
              {editable ? (
                <Input
                  type='number'
                  placeholder='입력하세요'
                  value={product.price.originalPrice}
                  onChange={(e) =>
                    onChange?.({
                      price: {
                        ...product.price,
                        originalPrice: Number(e.target.value),
                      },
                    })
                  }
                />
              ) : (
                <Value>{product.price.originalPrice.toLocaleString()}</Value>
              )}
            </Row>
            <Row>
              <Label>판매</Label>
              {editable ? (
                <Input
                  type='number'
                  placeholder='입력하세요'
                  value={product.price.finalPrice}
                  onChange={(e) =>
                    onChange?.({
                      price: {
                        ...product.price,
                        finalPrice: Number(e.target.value),
                      },
                    })
                  }
                />
              ) : (
                <Value>{product.price.finalPrice.toLocaleString()}</Value>
              )}
            </Row>
            <Row>
              <Label>대여</Label>
              {editable ? (
                <Input
                  type='number'
                  placeholder='입력하세요'
                  value={rentalValue}
                  onChange={(e) =>
                    onChange?.({ rental: Number(e.target.value) })
                  }
                />
              ) : (
                <Value>
                  {rentalValue !== ''
                    ? Number(rentalValue).toLocaleString()
                    : '-'}
                </Value>
              )}
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
const SizeRow = styled.div`
  display: flex;
  gap: 8px;
`;
const SizeBox = styled.div<{ $active?: boolean }>`
  padding: 2px 6px;
  font-size: 10px;
  border-radius: 4px;
  background: ${({ $active }) => ($active ? '#f0c040' : '#fff')};
  border: ${({ $active }) =>
    $active ? '2px solid #f0a020' : '1px solid #aaa'};
`;
const SizeBoxEditable = styled(SizeBox)`
  cursor: pointer;
  &:hover {
    border-color: #f0a020;
  }
`;
