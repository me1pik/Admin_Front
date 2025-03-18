// src/components/SubHeader.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import NewIcon from '../assets/New.svg';

export interface TabItem {
  label: string;
  path: string;
}

interface SubHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchType: string;
  setSearchType: (value: string) => void;
  tabs: TabItem[];
  onTabChange?: (tab: TabItem) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
  tabs,
  onTabChange,
}) => {
  // 기본 활성 탭은 첫 번째 탭(예: "전체보기")
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  // 탭 클릭 시 activeTab을 업데이트하고 부모 콜백 호출
  const handleTabClick = (tab: TabItem) => {
    setActiveTab(tab.label);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <HeaderContainer>
      <TabContainer>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            active={activeTab === tab.label}
            isFirst={index === 0}
            isLast={index === tabs.length - 1}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
            {activeTab === tab.label && <NewBadge src={NewIcon} alt='New' />}
          </TabButton>
        ))}
      </TabContainer>
      <SearchContainer>
        {/* 검색 타입 선택 드롭다운 */}
        <Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value='id'>아이디</option>
          <option value='name'>이름</option>
          <option value='email'>이메일</option>
          <option value='team'>팀</option>
        </Select>
        <SearchInput
          type='text'
          placeholder='검색'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon />
      </SearchContainer>
    </HeaderContainer>
  );
};

export default SubHeader;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #dddddd;
  margin-bottom: 34px;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto; /* 탭 영역을 왼쪽에 배치 */
  background: #eeeeee;
  border: 1px solid #dddddd;
  border-radius: 8px;
  overflow: visible;
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

const Select = styled.select`
  margin-right: 10px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background: #ffffff;
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
  color: #6c757d;
  font-size: 16px;
`;
