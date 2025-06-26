import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import { Button } from './Button';

export interface InputProps {
  label?: string;
  id?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  prefix?: string;
  prefixcontent?: string;
  buttonLabel?: string;
  buttonColor?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  onButtonClick?: () => void;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  as?: 'input' | 'textarea' | 'select';
  options?: string[];
  isEmailField?: boolean;
}

const getSizeStyles = (size: InputProps['size'] = 'md') => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.typography.fontSize.sm};
        min-height: 32px;
      `;
    case 'lg':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.lg};
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

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label<{ $isEmpty: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  display: ${({ $isEmpty }) => ($isEmpty ? 'none' : 'block')};
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const PrefixText = styled.span`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text.secondary};
  white-space: nowrap;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  border: 1px solid
    ${({ hasError }) =>
      hasError ? theme.colors.error : theme.colors.border.medium};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary};
  transition: all ${theme.transitions.fast};
  outline: none;

  ${({ size }) => getSizeStyles(size)}

  &::placeholder {
    color: ${theme.colors.text.muted};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &:disabled {
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.disabled};
    cursor: not-allowed;
  }

  &:read-only {
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.secondary};
  }
`;

const StyledTextarea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  border: 1px solid
    ${({ hasError }) =>
      hasError ? theme.colors.error : theme.colors.border.medium};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary};
  transition: all ${theme.transitions.fast};
  outline: none;
  resize: vertical;
  min-height: 100px;

  ${({ size }) => getSizeStyles(size)}

  &::placeholder {
    color: ${theme.colors.text.muted};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &:disabled {
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.disabled};
    cursor: not-allowed;
  }

  &:read-only {
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.secondary};
  }
`;

const StyledSelect = styled.select<{ hasError?: boolean }>`
  width: 100%;
  border: 1px solid
    ${({ hasError }) =>
      hasError ? theme.colors.error : theme.colors.border.medium};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary};
  transition: all ${theme.transitions.fast};
  outline: none;
  cursor: pointer;

  ${({ size }) => getSizeStyles(size)}

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &:disabled {
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: ${theme.spacing.sm};
`;

const AtSymbol = styled.span`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text.secondary};
  margin: 0 ${theme.spacing.sm};
`;

const EmailDropdown = styled.select`
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.md};
  min-height: 40px;
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &:disabled {
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.xs};
  min-height: ${theme.typography.fontSize.sm};
`;

const GrayText = styled.span`
  color: ${theme.colors.text.muted};
`;

const GraySpan = styled.span`
  color: ${theme.colors.text.muted};
`;

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  InputProps
>(
  (
    {
      label,
      id,
      type = 'text',
      placeholder,
      value,
      defaultValue,
      error,
      disabled = false,
      required = false,
      readOnly = false,
      fullWidth = false,
      size = 'md',
      prefix,
      prefixcontent,
      buttonLabel,
      buttonColor = 'primary',
      onButtonClick,
      onChange,
      onBlur,
      onFocus,
      className,
      as = 'input',
      options = [],
      isEmailField = false,
      ...props
    },
    ref
  ) => {
    const renderPrefixContent = () => {
      if (!prefixcontent) return null;

      const tokens = prefixcontent.split(/(해당없음|\(.*?\)|\|)/g);
      let applyGray = false;

      return tokens.map((token: string, i: number) => {
        if (token === '|') {
          applyGray = true;
          return <GraySpan key={i}>{token}</GraySpan>;
        }
        if (applyGray) {
          return <GraySpan key={i}>{token}</GraySpan>;
        }
        if (
          (token.startsWith('(') && token.endsWith(')')) ||
          token === '해당없음'
        ) {
          return <GraySpan key={i}>{token}</GraySpan>;
        }
        return token;
      });
    };

    const renderLabel = () => {
      if (!label) return null;

      const parts = label.split('(');
      return (
        <>
          {parts[0]}
          {parts.length > 1 && <GrayText>{`(${parts[1]}`}</GrayText>}
        </>
      );
    };

    return (
      <InputContainer fullWidth={fullWidth} className={className}>
        <Label htmlFor={id} $isEmpty={!label}>
          {renderLabel()}
        </Label>

        <div>
          <InputRow>
            {prefix && <PrefixText>{prefix}</PrefixText>}
            <InputWrapper>
              {prefixcontent && renderPrefixContent()}

              {as === 'select' ? (
                <StyledSelect
                  id={id}
                  value={value}
                  defaultValue={defaultValue}
                  disabled={disabled}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  hasError={!!error}
                  size={size}
                  {...props}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </StyledSelect>
              ) : as === 'textarea' ? (
                <StyledTextarea
                  id={id}
                  ref={ref as React.Ref<HTMLTextAreaElement>}
                  value={value}
                  defaultValue={defaultValue}
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={readOnly}
                  required={required}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  hasError={!!error}
                  size={size}
                  {...props}
                />
              ) : (
                <StyledInput
                  id={id}
                  ref={ref as React.Ref<HTMLInputElement>}
                  type={type}
                  value={value}
                  defaultValue={defaultValue}
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={readOnly}
                  required={required}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  hasError={!!error}
                  size={size}
                  {...props}
                />
              )}

              {buttonLabel && (
                <ButtonWrapper>
                  <Button
                    variant={buttonColor}
                    onClick={onButtonClick}
                    size={size}
                  >
                    {buttonLabel}
                  </Button>
                </ButtonWrapper>
              )}
            </InputWrapper>

            {isEmailField && <AtSymbol>@</AtSymbol>}
            {isEmailField && (
              <InputWrapper>
                <EmailDropdown
                  id={`${id}-domain`}
                  defaultValue='naver.com'
                  disabled={readOnly}
                >
                  <option value='gmail.com'>gmail.com</option>
                  <option value='naver.com'>naver.com</option>
                  <option value='daum.net'>daum.net</option>
                </EmailDropdown>
              </InputWrapper>
            )}
          </InputRow>

          <ErrorMessage>{error}</ErrorMessage>
        </div>
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

// 기존 InputField와의 호환성을 위한 별칭
export const InputField = Input;
