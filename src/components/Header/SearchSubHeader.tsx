// src/components/Header/SubHeader.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import NewIcon from '../../assets/New.svg';

export interface TabItem {
  label: string;
  path: string;
}

interface SubHeaderProps {
  tabs: TabItem[];
  onTabChange?: (tab: TabItem) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 쿼리(search)가 바뀔 때마다 inputValue 동기화
  useEffect(() => {
    setInputValue(searchParams.get('search') ?? '');
  }, [searchParams]);

  const handleTabClick = (tab: TabItem) => {
    setActiveTab(tab.label);
    onTabChange?.(tab);
  };

  // Enter 키로만 URL 갱신
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = inputValue.trim();
      if (trimmed) {
        setSearchParams({ search: trimmed });
      } else {
        setSearchParams({});
      }
    }
  };

  return (
    <HeaderContainer>
      <TabContainer>
        {tabs.map((tab, idx) => (
          <TabButton
            key={idx}
            active={activeTab === tab.label}
            isFirst={idx === 0}
            isLast={idx === tabs.length - 1}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
            {activeTab === tab.label && <NewBadge src={NewIcon} alt='New' />}
          </TabButton>
        ))}
      </TabContainer>
      <SearchContainer>
        <SearchInput
          type='text'
          placeholder='검색'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon /> {/* 클릭 이벤트 제거 */}
      </SearchContainer>
    </HeaderContainer>
  );
};

export default SubHeader;

/* ====================== Styled Components ====================== */

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #dddddd;
  margin-bottom: 34px;
  min-width: 800px;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  background: #eeeeee;
  border: 1px solid #dddddd;
  border-radius: 8px;
`;

interface TabButtonProps {
  active: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  min-width: 110px;
  position: relative;
  background-color: ${({ active }) => (active ? '#f0f0f0' : '#ffffff')};
  color: ${({ active }) => (active ? '#007bff' : '#000000')};
  border: none;
  border-right: 1px solid #cccccc;
  padding: 14px 27px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  cursor: pointer;

  ${({ isFirst, isLast }) =>
    isFirst
      ? 'border-top-left-radius: 8px; border-bottom-left-radius: 8px;'
      : isLast
        ? 'border-top-right-radius: 8px; border-bottom-right-radius: 8px;'
        : ''}

  &:last-child {
    border-right: none;
  }
`;

const NewBadge = styled.img`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  z-index: 1;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  padding: 12px;
  font-size: 14px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  width: 230px;
  padding-right: 30px;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: #6c757d;
`;
