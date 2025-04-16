import React from 'react';
import styled from 'styled-components';
import DetailBoxSvg1 from '../assets/DetailTopBoxesSvg1.svg';
import DetailBoxSvg2 from '../assets/DetailTopBoxesSvg2.svg';
import DetailBoxSvg3 from '../assets/DetailTopBoxesSvg3.svg';
import { ProductDetailResponse } from '../api/adminProduct';

interface DetailTopBoxesProps {
  product: ProductDetailResponse;
  editable?: boolean;
  onChange?: (data: Partial<ProductDetailResponse>) => void;
}

const DetailTopBoxes: React.FC<DetailTopBoxesProps> = ({
  product,
  editable = false,
  onChange,
}) => {
  // 사용하지 않는 핸들러는 주석 처리했습니다.
  // const handleSizeChange = (idx: number, value: string) => {
  //   if (product.sizes && onChange) {
  //     const numericValue = value.replace(/[^0-9]/g, '');
  //     const newSizes = product.sizes.map((item, index) =>
  //       index === idx ? { ...item, size: numericValue } : item
  //     );
  //     onChange({ sizes: newSizes });
  //   }
  // };

  // 기본으로 출력할 사이즈 배열
  const defaultSizes = ['44', '55', '66', '77', 'Free'];

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
              {editable ? (
                <Input
                  type='text'
                  value={product.brand}
                  onChange={(e) =>
                    onChange && onChange({ brand: e.target.value })
                  }
                />
              ) : (
                <Value>{product.brand}</Value>
              )}
            </Row>
            <Row>
              <Label>품번</Label>
              {editable ? (
                <Input
                  type='text'
                  value={product.product_num}
                  onChange={(e) =>
                    onChange && onChange({ product_num: e.target.value })
                  }
                />
              ) : (
                <Value>{product.product_num}</Value>
              )}
            </Row>
            <Row>
              <Label>시즌</Label>
              {editable ? (
                <Input
                  type='text'
                  value={product.season}
                  onChange={(e) =>
                    onChange && onChange({ season: e.target.value })
                  }
                />
              ) : (
                <ValueBox>{product.season}</ValueBox>
              )}
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
              {editable ? (
                <Input
                  type='text'
                  value={product.category}
                  onChange={(e) =>
                    onChange && onChange({ category: e.target.value })
                  }
                />
              ) : (
                <Value>{product.category}</Value>
              )}
            </Row>
            <Row>
              <Label>사이즈</Label>
              <SizeBoxRow>
                {defaultSizes.map((defaultSize, i) => {
                  // 제품의 sizes 배열에 해당 사이즈가 존재하는지 확인
                  const active =
                    product.sizes &&
                    product.sizes.some((item) => {
                      if (defaultSize === 'Free') {
                        // FREE 사이즈인 경우 item.size에 "free" 문자열이 포함되어 있는지 검사합니다.
                        return item.size.toLowerCase().includes('free');
                      }
                      return item.size.replace(/[^0-9]/g, '') === defaultSize;
                    });
                  return (
                    <React.Fragment key={i}>
                      {editable ? (
                        <EditableSizeBox
                          active={active}
                          onClick={() => {
                            if (onChange) {
                              let newSizes = product.sizes
                                ? [...product.sizes]
                                : [];
                              if (active) {
                                // 이미 존재하는 경우 제거 (FREE인 경우, "free" 포함 여부로 필터링)
                                newSizes = newSizes.filter((item) => {
                                  if (defaultSize === 'Free') {
                                    return !item.size
                                      .toLowerCase()
                                      .includes('free');
                                  }
                                  return (
                                    item.size.replace(/[^0-9]/g, '') !==
                                    defaultSize
                                  );
                                });
                              } else {
                                // 존재하지 않으면 추가 (FREE 사이즈일 경우 size값은 'Free'로 고정)
                                newSizes.push({
                                  size: defaultSize,
                                  measurements: { 어깨: 0, 가슴: 0, 총장: 0 },
                                });
                              }
                              onChange({ sizes: newSizes });
                            }
                          }}
                        >
                          {defaultSize}
                        </EditableSizeBox>
                      ) : (
                        <SizeBox active={active}>{defaultSize}</SizeBox>
                      )}
                    </React.Fragment>
                  );
                })}
              </SizeBoxRow>
            </Row>
            <Row>
              <Label>색상</Label>
              {editable ? (
                <Input
                  type='text'
                  value={product.color}
                  onChange={(e) =>
                    onChange && onChange({ color: e.target.value })
                  }
                />
              ) : (
                <ValueBox>{product.color}</ValueBox>
              )}
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
              {editable ? (
                <Input
                  type='number'
                  value={product.price.originalPrice}
                  onChange={(e) =>
                    onChange &&
                    onChange({
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
                    onChange &&
                    onChange({
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

/* Styled Components */
const Input = styled.input`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-size: 12px;
  padding: 2px 4px;
  border: 1px solid #cccccc;
  border-radius: 2px;
`;

const Container = styled.div`
  min-width: 1100px;
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

const SizeBoxRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
`;

const SizeBox = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 24px;
  background: ${(props) => (props.active ? '#f0c040' : '#fff')};
  border: ${(props) =>
    props.active ? '2px solid #f0a020' : '1px solid #aaaaaa'};
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: ${(props) => (props.active ? 900 : 400)};
  font-size: 10px;
  color: #000;
  border-radius: 4px;
  cursor: pointer;
  padding: 0 6px;
`;

const EditableSizeBox = styled(SizeBox)`
  &:hover {
    border-color: #f0a020;
  }
`;
