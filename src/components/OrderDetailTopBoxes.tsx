// src/components/OrderDetailTopBoxes.tsx
import React from 'react';
import styled from 'styled-components';
import userDetailImg2 from '../assets/userDetailImg2.svg';
import storeDetailImg from '../assets/storeDetailImg.svg';

const OrderDetailTopBoxes: React.FC = () => {
  return (
    <Container>
      <BoxWrapper>
        {/* 1. 회원정보 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={userDetailImg2} alt='User' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Label>홍길동</Label> <Value>(mivin)</Value>
            </Row>
            <Row>
              <Value>goodxx21@naver.com</Value>
            </Row>
            <Row>
              <Label>이용자</Label> <Value>(일반)</Value>
            </Row>
          </Content>
        </Box>

        <Divider />

        {/* 2. 주문정보 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={storeDetailImg} alt='Store Detail' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Label>신청일</Label>
              <Value>2025-04-07 (10:03:25)</Value>
            </Row>
            <Row>
              <Label>주문번호</Label>
              <Value>2906646342SYTIKI</Value>
            </Row>
            <Row>
              <Label>취소일</Label>
              <Value>-</Value>
            </Row>
          </Content>
        </Box>

        <Divider />

        {/* 3. 추가정보 */}
        <Box>
          <Content>
            <Row>
              <Label>포인트 사용</Label>
              <Value>미사용</Value>
            </Row>

            <Row>
              <Label>추가비용</Label>
              <Value>없음</Value>
            </Row>
          </Content>
        </Box>
      </BoxWrapper>
    </Container>
  );
};

export default OrderDetailTopBoxes;

/* ======================= Styled Components ======================= */

const Container = styled.div`
  width: 100%;
  min-width: 1000px;
`;

const BoxWrapper = styled.div`
  display: flex;
  border: 1px solid #dddddd;
  border-radius: 4px;
  overflow: hidden;
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 12px 20px;
`;

const Divider = styled.div`
  width: 1px;
  background-color: #dddddd;
`;

const IconPlaceholder = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #fafafa;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 50%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-weight: 800;
  font-size: 12px;
  color: #000;
  white-space: nowrap;
`;

const Value = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #000;
`;
