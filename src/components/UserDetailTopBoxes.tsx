import React from 'react';
import styled from 'styled-components';
import userDetailImg1 from '../assets/userDetailImg1.svg';
import userDetailImg2 from '../assets/userDetailImg2.svg';
import userDetailImg3 from '../assets/userDetailImg3.svg';
import userDetailImg4 from '../assets/userDetailImg4.svg';

const UserDetailTopBoxes: React.FC = () => {
  return (
    <Container>
      <BoxWrapper>
        {/* 첫 번째 박스 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={userDetailImg1} alt='User Detail 1' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Value>
                <BoldValue>홍길동 (mivin)</BoldValue>
              </Value>
            </Row>
            <Row>
              <Value>good2@krea.com</Value>
            </Row>
            <Row>
              <Value>
                <BoldValue>일반</BoldValue> (등급) : 2021.11.15
              </Value>
            </Row>
          </Content>
        </Box>

        <Divider />

        {/* 두 번째 박스 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={userDetailImg2} alt='User Detail 2' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Value>
                <BoldValue>1990년</BoldValue> (34세)
              </Value>
            </Row>
            <Row>
              <Value>
                <BoldValue>010-1234-5678</BoldValue>
              </Value>
            </Row>
          </Content>
        </Box>

        <Divider />

        {/* 세 번째 박스 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={userDetailImg3} alt='User Detail 3' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Value>
                <BoldValue>styleweex_xx1</BoldValue> (브랜드)
              </Value>
            </Row>
            <Row>
              <Value>
                팔로워 <BoldValue>5,480</BoldValue> / 팔로잉{' '}
                <BoldValue>397</BoldValue>
              </Value>
            </Row>
          </Content>
        </Box>

        <Divider />

        {/* 네 번째 박스 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={userDetailImg4} alt='User Detail 4' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Value>
                <BoldValue>서울 / 금천구 </BoldValue>(서비스 지역)
              </Value>
            </Row>
            <Row>
              <Value>
                멜픽 - <BoldValue>me1pik.com/styleweex</BoldValue>
              </Value>
            </Row>
          </Content>
        </Box>
      </BoxWrapper>
    </Container>
  );
};

export default UserDetailTopBoxes;

/* ======================= Styled Components ======================= */

/** 전체 컨테이너 */
const Container = styled.div`
  min-width: 1100px;
`;

/** 박스와 Divider를 포함하는 그룹 */
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

/** 아이콘 영역: DetailTopBoxes와 동일한 구조 */
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
  width: 72px;
  height: 72px;
  object-fit: contain;

  border-radius: 50%;
`;

/** 텍스트 영역 */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/** 한 줄 */
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

/** 기본 텍스트 값 - 내부에서 한 줄 처리 */
const Value = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/** Bold 텍스트 값 (font-weight: 800 적용) */
const BoldValue = styled.span`
  font-weight: 800;
  font-size: 12px;
  color: #000;
`;
