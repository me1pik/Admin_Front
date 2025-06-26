import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export interface TableProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
}

export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableRowProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export interface TableCellProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
  className?: string;
}

const StyledTable = styled.table<TableProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border-collapse: collapse;
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  background-color: ${theme.colors.background.primary};
  box-shadow: ${theme.shadows.sm};
`;

const StyledThead = styled.thead`
  background-color: ${theme.colors.background.secondary};
`;

const StyledTbody = styled.tbody<{ striped?: boolean; hoverable?: boolean }>`
  ${({ striped }) =>
    striped &&
    css`
      tr:nth-child(even) {
        background-color: ${theme.colors.background.secondary};
      }
    `}

  ${({ hoverable }) =>
    hoverable &&
    css`
      tr:hover {
        background-color: ${theme.colors.background.tertiary};
      }
    `}
`;

const StyledTh = styled.th<TableCellProps>`
  padding: ${theme.spacing.md};
  text-align: ${({ align = 'left' }) => align};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  border-bottom: 2px solid ${theme.colors.border.medium};
  width: ${({ width }) => width || 'auto'};
  white-space: nowrap;
  vertical-align: middle;
`;

const StyledTd = styled.td<TableCellProps>`
  padding: ${theme.spacing.md};
  text-align: ${({ align = 'left' }) => align};
  color: ${theme.colors.text.primary};
  border-bottom: 1px solid ${theme.colors.border.light};
  width: ${({ width }) => width || 'auto'};
  vertical-align: middle;
`;

const StyledTr = styled.tr<TableRowProps>`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  background-color: ${({ selected }) =>
    selected ? `${theme.colors.primary}10` : 'transparent'};
  transition: background-color ${theme.transitions.fast};

  &:hover {
    background-color: ${({ onClick, selected }) =>
      onClick
        ? selected
          ? `${theme.colors.primary}20`
          : theme.colors.background.tertiary
        : 'transparent'};
  }
`;

export const Table: React.FC<TableProps> = ({
  children,
  fullWidth = true,
  className,
}) => {
  return (
    <StyledTable fullWidth={fullWidth} className={className}>
      {children}
    </StyledTable>
  );
};

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className,
}) => {
  return <StyledThead className={className}>{children}</StyledThead>;
};

export const TableBody: React.FC<{
  children: React.ReactNode;
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
}> = ({ children, striped = false, hoverable = false, className }) => {
  return (
    <StyledTbody striped={striped} hoverable={hoverable} className={className}>
      {children}
    </StyledTbody>
  );
};

export const TableRow: React.FC<TableRowProps> = ({
  children,
  onClick,
  selected = false,
  className,
}) => {
  return (
    <StyledTr onClick={onClick} selected={selected} className={className}>
      {children}
    </StyledTr>
  );
};

export const TableHeaderCell: React.FC<TableCellProps> = ({
  children,
  align = 'left',
  width,
  className,
}) => {
  return (
    <StyledTh align={align} width={width} className={className}>
      {children}
    </StyledTh>
  );
};

export const TableCell: React.FC<TableCellProps> = ({
  children,
  align = 'left',
  width,
  className,
}) => {
  return (
    <StyledTd align={align} width={width} className={className}>
      {children}
    </StyledTd>
  );
};

// 상태별 배경색 반환 함수
export const getStatusColor = (status: string) => {
  switch (status) {
    case '등록완료':
    case '완료':
    case '승인':
      return theme.colors.success;
    case '등록대기':
    case '대기':
    case '진행중':
      return theme.colors.secondary;
    case '계약종료':
    case '취소':
    case '거부':
      return theme.colors.warning;
    case '오류':
    case '실패':
      return theme.colors.error;
    default:
      return theme.colors.gray[600];
  }
};

// 상태별 색상 반환 (배경/글자색)
export function getStatusStyle(status: string): {
  background: string;
  color: string;
} {
  return (
    theme.colors.status[status as keyof typeof theme.colors.status] ||
    theme.colors.status['기본']
  );
}

// 공통 스타일
export const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background-color: ${({ status }) => getStatusColor(status)};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  text-align: center;
  min-width: 60px;
`;
