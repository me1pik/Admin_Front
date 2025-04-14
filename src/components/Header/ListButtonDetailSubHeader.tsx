// src/components/Header/ListButtonDetailSubHeader.tsx
import React from 'react';
import styled from 'styled-components';

export interface DetailSubHeaderProps {
  backLabel: string;
  onBackClick?: () => void;
  // 신규 등록 시 "등록 완료", 수정 시 "정보수정" 버튼 텍스트로 사용
  editLabel: string;
  onEditClick?: () => void;
  // 수정 모드일 때 종료처리 버튼 (신규 등록 시에는 표시하지 않음)
  endLabel?: string;
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
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      window.history.back();
    }
  };

  const handleEdit = () => {
    if (onEditClick) {
      onEditClick();
    }
  };

  const handleEnd = () => {
    if (onEndClick) {
      onEndClick();
    }
  };

  return (
    <HeaderContainer>
      <LeftButton onClick={handleBack}>
        <BulletIcon />
        {backLabel}
      </LeftButton>
      <RightButtons>
        <EditButton onClick={handleEdit}>{editLabel}</EditButton>
        {endLabel && onEndClick && (
          <EndButton onClick={handleEnd}>{endLabel}</EndButton>
        )}
      </RightButtons>
    </HeaderContainer>
  );
};

export default ListButtonDetailSubHeader;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 1000px;
  min-height: 60px;
  background: #f9f9f9;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 0 10px;
  box-sizing: border-box;
`;

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

const BulletIcon = styled.div`
  width: 7px;
  height: 7px;
  margin-right: 5px;
  border-left: 3px solid #f6ae24;
  border-bottom: 3px solid #f6ae24;
  transform: rotate(45deg);
`;

const RightButtons = styled.div`
  display: flex;
  margin-left: auto;
  gap: 0px;
`;

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
  border-radius: 8px 0 0 8px;
  &:hover {
    background-color: #dddddd;
  }
`;

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
  border-radius: 0 8px 8px 0;
  &:hover {
    background-color: #dddddd;
  }
`;
