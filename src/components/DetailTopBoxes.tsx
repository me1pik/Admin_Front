// src/components/DetailTopBoxes.tsx
import React from 'react';
import styled from 'styled-components';
import DetailBoxSvg1 from '../assets/DetailTopBoxesSvg1.svg';
import DetailBoxSvg2 from '../assets/DetailTopBoxesSvg2.svg';
import DetailBoxSvg3 from '../assets/DetailTopBoxesSvg3.svg';
import { ProductDetailResponse } from '../api/adminProduct';

interface DetailTopBoxesProps {
  product: ProductDetailResponse;
}

const DetailTopBoxes: React.FC<DetailTopBoxesProps> = ({ product }) => {
  return (
    <Container>
      <BoxWrapper>
        {/* 첫 번째 박스: 브랜드, 품번, 시즌 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={DetailBoxSvg1} alt='브랜드 아이콘' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Label>브랜드</Label>
              <Value>{product.brand}</Value>
            </Row>
            <Row>
              <Label>품번</Label>
              <Value>{product.product_num}</Value>
            </Row>
            <Row>
              <Label>시즌</Label>
              <ValueBox>{product.season}</ValueBox>
            </Row>
          </Content>
        </Box>

        <Divider />

        {/* 두 번째 박스: 종류, 사이즈, 색상 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={DetailBoxSvg2} alt='종류 아이콘' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Label>종류</Label>
              <Value>{product.category}</Value>
            </Row>
            <Row>
              <Label>사이즈</Label>
              <ValueBoxGroup>
                {product.sizes && product.sizes.length > 0 ? (
                  product.sizes.map((item, idx) => {
                    // 숫자만 남기기: 정규표현식으로 숫자 추출
                    const numericSize = item.size.replace(/[^0-9]/g, '');
                    return (
                      <ValueBoxItem key={idx}>
                        {numericSize || '-'}
                      </ValueBoxItem>
                    );
                  })
                ) : (
                  <Value>No size info</Value>
                )}
              </ValueBoxGroup>
            </Row>
            <Row>
              <Label>색상</Label>
              <ValueBox>{product.color}</ValueBox>
            </Row>
          </Content>
        </Box>

        <Divider />

        {/* 세 번째 박스: 가격 정보 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={DetailBoxSvg3} alt='가격 아이콘' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Label>리테일</Label>
              <Value>{product.price.originalPrice.toLocaleString()}</Value>
            </Row>
            <Row>
              <Label>판매</Label>
              <Value>{product.price.finalPrice.toLocaleString()}</Value>
            </Row>
            <Row>
              <Label>대여</Label>
              <Value>
                {(
                  product.price.originalPrice - product.price.finalPrice
                ).toLocaleString()}
              </Value>
            </Row>
          </Content>
        </Box>
      </BoxWrapper>
    </Container>
  );
};

export default DetailTopBoxes;

const Container = styled.div`
  min-width: 1000px;
`;

const BoxWrapper = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Divider = styled.div`
  width: 1px;
  background-color: #dddddd;
  align-self: stretch;
  margin: 10px;
`;

const IconPlaceholder = styled.div`
  width: 72px;
  height: 72px;
  border: 1px solid #dddddd;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Label = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 12px;
  color: #000;
  min-width: 40px;
`;

const Value = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #000;
`;

const ValueBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  height: 20px;
  background: #fff;
  border: 1px solid #aaaaaa;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 10px;
  line-height: 11px;
  text-align: center;
  color: #000;
`;

const ValueBoxGroup = styled.div`
  display: flex;
  gap: 5px;
`;

const ValueBoxItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 20px;
  background: #fff;
  border: 1px solid #aaaaaa;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 10px;
  line-height: 11px;
  text-align: center;
  color: #000;
`;
