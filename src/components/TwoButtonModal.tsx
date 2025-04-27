// src/components/ReusableModal.tsx
import React from 'react';
import styled from 'styled-components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
};

const ReusableModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  width = '400px',
  height = '200px',
}) => {
  if (!isOpen) return null;

  const handleYes = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <Overlay>
      <ModalBox style={{ width, height }}>
        {title && (
          <Header>
            <Title>{title}</Title>
          </Header>
        )}
        <Body>{children}</Body>
        <Footer>
          <NoButton onClick={onClose}>아니요</NoButton>
          <YesButton onClick={handleYes}>네</YesButton>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};

export default ReusableModal;

// --- Styled Components ---

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

const Body = styled.div`
  flex: 1;
  padding: 20px;
  font-size: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.div`
  display: flex;
  border-top: 1px solid #e0e0e0;
`;

const NoButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background: #cccccc;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    background: #b3b3b3;
  }
`;

const YesButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    background: #333;
  }
`;
