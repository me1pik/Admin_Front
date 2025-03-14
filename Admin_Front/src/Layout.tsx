import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import List from './components/List';

const Layout: React.FC = () => {
  return (
    <Container>
      <SidebarContainer>
        <List />
      </SidebarContainer>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const SidebarContainer = styled.div`
  width: 70px;
  margin: 80px 0; /* 위아래 80px 간격 적용 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  background-color: #2c2c2c;
`;

const ContentContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
`;
