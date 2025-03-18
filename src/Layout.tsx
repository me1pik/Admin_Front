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
  height: 100vh; /* 전체 화면 높이를 사용하여 레이아웃 안정화 */
`;

const SidebarContainer = styled.div`
  width: 70px;
  margin: 80px 0; /* 상하 마진 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
`;

const ContentContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow-x: hidden; /* 가로 스크롤 숨김 */
  overflow-y: auto; /* 세로 스크롤 자동 */
  background-color: #ffffff;
  margin: 60px 36px; /* 적절한 여백 설정 */
`;
