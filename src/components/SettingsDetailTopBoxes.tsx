import React from 'react';
import styled from 'styled-components';

import userDetailImg2 from '../assets/userDetailImg2.svg';
// import userDetailImg3 from '../assets/userDetailImg3.svg';

const SettingsDetailTopBoxes: React.FC = () => {
  return (
    <Container>
      <BoxWrapper>
        {/* 첫 번째 박스 */}
        <Box>
          <IconPlaceholder>
            <IconImage src={userDetailImg2} alt='User Detail 2' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Value>
                <BoldValue>홍길동</BoldValue> (webmanager)
              </Value>
            </Row>
            <Row>
              <Value>
                <BoldValue>등록일</BoldValue> 2025.04.01
              </Value>
            </Row>
            <Row>
              <Value>
                <BoldValue>관리등급 1</BoldValue> (등급)
              </Value>
            </Row>
          </Content>
        </Box>
      </BoxWrapper>
    </Container>
  );
};

export default SettingsDetailTopBoxes;

/* ======================= Styled Components ======================= */

/** 전체 컨테이너 */
const Container = styled.div`
  min-width: 1000px;
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

/** 아이콘 영역 */
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

/** 기본 텍스트 값 */
const Value = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/** Bold 텍스트 값 */
const BoldValue = styled.span`
  font-weight: 800;
  font-size: 12px;
  color: #000;
`;
