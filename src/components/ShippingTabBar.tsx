// src/components/userdetail/ShippingTabBar.tsx
import React from 'react';
import styled from 'styled-components';

interface ShippingTabBarProps {
  /** 탭 목록 (예: ['배송지 설정', '이용내역', '포인트 내역', '추가목록', '개인평가']) */
  tabs: string[];
  /** 현재 활성 탭 인덱스 (0 ~ tabs.length - 1) */
  activeIndex?: number;
  /** 탭 클릭 시 실행되는 콜백 (탭 인덱스) */
  onTabClick?: (index: number) => void;
}

const ShippingTabBar: React.FC<ShippingTabBarProps> = ({
  tabs,
  activeIndex = 0,
  onTabClick,
}) => {
  return (
    <TabContainer>
      {tabs.map((label, idx) => {
        const isActive = idx === activeIndex;
        return (
          <TabButton
            key={idx}
            isActive={isActive}
            isFirst={idx === 0}
            isLast={idx === tabs.length - 1}
            onClick={() => onTabClick && onTabClick(idx)}
          >
            {label}
          </TabButton>
        );
      })}
    </TabContainer>
  );
};

export default ShippingTabBar;

/* ====================== Styled Components ====================== */

const TabContainer = styled.div`
  display: flex;
`;

interface TabButtonProps {
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  padding: 10px 20px;
  height: 40px;
  border: 1px solid #dddddd;
  border-bottom: none;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  color: #000;
  cursor: pointer;
  border-radius: ${({ isFirst, isLast }) =>
    isFirst ? '8px 0 0 0' : isLast ? '0 8px 0 0' : '0'};
  background-color: ${({ isActive }) => (isActive ? '#eeeeee' : '#ffffff')};

  &:hover {
    background-color: #f2f2f2;
  }
`;
