import { useState, useCallback } from 'react';

export interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
  });

  const openModal = useCallback(
    (
      title: string,
      message: string,
      onConfirm?: () => void,
      onCancel?: () => void,
      confirmText = '확인',
      cancelText = '취소'
    ) => {
      setModalState({
        isOpen: true,
        title,
        message,
        onConfirm,
        onCancel,
        confirmText,
        cancelText,
      });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openConfirmModal = useCallback(
    (
      title: string,
      message: string,
      onConfirm: () => void,
      confirmText = '확인',
      cancelText = '취소'
    ) => {
      openModal(title, message, onConfirm, closeModal, confirmText, cancelText);
    },
    [openModal, closeModal]
  );

  const openAlertModal = useCallback(
    (title: string, message: string, onConfirm?: () => void) => {
      openModal(title, message, onConfirm || closeModal, undefined, '확인');
    },
    [openModal, closeModal]
  );

  return {
    modalState,
    openModal,
    closeModal,
    openConfirmModal,
    openAlertModal,
  };
};
