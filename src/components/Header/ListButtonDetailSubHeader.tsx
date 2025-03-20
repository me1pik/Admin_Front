// src/components/Header/ListButtonDetailSubHeader.tsx
import React from 'react';
import styled from 'styled-components';

/** 컴포넌트가 받을 프롭스 정의 */
export interface DetailSubHeaderProps {
  /** 왼쪽 버튼 텍스트 (예: "목록으로") */
  backLabel: string;
  /** 왼쪽 버튼 클릭 시 동작 */
  onBackClick?: () => void;

  /** 오른쪽 첫 번째 버튼 텍스트 (예: "정보수정") */
  editLabel: string;
  /** 정보수정 버튼 클릭 시 동작 */
  onEditClick?: () => void;

  /** 오른쪽 두 번째 버튼 텍스트 (예: "종료처리") */
  endLabel: string;
  /** 종료처리 버튼 클릭 시 동작 */
  onEndClick?: () => void;
}

const ListButtonDetailSubHeader: React.FC<DetailSubHeaderProps> = ({
  backLabel,
  onBackClick,
  editLabel,
  onEditClick,
  endLabel,
  onEndClick,
}) => {
  // 왼쪽 "목록으로" 버튼 클릭 핸들러
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      // 기본 동작: 이전 페이지로 돌아가기
      window.history.back();
    }
  };

  // 오른쪽 "정보수정" 버튼 클릭 핸들러
  const handleEdit = () => {
    if (onEditClick) {
      onEditClick();
    }
  };

  // 오른쪽 "종료처리" 버튼 클릭 핸들러
  const handleEnd = () => {
    if (onEndClick) {
      onEndClick();
    }
  };

  return (
    <HeaderContainer>
      {/* 왼쪽: 목록 이동 버튼 */}
      <LeftButton onClick={handleBack}>
        <BulletIcon />
        {backLabel}
      </LeftButton>

      {/* 오른쪽: 정보수정, 종료처리 버튼 */}
      <RightButtons>
        <EditButton onClick={handleEdit}>{editLabel}</EditButton>
        <EndButton onClick={handleEnd}>{endLabel}</EndButton>
      </RightButtons>
    </HeaderContainer>
  );
};

export default ListButtonDetailSubHeader;

/* ====================== Styled Components ====================== */

/** 상단 래퍼 (폭 1200px, 높이 60px 정도 느낌) */
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;

  min-width: 1000px; /* 예시로 1200px 고정 */
  min-height: 60px;
  background: #f9f9f9;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 0 10px; /* 좌우 패딩 */
  box-sizing: border-box;
`;

/** 왼쪽 "목록이동" 버튼 */
const LeftButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 110px;
  height: 40px;

  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  text-align: center;

  border: 1px solid #dddddd;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  border-radius: 8px 0 0 8px;

  &:hover {
    background-color: #eeeeee;
  }
`;

/** 왼쪽 버튼 안에 들어갈 주황색 화살표 모양 */
const BulletIcon = styled.div`
  width: 7px;
  height: 7px;
  margin-right: 5px;

  /* 굵기(3px)와 색상(#f6ae24)을 사용하여 L자 모양을 만든 뒤 회전 */
  border-left: 3px solid #f6ae24;
  border-bottom: 3px solid #f6ae24;

  /* 135도 회전 -> L자 모양이 < 화살표가 됨 */
  transform: rotate(45deg);
`;

/** 오른쪽 버튼 컨테이너 */
const RightButtons = styled.div`
  display: flex;
  margin-left: auto;
  gap: 0px; /* 버튼이 붙어있도록(요구사항에 맞게 조정) */
`;

/** 정보수정 버튼 (오른쪽 첫 번째) */
const EditButton = styled.button`
  width: 100px;
  height: 40px;

  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  text-align: center;

  border: 1px solid #dddddd;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;

  /* 왼쪽 모서리를 둥글게 */
  border-radius: 8px 0 0 8px;

  &:hover {
    background-color: #dddddd;
  }
`;

/** 종료처리 버튼 (오른쪽 두 번째) */
const EndButton = styled.button`
  width: 100px;
  height: 40px;

  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  text-align: center;

  border: 1px solid #dddddd;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;

  /* 오른쪽 모서리를 둥글게 */
  border-radius: 0 8px 8px 0;

  &:hover {
    background-color: #dddddd;
  }
`;
