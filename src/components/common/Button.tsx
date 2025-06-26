import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const getButtonStyles = (variant: ButtonProps['variant'] = 'primary') => {
  switch (variant) {
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.white};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondary}dd;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 2px solid ${theme.colors.primary};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${theme.colors.text.primary};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.background.secondary};
        }
      `;
    case 'danger':
      return css`
        color: ${theme.colors.white};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.error}dd;
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.primary};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary}dd;
        }
      `;
  }
};

const getSizeStyles = (size: ButtonProps['size'] = 'md') => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.typography.fontSize.sm};
        min-height: 32px;
      `;
    case 'lg':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.xl};
        font-size: ${theme.typography.fontSize.lg};
        min-height: 48px;
      `;
    default:
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: ${theme.typography.fontSize.md};
        min-height: 40px;
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  font-family: ${theme.typography.fontFamily.primary};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  text-decoration: none;
  position: relative;
  overflow: hidden;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  ${({ variant }) => getButtonStyles(variant)}
  ${({ size }) => getSizeStyles(size)}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  /* 로딩 상태 */
  ${({ loading }) =>
    loading &&
    css`
      color: transparent;
      pointer-events: none;

      &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    `}

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      loading={loading}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

// 기존 Button01, Button02와의 호환성을 위한 별칭
export const Button01 = Button;
export const Button02 = Button;
