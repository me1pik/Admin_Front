// src/components/Pagination.tsx
import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  // totalPages가 0 이하일 경우 최소 1로 보정
  const correctedTotalPages = totalPages < 1 ? 1 : totalPages;

  // 보정된 totalPages만큼 페이지 배열 생성
  const pages = Array.from({ length: correctedTotalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer>
      <PageArrow disabled={page === 1} onClick={() => setPage(1)}>
        «
      </PageArrow>
      <PageArrow disabled={page === 1} onClick={() => setPage(page - 1)}>
        ‹
      </PageArrow>
      {pages.map((num) => (
        <PageButton
          key={num}
          active={num === page}
          onClick={() => setPage(num)}
        >
          {/* 2자리 형식으로 표시하고 싶다면 padStart 사용 (예: 01, 02 등) */}
          {String(num).padStart(2, '0')}
        </PageButton>
      ))}
      <PageArrow
        disabled={page === correctedTotalPages}
        onClick={() => setPage(page + 1)}
      >
        ›
      </PageArrow>
      <PageArrow
        disabled={page === correctedTotalPages}
        onClick={() => setPage(correctedTotalPages)}
      >
        »
      </PageArrow>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

interface PageButtonProps {
  active: boolean;
}

const PageButton = styled.button<PageButtonProps>`
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#000000' : '#ffffff')};
  color: ${({ active }) => (active ? '#ffffff' : '#333333')};
  border: 1px solid #d3d3d3;

  &:hover {
    background-color: ${({ active }) => (active ? '#000000' : '#d3d3d3')};
  }
`;

interface PageArrowProps {
  disabled: boolean;
}

const PageArrow = styled.button<PageArrowProps>`
  padding: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: transparent;
  color: ${({ disabled }) => (disabled ? '#d3d3d3' : '#333333')};
  border: none;
  font-size: 30px;

  &:hover {
    color: ${({ disabled }) => (disabled ? '#d3d3d3' : '#000000')};
  }
`;
