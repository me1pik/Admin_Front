import React from 'react';
import styled from 'styled-components';

export interface TripleButtonDetailSubHeaderProps {
  backLabel: string;
  onBackClick?: () => void;
  registerCompletedLabel: string;
  onRegisterCompletedClick?: () => void;
  pendingLabel: string;
  onPendingClick?: () => void;
  soldOutLabel: string;
  onSoldOutClick?: () => void;
}

const TripleButtonDetailSubHeader: React.FC<
  TripleButtonDetailSubHeaderProps
> = ({
  backLabel,
  onBackClick,
  registerCompletedLabel,
  onRegisterCompletedClick,
  pendingLabel,
  onPendingClick,
  soldOutLabel,
  onSoldOutClick,
}) => {
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      window.history.back();
    }
  };

  const handleRegisterCompleted = () => {
    if (onRegisterCompletedClick) {
      onRegisterCompletedClick();
    }
  };

  const handlePending = () => {
    if (onPendingClick) {
      onPendingClick();
    }
  };

  const handleSoldOut = () => {
    if (onSoldOutClick) {
      onSoldOutClick();
    }
  };

  return (
    <HeaderContainer>
      <LeftButton onClick={handleBack}>
        <BulletIcon />
        {backLabel}
      </LeftButton>
      <RightButtons>
        <StateButton onClick={handleRegisterCompleted}>
          {registerCompletedLabel}
        </StateButton>
        <StateButton onClick={handlePending}>{pendingLabel}</StateButton>
        <StateButton onClick={handleSoldOut}>{soldOutLabel}</StateButton>
      </RightButtons>
    </HeaderContainer>
  );
};

export default TripleButtonDetailSubHeader;

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
  /* 좌측 버튼은 이미 좌측 모서리에 radius 적용 */
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

const StateButton = styled.button`
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
  border-left: none;
  &:hover {
    background-color: #dddddd;
  }
  /* 오른쪽 그룹 내 첫번째 버튼 : 왼쪽 위/아래에 radius 추가 */
  &:first-child {
    border-left: 1px solid #dddddd;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  /* 오른쪽 그룹 내 마지막 버튼 : 오른쪽 위/아래에 radius 추가 */
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
