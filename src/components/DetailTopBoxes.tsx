import React from 'react';
import styled from 'styled-components';
import DetailBoxSvg1 from '../assets/DetailTopBoxesSvg1.svg';
import DetailBoxSvg2 from '../assets/DetailTopBoxesSvg2.svg';
import DetailBoxSvg3 from '../assets/DetailTopBoxesSvg3.svg';

const DetailTopBoxes: React.FC = () => {
  // 현재 유효한 사이즈 (예시: "44", "55", "66"만 유효)
  const availableSizes = ['44', '55', '66'];
  // 고정 사이즈 텍스트 배열
  const fixedSizes = ['44', '55', '66', '77', 'Free'];

  return (
    <Container>
      <BoxWrapper>
        {/* 첫 번째 박스 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={DetailBoxSvg1} alt='브랜드 아이콘' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Label>브랜드</Label>
              <Value>MICHAA</Value>
            </Row>
            <Row>
              <Label>품번</Label>
              <Value>MIOCWOP011</Value>
            </Row>
            <Row>
              <Label>시즌</Label>
              <ValueBox>2024 S/S</ValueBox>
            </Row>
          </Content>
        </Box>

        <Divider />

        {/* 두 번째 박스 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={DetailBoxSvg2} alt='종류 아이콘' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Label>종류</Label>
              <Value>원피스</Value>
            </Row>
            <Row>
              <Label>사이즈</Label>
              <ValueBoxGroup>
                {fixedSizes.map((size, idx) => {
                  const isAvailable = availableSizes.includes(size);
                  return (
                    <ValueBoxItem key={idx} empty={!isAvailable}>
                      {size}
                    </ValueBoxItem>
                  );
                })}
              </ValueBoxGroup>
            </Row>
            <Row>
              <Label>색상</Label>
              <ValueBox>CREAM</ValueBox>
            </Row>
          </Content>
        </Box>

        <Divider />

        {/* 세 번째 박스 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={DetailBoxSvg3} alt='가격 아이콘' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Label>리테일</Label>
              <Value>1,390,000</Value>
            </Row>
            <Row>
              <Label>판매</Label>
              <Value>1,250,000</Value>
            </Row>
            <Row>
              <Label>대여</Label>
              <Value>100,000</Value>
            </Row>
          </Content>
        </Box>
      </BoxWrapper>
    </Container>
  );
};

export default DetailTopBoxes;

/* ======================= Styled Components ======================= */

/** 전체 컨테이너 */
const Container = styled.div`
  min-width: 1000px;
`;

/** 박스와 divider를 포함하는 그룹 */
const BoxWrapper = styled.div`
  display: flex;

  align-items: stretch;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

/** 각 박스 */
const Box = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px;
`;

/** Divider (수직 구분선) */
const Divider = styled.div`
  width: 1px;
  background-color: #dddddd;
  align-self: stretch;
  margin: 10px;
`;

/** 아이콘 영역: 원형 영역 내부에 이미지가 삽입됨 */
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

/** 삽입될 SVG 이미지 */
const IconImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

/** 텍스트 영역 */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/** 한 줄 (라벨 + 값) */
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

/** 라벨 */
const Label = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 12px;
  color: #000;
  min-width: 40px;
`;

/** 일반 텍스트 값 */
const Value = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #000;
`;

/** 작은 박스 형태 (단일 값 적용) */
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

/** 사이즈 박스들을 가로로 나열하는 컨테이너 */
const ValueBoxGroup = styled.div`
  display: flex;
  gap: 5px;
`;

/** 개별 사이즈 박스 */
const ValueBoxItem = styled.div<{ empty?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 20px;
  background: #fff;
  border: 1px solid ${(props) => (props.empty ? '#ddd' : '#aaaaaa')};
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 10px;
  line-height: 11px;
  text-align: center;
  color: ${(props) => (props.empty ? '#ddd' : '#000')};
`;
