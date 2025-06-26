import React from 'react';
import styled from 'styled-components';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  actions?: React.ReactNode;
  variant?: 'oneButton' | 'twoButton';
  confirmText?: string;
  cancelText?: string;
  className?: string;
}

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 27px;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
`;

const ModalContent = styled.div<{ width: string; height: string }>`
  background-color: #ffffff;
  padding: 20px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 300px;
  margin: 0 auto 20px;
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
  max-height: 70%;
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border-top: 2px solid #e0e0e0;
  border-bottom: 2px solid #e0e0e0;
`;

const CloseButtonWrapper = styled.div<{ variant: 'oneButton' | 'twoButton' }>`
  display: flex;
  justify-content: ${({ variant }) =>
    variant === 'oneButton' ? 'center' : 'space-between'};
  gap: ${({ variant }) => (variant === 'twoButton' ? '10px' : '0')};
  margin-top: 10px;
`;

const CloseButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
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

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  width = '100%',
  height = '360px',
  actions,
  variant = 'oneButton',
  confirmText = '확인',
  cancelText = '아니요',
  className,
}) => {
  if (!isOpen) return null;

  const handleConfirmClick = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <StyledModal className={className}>
      <ModalContent width={width} height={height}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {actions && <ModalActions>{actions}</ModalActions>}
        <CloseButtonWrapper variant={variant}>
          {variant === 'twoButton' ? (
            <>
              <NoButton onClick={onClose}>{cancelText}</NoButton>
              {onConfirm && (
                <YesButton onClick={handleConfirmClick}>
                  {confirmText}
                </YesButton>
              )}
            </>
          ) : (
            <CloseButton onClick={onClose}>{confirmText}</CloseButton>
          )}
        </CloseButtonWrapper>
      </ModalContent>
    </StyledModal>
  );
};

// 기존 모달들과의 호환성을 위한 별칭
export const ReusableModal = Modal;
export const ReusableModal2 = Modal;
export const OneButtonModal = (props: Omit<ModalProps, 'variant'>) => (
  <Modal {...props} variant='oneButton' />
);
export const TwoButtonModal = (props: Omit<ModalProps, 'variant'>) => (
  <Modal {...props} variant='twoButton' />
);
