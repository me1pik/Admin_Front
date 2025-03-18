// src/components/RegisterButton.tsx
import React from 'react';
import styled from 'styled-components';

type RegisterButtonProps = {
  text: string;
  onClick: () => void;
};

const RegisterButton: React.FC<RegisterButtonProps> = ({ text, onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <ButtonBox>
        <ButtonText>{text}</ButtonText>
      </ButtonBox>
    </ButtonContainer>
  );
};

export default RegisterButton;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonBox = styled.div`
  width: 100px;
  height: 40px;
  background: #000000;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  color: #ffffff;
`;
