import React from 'react';
import styled from 'styled-components';
import DetailBoxSvg1 from '../assets/DetailTopBoxesSvg1.svg';
import DetailBoxSvg2 from '../assets/DetailTopBoxesSvg2.svg';
import DetailBoxSvg3 from '../assets/DetailTopBoxesSvg3.svg';
import { ProductDetailResponse } from '../api/adminProduct';

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
  const rentalValue = (product as any).rental ?? 0;

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
      newSizes.push({ size: sz, measurements: { 어깨: 0, 가슴: 0, 총장: 0 } });
    }
    onChange({ sizes: newSizes });
  };

  return (
    <Container>
      <BoxWrapper>
        {/* 박스1: 브랜드 / 품번 / 시즌 */}
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
                  onChange={(e) => onChange?.({ product_num: e.target.value })}
                />
              ) : (
                <Value>{product.product_num}</Value>
              )}
            </Row>
            <Row>
              <Label>시즌</Label>
              {editable ? (
                <Input
                  value={product.season}
                  onChange={(e) => onChange?.({ season: e.target.value })}
                />
              ) : (
                <Value>{product.season}</Value>
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
                <Input
                  value={product.category}
                  onChange={(e) => onChange?.({ category: e.target.value })}
                />
              ) : (
                <Value>{product.category}</Value>
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
                <Input
                  value={product.color}
                  onChange={(e) => onChange?.({ color: e.target.value })}
                />
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
                  value={rentalValue}
                  onChange={(e) =>
                    onChange?.({ rental: Number(e.target.value) })
                  }
                />
              ) : (
                <Value>{rentalValue.toLocaleString()}</Value>
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
  min-width: 1100px;
`;
const BoxWrapper = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Box = styled.div`
  flex: 1;
  display: flex;
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
  padding: 2px 4px;
  border: 1px solid #ccc;
  border-radius: 2px;
`;
const Divider = styled.div`
  width: 1px;
  background: #ddd;
  margin: 10px;
`;
const SizeRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
`;
const SizeBox = styled.div<{ $active?: boolean }>`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  background: ${(p) => (p.$active ? '#f0c040' : '#fff')};
  border: ${(p) => (p.$active ? '2px solid #f0a020' : '1px solid #aaa')};
`;
const SizeBoxEditable = styled(SizeBox)`
  cursor: pointer;
  &:hover {
    border-color: #f0a020;
  }
`;
