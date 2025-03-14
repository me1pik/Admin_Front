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

const ReusableModal2: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  width = '100%',
  height = '360px',
}) => {
  if (!isOpen) return null;

  const handleConfirmClick = () => {
    if (onConfirm) onConfirm();
    onClose(); // ✅ 네 버튼 클릭 시 모달 닫기
  };

  return (
    <StyledModal>
      <ModalContent width={width} height={height}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        <CloseButtonWrapper>
          <NoButton onClick={onClose}>아니요</NoButton>
          {onConfirm && <YesButton onClick={handleConfirmClick}>네</YesButton>}
        </CloseButtonWrapper>
      </ModalContent>
    </StyledModal>
  );
};

export default ReusableModal2;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 27px;
  z-index: 9999;
`;

const ModalContent = styled.div<{ width: string; height: string }>`
  background-color: #ffffff;
  padding: 20px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 600px;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const ModalBody = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  /* max-height: 230px; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #e0e0e0;
  border-bottom: 2px solid #e0e0e0;
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
`;

const NoButton = styled.button`
  flex: 1;
  height: 50px;
  background: #cccccc;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

const YesButton = styled.button`
  flex: 1;
  height: 50px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;
