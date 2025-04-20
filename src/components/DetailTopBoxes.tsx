// src/components/DetailTopBoxes.tsx
import React from 'react';
import styled from 'styled-components';
import DetailBoxSvg1 from '../assets/DetailTopBoxesSvg1.svg';
import DetailBoxSvg2 from '../assets/DetailTopBoxesSvg2.svg';
import DetailBoxSvg3 from '../assets/DetailTopBoxesSvg3.svg';
import { ProductDetailResponse, SizeRow } from '../api/adminProduct';

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
  { label: '롱원피스', value: 'LongDress' },
  { label: '티셔츠', value: 'TShirt' },
  { label: '블라우스', value: 'Blouse' },
  { label: '셔츠', value: 'Shirt' },
  { label: '후드', value: 'Hood' },
  { label: '니트', value: 'Knit' },
  { label: '가디건', value: 'Cardigan' },
  { label: '맨투맨', value: 'Sweatshirt' },
  { label: '스웨터', value: 'Sweater' },
  { label: '팬츠', value: 'Pants' },
  { label: '데님', value: 'Denim' },
  { label: '스커트', value: 'Skirt' },
  { label: '점프수트', value: 'Jumpsuit' },
  { label: '재킷', value: 'Jacket' },
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
    data: Partial<ProductDetailResponse & { sizes: SizeRow[] }>
  ) => void;
}

const defaultSizes = ['44', '55', '66', '77', 'Free'];
const defaultMeasurementsTemplate = {
  어깨: 0,
  가슴: 0,
  허리: 0,
  팔길이: 0,
  총길이: 0,
};

const DetailTopBoxes: React.FC<DetailTopBoxesProps> = ({
  product,
  editable = false,
  onChange,
}) => {
  // 리테일(원가)
  const retailValue = product.price ?? 0;
  // 할인율
  const discountRateValue = product.discountRate ?? 0;
  // 판매가: 명시된 sale_price가 있으면 그걸, 없으면 할인율 적용한 값을 사용
  const saleValue =
    product.sale_price != null
      ? Math.floor(product.sale_price)
      : Math.floor((retailValue * (100 - discountRateValue)) / 100);
  // 대여가 문자열
  const rentalStr =
    product.rental_price != null
      ? Math.floor(product.rental_price).toString()
      : '';

  // 사이즈 토글 (editable 모드)
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
      newSizes.push({
        size: sz,
        measurements: { ...defaultMeasurementsTemplate },
      });
    }
    onChange({ sizes: newSizes });
  };

  return (
    <Container>
      <BoxWrapper>
        {/* 박스1: 브랜드, 품번, 상태 */}
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

        {/* 박스2: 종류, 사이즈, 색상 */}
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
                  {categoryOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Value>
                  {categoryOptions.find((o) => o.value === product.category)
                    ?.label || product.category}
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
                  {colorOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
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

        {/* 박스3: 리테일, 할인율, 판매, 대여 */}
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
                  value={retailValue.toString()}
                  onChange={(e) =>
                    onChange?.({ price: Number(e.target.value) })
                  }
                />
              ) : (
                <Value>{retailValue.toLocaleString()}원</Value>
              )}
            </Row>
            <Row>
              <Label>할인율</Label>
              {editable ? (
                <Input
                  type='number'
                  placeholder='입력하세요'
                  value={discountRateValue.toString()}
                  onChange={(e) =>
                    onChange?.({ discountRate: Number(e.target.value) })
                  }
                />
              ) : (
                <Value>{discountRateValue}%</Value>
              )}
            </Row>
            <Row>
              <Label>판매</Label>
              {editable ? (
                <SaleInput
                  type='number'
                  placeholder='입력하세요'
                  value={saleValue.toString()}
                  onChange={(e) =>
                    onChange?.({ sale_price: Number(e.target.value) })
                  }
                />
              ) : (
                <Value>{saleValue.toLocaleString()}원</Value>
              )}
            </Row>
            <Row>
              <Label>대여</Label>
              {editable ? (
                <Input
                  type='number'
                  placeholder='입력하세요'
                  value={rentalStr}
                  onChange={(e) =>
                    onChange?.({
                      rental_price: Math.floor(Number(e.target.value)),
                    })
                  }
                />
              ) : (
                <Value>
                  {rentalStr ? Number(rentalStr).toLocaleString() + '원' : '-'}
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
const SaleInput = styled(Input)`
  background: ${(p) => (p.disabled ? '#f0f0f0' : '#fff')};
  color: ${(p) => (p.disabled ? '#999' : '#000')};
  cursor: ${(p) => (p.disabled ? 'default' : 'text')};
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
