// src/components/Header.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ReusableModal2 from './OneButtonModal';

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // 로그아웃 버튼 클릭 시 모달 열기
  const handleLogoutClick = () => {
    setModalOpen(true);
  };

  // 모달 닫기 (아니요 버튼 클릭 시)
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // 모달의 "네" 버튼 클릭 시 로그아웃 처리 후 /login 페이지로 이동
  const handleConfirmLogout = () => {
    // 로그아웃 로직 추가 (예: API 호출, 상태 초기화 등)
    alert('로그아웃 되었습니다.');
    setModalOpen(false);
    navigate('/login');
  };

  return (
    <>
      <HeaderContainer>
        <GreetingContainer>
          <UnderlinedName>홍길동</UnderlinedName>
          <GreetingText> 님! 안녕하세요.</GreetingText>
        </GreetingContainer>
        <LogoutButton onClick={handleLogoutClick}>로그아웃</LogoutButton>
      </HeaderContainer>

      <ReusableModal2
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmLogout}
        title='로그아웃 확인'
      >
        정말 로그아웃 하시겠습니까?
      </ReusableModal2>
    </>
  );
};

export default Header;

/* ====================== Styled Components ====================== */

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 80px; /* 헤더 높이 */
  margin-right: 60px;
  width: 100vw;

  background-color: #ffffff;
`;

const GreetingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const UnderlinedName = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 14px;
  color: #000000;
  text-decoration: underline;
  text-underline-offset: 5px;
`;

const GreetingText = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #aaaaaa;
`;

const LogoutButton = styled.button`
  width: 92px;
  height: 34px;
  background: #ffffff;
  border: 1px solid #dddddd;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 14px;
  color: #000000;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`;
