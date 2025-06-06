import React from 'react';
import styled from 'styled-components';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Title>대시보드</Title>
      <CardContainer>
        <Card>
          <CardTitle>사용자 수</CardTitle>
          <CardValue>--</CardValue>
        </Card>
        <Card>
          <CardTitle>총 매출</CardTitle>
          <CardValue>--</CardValue>
        </Card>
        <Card>
          <CardTitle>신규 주문</CardTitle>
          <CardValue>--</CardValue>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default Dashboard;

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

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Card = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const CardValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
