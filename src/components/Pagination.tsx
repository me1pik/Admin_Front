// src/components/Pagination.tsx
import React from 'react';
import styled from 'styled-components';

// 활성화 아이콘
import FirstPageIcon from '../assets/PageNationIcon1.svg';
import PrevPageIcon from '../assets/PageNationIcon2.svg';
import NextPageIcon from '../assets/PageNationIcon3.svg';
import LastPageIcon from '../assets/PageNationIcon4.svg';

// 비활성화 아이콘
import FirstPageIconDisabled from '../assets/PageNationIcon1none.svg';
import PrevPageIconDisabled from '../assets/PageNationIcon2none.svg';
import NextPageIconDisabled from '../assets/PageNationIcon3none.svg';
import LastPageIconDisabled from '../assets/PageNationIcon4none.svg';

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

  // 현재 페이지 보정 (1보다 작거나 totalPages보다 큰 경우)
  let currentPage = page;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > correctedTotalPages) currentPage = correctedTotalPages;

  // 2자리 형식(예: 01, 02...)으로 표시
  const currentPageStr = String(currentPage).padStart(2, '0');
  const totalPagesStr = String(correctedTotalPages).padStart(2, '0');

  return (
    <PaginationContainer>
      {/* 첫 페이지 이동 */}
      <PageArrow
        disabled={currentPage === 1}
        onClick={() => setPage(1)}
        aria-label='첫 페이지 이동'
      >
        <Icon
          src={currentPage === 1 ? FirstPageIconDisabled : FirstPageIcon}
          alt='첫 페이지'
        />
      </PageArrow>
      {/* 이전 페이지 이동 */}
      <PageArrow
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        aria-label='이전 페이지 이동'
      >
        <Icon
          src={currentPage === 1 ? PrevPageIconDisabled : PrevPageIcon}
          alt='이전 페이지'
        />
      </PageArrow>

      {/* 중앙 페이지 정보 */}
      <PageInfo>
        <CurrentPage>{currentPageStr}</CurrentPage>
        <Slash>/</Slash>
        <TotalPage>{totalPagesStr}</TotalPage>
      </PageInfo>

      {/* 다음 페이지 이동 */}
      <PageArrow
        disabled={currentPage === correctedTotalPages}
        onClick={() => setPage(currentPage + 1)}
        aria-label='다음 페이지 이동'
      >
        <Icon
          src={
            currentPage === correctedTotalPages
              ? NextPageIconDisabled
              : NextPageIcon
          }
          alt='다음 페이지'
        />
      </PageArrow>
      {/* 마지막 페이지 이동 */}
      <PageArrow
        disabled={currentPage === correctedTotalPages}
        onClick={() => setPage(correctedTotalPages)}
        aria-label='마지막 페이지 이동'
      >
        <Icon
          src={
            currentPage === correctedTotalPages
              ? LastPageIconDisabled
              : LastPageIcon
          }
          alt='마지막 페이지'
        />
      </PageArrow>
    </PaginationContainer>
  );
};

export default Pagination;

/* ====================== Styled Components ====================== */

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 27px;
`;

interface PageArrowProps {
  disabled: boolean;
}

const PageArrow = styled.button<PageArrowProps>`
  border: none;
  background: transparent;
  padding: 0;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CurrentPage = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: #000000;
`;

const Slash = styled.span`
  margin: 0 4px;
  font-size: 12px;
  font-weight: 400;
  color: #000000;
`;

const TotalPage = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #000000;
`;
