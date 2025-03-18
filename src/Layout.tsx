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
  flex-direction: row;
  width: 100%;
`;

const SidebarContainer = styled.div`
  width: 70px;
  height: 100%;

  padding: 80px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #ffffff;

  padding: 90px 36px;
`;
