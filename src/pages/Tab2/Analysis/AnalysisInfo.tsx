import React from 'react';
import styled from 'styled-components';

const AnalysisInfo: React.FC = () => {
  return (
    <Container>
      <Title>분석 정보</Title>
      <Section>
        <SectionTitle>트래픽 분석</SectionTitle>
        <Placeholder>차트 영역 (예: 방문자 수 그래프)</Placeholder>
      </Section>
      <Section>
        <SectionTitle>판매 추이</SectionTitle>
        <Placeholder>차트 영역 (예: 주간 매출 그래프)</Placeholder>
      </Section>
    </Container>
  );
};

export default AnalysisInfo;

/* Styled Components */
const Container = styled.div`
  padding: 20px;

  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Section = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Placeholder = styled.div`
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`;
